import { lazy } from "react"
import ProtectedRoute from "../components/protected-route";
import DashboardPage from '../pages/dashboard/index';

const Main      = lazy(() => import('../pages/main'));
const SignIn    = lazy(() => import('../pages/auth/sign-in'));
const Dashboard = lazy(() => import('../pages/dashboard'));
const Users     = lazy(() => import('../pages/users'));
const Roles     = lazy(() => import('../pages/roles'));

export const routes = [
    {
        id: 'main',
        name: 'Main',
        path: '/',
        isIndex: false,
        childRoutes: [
            {
                id: 'dashboard',
                name: 'Dashboard',
                path: '/',
                isIndex: true,
                childRoutes: null,
                element: <Dashboard />
            },
            {
                id: 'users',
                name: 'Users',
                path: '/users',
                isIndex: true,
                childRoutes: null,
                element: <Users />
            },
            {
                id: 'roles',
                name: 'Roles',
                path: '/roles',
                isIndex: true,
                childRoutes: null,
                element: <Roles />
            },
        ],
        element: <ProtectedRoute><Main /></ProtectedRoute>
    },
    {
        id: 'main',
        name: 'Main',
        path: '/',
        isIndex: true,
        childRoutes: null,
        element: <ProtectedRoute><Main /></ProtectedRoute>
    },
    {
        id: 'sign-in',
        name: 'Sign In',
        path: '/sign-in',
        isIndex: false,
        childRoutes: null,
        element: <SignIn />
    },
    {
        id: 'not-found',
        name: 'Not Found',
        path: '*',
        isIndex: false,
        childRoutes: null,
        element: <SignIn />
    }
]

export const drawerMenu = [
    [
        {
            id: 'dashboard',
            name: 'Dashboard',
            path: '/dashboard',
            childRoutes: null,
        },
        {
            id: 'users',
            name: 'Users',
            path: '/users',
            childRoutes: null,
        },
        {
            id: 'roles',
            name: 'Roles',
            path: '/roles',
            childRoutes: null,
        },
    ]
]