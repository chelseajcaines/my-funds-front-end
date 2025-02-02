import { lazy } from 'react';

// project imports
import GuestGuard from 'utils/route-guard/GuestGuard';
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';
import Loadable from 'ui-component/Loadable';

// login routing
const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/Login3')));
const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register3')));
const AuthForgotPassword = Loadable(lazy(() => import('views/pages/authentication/ForgotPassword3')));
const ResetPassword = Loadable(lazy(() => import('views/pages/authentication/ResetPassword3'))); // Import your reset password page

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/', // This is the root path
    element: (
        <NavMotion>
            <GuestGuard>
                <MinimalLayout />
            </GuestGuard>
        </NavMotion>
    ),
    children: [
        {
            index: true, // This will load the login page when visiting '/'
            element: <AuthLogin />
        },
        {
            path: 'login', // /login (relative to /)
            element: <AuthLogin />
        },
        {
            path: 'register', // /register
            element: <AuthRegister />
        },
        {
            path: 'forgot', // /forgot
            element: <AuthForgotPassword />
        },
        {
            path: 'reset-password', // /reset-password (relative to /)
            element: <ResetPassword />
        }
    ]
};

export default LoginRoutes;
