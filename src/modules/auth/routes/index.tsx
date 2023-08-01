import { lazy } from 'react';

const SignIn                    = lazy(() => import('..'));
const ForgetPassword            = lazy(() => import('../forget-password'));
const ResetPassword             = lazy(() => import('../reset-password'));

export const authRoutes = [
    {
        id: 'sign-in',
        name: 'Sign In',
        path: '/sign-in',
        isIndex: false,
        childRoutes: null,
        element: <SignIn />,
        hasPermission: true
    },
    {
        id: 'forget-password',
        name: 'Forget Password',
        path: '/forget-password',
        isIndex: false,
        childRoutes: null,
        element: <ForgetPassword />,
        hasPermission: true
    },
    {
        id: 'reset-password',
        name: 'Reset Password',
        path: '/reset-password',
        isIndex: false,
        childRoutes: null,
        element: <ResetPassword />,
        hasPermission: true
    },
]