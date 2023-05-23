import { lazy } from "react"
import ProtectedRoute from "../components/protected-route";
import { hasPermission } from "../util";

const Main                      = lazy(() => import('../pages/main'));
const SignIn                    = lazy(() => import('../pages/auth/sign-in'));
const Dashboard                 = lazy(() => import('../pages/dashboard'));
const Users                     = lazy(() => import('../pages/users'));
const Roles                     = lazy(() => import('../pages/roles'));
const Faculties                 = lazy(() => import('../pages/faculties'));
const FacultyForm               = lazy(() => import('../pages/faculties/faculty-form-stepper'));
const Subjects                  = lazy(() => import('../pages/subjects'));
const SubjectsTypes             = lazy(() => import('../pages/subjects-types'));
const Books                     = lazy(() => import('../pages/library/books'));
const BooksCategories           = lazy(() => import('../pages/library/categories'));
const Departments               = lazy(() => import('../pages/departments'));
const Semesters                 = lazy(() => import('../pages/semesters'));
const AdminSuggestedSubjects    = lazy(() => import('../pages/admin-suggested-subjects'));
const StudentSuggestedSubjects  = lazy(() => import('../pages/student-subjects-suggestions'));
const StudyPlans                = lazy(() => import('../pages/study-plans'));
const Vehicles                  = lazy(() => import('../pages/vehicles'));
const Page404                   = lazy(() => import('../pages/404'));

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
            }
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