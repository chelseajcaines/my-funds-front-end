import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (serviceToken) => {
    if (!serviceToken) {
        return false;
    }
    const decoded = jwtDecode(serviceToken);
    /**
     * Property 'exp' does not exist on type '<T = unknown>(token, options?: JwtDecodeOptions | undefined) => T'.
     */
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        localStorage.setItem('serviceToken', serviceToken);
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        localStorage.removeItem('serviceToken');
        delete axios.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const serviceToken = window.localStorage.getItem('serviceToken');
                if (serviceToken && verifyToken(serviceToken)) {
                    setSession(serviceToken);
                    const response = await axios.get('/api/account/me');
                    const { user } = response.data;
                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    // const login = async (email, password) => {
    //     const response = await axios.post('/api/user/login', { email, password });
    //     const { serviceToken, user } = response.data;
    //     setSession(serviceToken);
    //     dispatch({
    //         type: LOGIN,
    //         payload: {
    //             isLoggedIn: true,
    //             user
    //         }
    //     });
    // };

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5001/api/user/login', { email, password });
            const { serviceToken, user } = response.data;
            setSession(serviceToken);
            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user
                }
            });
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Login failed');
        }
        // try {
        //     const response = await axios.post('/api/user/login', { email, password });
        //     const { serviceToken, user } = response.data;
        //     setSession(serviceToken);
        //     dispatch({
        //         type: LOGIN,
        //         payload: {
        //             isLoggedIn: true,
        //             user
        //         }
        //     });
        // } catch (error) {
        //     console.error('Login Error:', error);
        //     throw new Error(error.response?.data?.message || 'Login failed'); // Ensure the error message is clear
        // }
    };

    // const register = async (email, password, firstName, lastName) => {
    //     // todo: this flow need to be recode as it not verified
    //     const id = chance.bb_pin();
    //     const response = await axios.post('http://localhost:5001/api/user', {
    //         // name: firstName + ' ' + lastName,
    //         email,
    //         password
    //     });
    //     let users = response.data;
    //     console.log(users);
    // };

    const register = async (email, password, firstName, lastName) => {
        const id = chance.bb_pin();
        const response = await axios.post('http://localhost:5001/api/user', {
            name: firstName + ' ' + lastName, // Combine firstName and lastName for the name field
            email,
            password
        });
        let users = response.data;
        console.log(users);
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const resetPassword = async (email) => {
        console.log(email); // Log the email for debugging

        try {
            // Send a POST request to the backend
            const response = await axios.post('http://localhost:5001/api/auth/forgot-password', { email });

            // Handle the response as needed
            console.log(response.data); // You can log the response to see if it's successful
            return response.data; // Return the data to handle it in your component
        } catch (error) {
            // Handle errors
            console.error('Error sending reset password request:', error);
            throw new Error('Failed to send reset password request.'); // Throw an error to catch it in the form
        }
    };

    const updateProfile = () => {};

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
