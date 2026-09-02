import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// material-ui
import { Box, Button, CircularProgress, Typography } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// ========================|| VERIFY EMAIL ||======================== //

const AuthVerifyEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isVerifying, setIsVerifying] = useState(true);
    const [verified, setVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_URL}/api/auth/verify-email?token=${encodeURIComponent(token)}`
                );

                if (response.data.message === 'Email verified successfully.') {
                    setVerified(true);
                } else {
                    setErrorMessage('Unable to verify email address.');
                }
            } catch (error) {
                console.error('Email verification error:', error);

                setErrorMessage(error.response?.data?.message || 'This verification link is invalid or has expired.');
            } finally {
                setIsVerifying(false);
            }
        };

        if (token) {
            verifyEmail();
        } else {
            setErrorMessage('Missing email verification token.');
            setIsVerifying(false);
        }
    }, [token]);

    if (isVerifying) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                }}
            >
                <CircularProgress />

                <Typography variant="h6">Verifying your email...</Typography>
            </Box>
        );
    }

    if (!verified) {
        return (
            <Box
                sx={{
                    textAlign: 'center'
                }}
            >
                <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Typography>

                <AnimateButton>
                    <Button
                        disableElevation
                        fullWidth
                        size="large"
                        variant="contained"
                        color="secondary"
                        onClick={() =>
                            navigate('/register', {
                                replace: true
                            })
                        }
                    >
                        Back to Register
                    </Button>
                </AnimateButton>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                textAlign: 'center'
            }}
        >
            <Typography variant="h6" sx={{ mb: 3 }}>
                Your email has been successfully verified. You can now log in to your MonieJar account.
            </Typography>

            <AnimateButton>
                <Button
                    disableElevation
                    fullWidth
                    size="large"
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                        navigate('/login', {
                            replace: true
                        })
                    }
                >
                    Log In
                </Button>
            </AnimateButton>
        </Box>
    );
};

export default AuthVerifyEmail;
