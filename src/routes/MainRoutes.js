import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import { Navigate } from 'react-router-dom';

// sample page routing
const Overview = Loadable(lazy(() => import('views/overview')));
const Budgets = Loadable(lazy(() => import('views/budgets')));
const Income = Loadable(lazy(() => import('views/income')));
const Expenses = Loadable(lazy(() => import('views/expenses')));
const Savings = Loadable(lazy(() => import('views/savings')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <Navigate to="/budgets" replace />
        },
        // {
        //     path: '/overview',
        //     element: <Overview />
        // },
        {
            path: '/budgets',
            element: <Budgets />
        },
        // {
        //     path: '/income',
        //     element: <Income />
        // },
        {
            path: '/expenses',
            element: <Expenses />
        }
        // {
        //     path: '/savings',
        //     element: <Savings />
        // }
    ]
};

export default MainRoutes;
