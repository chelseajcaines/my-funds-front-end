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
    return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken) => {
    if (serviceToken) {
        // Set the token in the axios headers for each request
        axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
    } else {
        // Remove the token from axios headers when logging out
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
                console.log('Starting session validation...');
                const response = await axios.get('http://localhost:5001/api/user/validate');
                console.log('Response from /api/user/validate:', response.data);
                const { user } = response.data;
                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user
                    }
                });
            } catch (err) {
                console.error('Error validating session:', err);
                dispatch({ type: LOGOUT });
            }
        };

        init();
    }, []);

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
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

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

    const resetPassword = async (email) => {
        console.log(email); // Log the email for debugging

        try {
            const response = await axios.post('http://localhost:5001/api/auth/forgot-password', { email });
            console.log(response.data); // Log the response to see if it's successful
            return response.data; // Return the data to handle it in your component
        } catch (error) {
            console.error('Error sending reset password request:', error);
            throw new Error('Failed to send reset password request.');
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
