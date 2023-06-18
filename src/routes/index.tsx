import { lazy } from "react"

import ProtectedRoute from "../components/protected-route";
import { hasPermission } from "../util";

const Main                      = lazy(() => import('../pages/main'));
const SignIn                    = lazy(() => import('../pages/auth/sign-in'));
const Dashboard                 = lazy(() => import('../pages/dashboard'));
const Page404                   = lazy(() => import('../pages/404'));

// Users Management System
const Users                     = lazy(() => import('../pages/users-management/users'));
const Roles                     = lazy(() => import('../pages/users-management/roles'));

// University Management System
const Faculties                 = lazy(() => import('../pages/university-management/faculties'));
const FacultyForm               = lazy(() => import('../pages/university-management/faculties/faculty-form-stepper'));
const Subjects                  = lazy(() => import('../pages/university-management/subjects'));
const SubjectsTypes             = lazy(() => import('../pages/university-management/subjects-types'));
const Books                     = lazy(() => import('../pages/university-management/library/books'));
const BooksCategories           = lazy(() => import('../pages/university-management/library/categories'));
const Departments               = lazy(() => import('../pages/university-management/departments'));
const Semesters                 = lazy(() => import('../pages/university-management/semesters'));
const AdminSuggestedSubjects    = lazy(() => import('../pages/university-management/admin-suggested-subjects'));
const StudentSuggestedSubjects  = lazy(() => import('../pages/university-management/student-subjects-suggestions'));
const StudyPlans                = lazy(() => import('../pages/university-management/study-plans'));

// Transportation Management System
const Vehicles                  = lazy(() => import('../pages/transport-management/vehicles'));
const BusStops                  = lazy(() => import('../pages/transport-management/bus-stops'));
const Routes                    = lazy(() => import('../pages/transport-management/routes'));
const Trips                     = lazy(() => import('../pages/transport-management/trips'));
const TripsBookings                     = lazy(() => import('../pages/transport-management/trips-bookings'));

export const getRoutes = () => ([
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
                element: <Dashboard />,
                hasPermission: true
            },
            {
                id: 'users',
                name: 'Users',
                path: '/users',
                isIndex: false,
                childRoutes: null,
                element: <Users />,
                hasPermission: hasPermission('User.View')
            },
            {
                id: 'roles',
                name: 'Roles',
                path: '/roles',
                isIndex: false,
                childRoutes: null,
                element: <Roles />,
                hasPermission: hasPermission('Role.View')
            },
            {
                id: 'faculties',
                name: 'Faculties',
                path: '/faculties',
                isIndex: false,
                childRoutes: null,
                element: <Faculties />,
                hasPermission: hasPermission('Faculty.View')
            },
            {
                id: 'faculty-form',
                name: 'Add/Update Faculty',
                path: '/faculty-form/:id?',
                isIndex: false,
                childRoutes: null,
                element: <FacultyForm />,
                hasPermission: hasPermission('Faculty.View')
            },
            {
                id: 'subjects',
                name: 'Subjects',
                path: '/subjects',
                isIndex: false,
                childRoutes: null,
                element: <Subjects />,
                hasPermission: hasPermission('Subject.View')
            },
            {
                id: 'subjects-types',
                name: 'Subjects Types',
                path: '/subjects-types',
                isIndex: false,
                childRoutes: null,
                element: <SubjectsTypes />,
                hasPermission: hasPermission('SubjectType.View')
            },
            {
                id: 'books',
                name: 'Books',
                path: '/books',
                isIndex: false,
                childRoutes: null,
                element: <Books />,
                hasPermission: hasPermission('Book.View')
            },
            {
                id: 'books-categories',
                name: 'Categories',
                path: '/books-categories',
                isIndex: false,
                childRoutes: null,
                element: <BooksCategories />,
                hasPermission:  hasPermission('Category.View')
            },
            {
                id: 'departments',
                name: 'Departments',
                path: '/departments',
                isIndex: false,
                childRoutes: null,
                element: <Departments />,
                hasPermission: hasPermission('Department.View')
            },
            {
                id: 'semesters',
                name: 'Semesters',
                path: '/semesters',
                isIndex: false,
                childRoutes: null,
                element: <Semesters />,
                hasPermission: hasPermission('Semester.View')
            },
            {
                id: 'suggested-subjects',
                name: 'Suggested Subjects',
                path: '/suggested-subjects',
                isIndex: false,
                childRoutes: null,
                element: <StudentSuggestedSubjects />,
                hasPermission: hasPermission('StudentSuggestedSubject.View')
            },
            {
                id: 'suggested-subjects-manage',
                name: 'Suggested Subjects',
                path: '/suggested-subjects-manage',
                isIndex: false,
                childRoutes: null,
                element: <AdminSuggestedSubjects />,
                hasPermission: hasPermission('StudentSuggestedSubjectForAdmin.View')
            },
            {
                id: 'study-plan',
                name: 'Study Plan',
                path: '/study-plans',
                isIndex: false,
                childRoutes: null,
                element: <StudyPlans />,
                hasPermission: hasPermission('StudyPlan.View')
            },
            {
                id: 'vehicles',
                name: 'Vehicles',
                path: '/vehicles',
                isIndex: false,
                childRoutes: null,
                element: <Vehicles />,
                hasPermission: hasPermission('Vehicle.View')
            },
            {
                id: 'busstops',
                name: 'Bus Stops',
                path: '/bus-stops',
                isIndex: false,
                childRoutes: null,
                element: <BusStops />,
                hasPermission: hasPermission('BusStop.View')
            },
            {
                id: 'routes',
                name: 'Routes',
                path: '/routes',
                isIndex: false,
                childRoutes: null,
                element: <Routes />,
                hasPermission: hasPermission('Route.View')
            },
            {
                id: 'trips',
                name: 'Trips',
                path: '/trips',
                isIndex: false,
                childRoutes: null,
                element: <Trips />,
                hasPermission: true
            },
            {
                id: 'trips-bookings',
                name: 'Trips Bookings',
                path: '/trips-bookings',
                isIndex: false,
                childRoutes: null,
                element: <TripsBookings />,
                hasPermission: true
            },
        ],
        element: <ProtectedRoute><Main /></ProtectedRoute>,
        hasPermission: true
    },
    {
        id: 'main',
        name: 'Main',
        path: '/',
        isIndex: true,
        childRoutes: null,
        element: <ProtectedRoute><Main /></ProtectedRoute>,
        hasPermission: true
    },
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
        id: 'not-found',
        name: 'Not Found',
        path: '*',
        isIndex: false,
        childRoutes: null,
        element: <Page404 />,
        hasPermission: true
    }
])

export const drawerUsersMenu = [
    [
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

export const drawerUniversityManagmentMenu = [
    [
        {
            id: 'faculties',
            name: 'Faculties',
            path: '/faculties',
            isIndex: false,
            childRoutes: null,
            element: <Faculties />
        },
        {
            id: 'faculty-form',
            name: 'Add/Update Faculty',
            path: '/faculty-form/:id?',
            isIndex: false,
            childRoutes: null,
            element: <FacultyForm />
        },
        {
            id: 'subjects',
            name: 'Subjects',
            path: '/subjects',
            isIndex: false,
            childRoutes: null,
            element: <Subjects />
        },
        {
            id: 'subjects-types',
            name: 'Subjects Types',
            path: '/subjects-types',
            isIndex: false,
            childRoutes: null,
            element: <SubjectsTypes />
        },
        {
            id: 'books',
            name: 'Books',
            path: '/books',
            isIndex: false,
            childRoutes: null,
            element: <Books />
        },
        {
            id: 'books-categories',
            name: 'Categories',
            path: '/books-categories',
            isIndex: false,
            childRoutes: null,
            element: <BooksCategories />
        },
        {
            id: 'departments',
            name: 'Departments',
            path: '/departments',
            isIndex: false,
            childRoutes: null,
            element: <Departments />
        },
    ]
]