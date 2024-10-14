import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const Overview = Loadable(lazy(() => import('views/overview')));
const Cards = Loadable(lazy(() => import('views/cards')));
const Budgets = Loadable(lazy(() => import('views/budgets')));
const Income = Loadable(lazy(() => import('views/income')));
const Expences = Loadable(lazy(() => import('views/expences')));

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
            element: <Overview />
        },
        {
            path: '/overview',
            element: <Overview />
        },
        {
            path: '/cards',
            element: <Cards />
        },
        {
            path: '/budgets',
            element: <Budgets />
        },
        {
            path: '/income',
            element: <Income />
        },
        {
            path: '/expences',
            element: <Expences />
        }
    ]
};

export default MainRoutes;