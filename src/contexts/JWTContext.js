import PropTypes from 'prop-types';
import { createContext, useCallback, useEffect, useReducer, useRef, useState } from 'react';

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
    const [sessionExpired, setSessionExpired] = useState(false);

    // Holds the current session timeout
    const sessionTimer = useRef(null);

    // Clear an existing session timer
    const clearSessionTimer = useCallback(() => {
        if (sessionTimer.current) {
            clearTimeout(sessionTimer.current);
            sessionTimer.current = null;
        }
    }, []);

    // Show the timeout modal and log the user out of the frontend
    const expireSession = useCallback(() => {
        clearSessionTimer();

        setSession(null);

        dispatch({
            type: LOGOUT
        });

        setSessionExpired(true);
    }, [clearSessionTimer]);

    // Start the timer using the expiration time from the backend
    const startSessionTimer = useCallback(
        (sessionExpiresAt) => {
            clearSessionTimer();

            if (!sessionExpiresAt) {
                return;
            }

            const expirationTime = new Date(sessionExpiresAt).getTime();
            const timeRemaining = expirationTime - Date.now();

            console.log(`Session will expire in ${Math.round(timeRemaining / 1000)} seconds`);

            // Session has already expired
            if (timeRemaining <= 0) {
                expireSession();
                return;
            }

            // Automatically expire the frontend session
            sessionTimer.current = setTimeout(() => {
                expireSession();
            }, timeRemaining);
        },
        [clearSessionTimer, expireSession]
    );

    useEffect(() => {
        const init = async () => {
            try {
                console.log('Starting session validation...');

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/validate`, {
                    withCredentials: true
                });

                const { user, sessionExpiresAt } = response.data;

                dispatch({
                    type: LOGIN,
                    payload: {
                        isLoggedIn: true,
                        user
                    }
                });

                // Restart the timer after a page refresh
                startSessionTimer(sessionExpiresAt);
            } catch (err) {
                clearSessionTimer();
                setSession(null);

                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();

        // Clear the timer when this provider is removed
        return () => {
            clearSessionTimer();
        };
    }, [clearSessionTimer, startSessionTimer]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/user/login`,
                { email, password },
                { withCredentials: true }
            );

            const { serviceToken, user, sessionExpiresAt } = response.data;

            setSession(serviceToken);

            /*
             * Prefer the expiration time stored in the database.
             * If it is not returned for some reason, use the
             * expiration built into the JWT as a fallback.
             */
            let expiration = sessionExpiresAt;

            if (!expiration && serviceToken) {
                const decodedToken = jwtDecode(serviceToken);

                if (decodedToken.exp) {
                    expiration = new Date(decodedToken.exp * 1000);
                }
            }

            // Make sure an old timeout modal is closed
            setSessionExpired(false);

            // Start automatic session timeout
            startSessionTimer(expiration);

            dispatch({
                type: LOGIN,
                payload: {
                    isLoggedIn: true,
                    user
                }
            });
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Invalid email or password.');
        }
    };

    const logout = async () => {
        // Stop the frontend timer
        clearSessionTimer();

        // Make sure the timeout modal is closed for a normal logout
        setSessionExpired(false);

        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/user/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error('Error logging out:', error);
        }

        setSession(null);
        dispatch({ type: LOGOUT });
    };

    const register = async (email, password, firstName, lastName) => {
        const id = chance.bb_pin();

        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/user`, {
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
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, { email });

            console.log(response.data); // Log the response to see if it's successful

            return response.data; // Return the data to handle it in your component
        } catch (error) {
            console.error('Error sending reset password request:', error);

            throw new Error('Failed to send reset password request.');
        }
    };

    const updateProfile = () => {};

    // User clicks the Log In button inside the timeout modal
    const handleSessionExpiredLogin = () => {
        setSessionExpired(false);

        // Send user to login page
        // window.location.href = '/login';
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>
            {children}

            {sessionExpired && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999
                    }}
                >
                    <div
                        style={{
                            backgroundColor: '#ffffff',
                            borderRadius: '10px',
                            padding: '30px',
                            width: '90%',
                            maxWidth: '400px',
                            textAlign: 'center'
                        }}
                    >
                        <h2
                            style={{
                                marginTop: 0,
                                marginBottom: '12px'
                            }}
                        >
                            Session Timed Out
                        </h2>

                        <p
                            style={{
                                marginBottom: '24px'
                            }}
                        >
                            Your session has expired. Please log in again to continue.
                        </p>

                        <button
                            type="button"
                            onClick={handleSessionExpiredLogin}
                            style={{
                                padding: '10px 24px',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            Log In
                        </button>
                    </div>
                </div>
            )}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
