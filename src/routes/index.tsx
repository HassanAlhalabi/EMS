import { lazy } from "react";

import ProtectedRoute from "../components/protected-route";
import { hasPermission } from "../util";
import { authRoutes } from "../modules/auth/routes";

const Main                      = lazy(() => import('../modules/main'));
const Dashboard                 = lazy(() => import('../modules/dashboard'));
const Profile                   = lazy(() => import('../modules/users-management/profile'));
const Page404                   = lazy(() => import('../modules/404'));

const SubjectsRegistration      = lazy(() => import('../modules/user-domain/subjects-registration'));
const MyBookings                = lazy(() => import('../modules/user-domain/my-bookings'));

// Tickets Management System
const TicketsPage               = lazy(() => import('../modules/tickets-management/tickets'));
const AllTickets                = lazy(() => import('../modules/tickets-management/tickets/views/tickets'));
const TicketDetails             = lazy(() => import('../modules/tickets-management/tickets/views/ticket-details'));
const TicketsTypes              = lazy(() => import('../modules/tickets-management/tickets-types'));

// Users Management System
const Users                     = lazy(() => import('../modules/users-management/users'));
const Roles                     = lazy(() => import('../modules/users-management/roles'));

// University Management System
const Faculties                 = lazy(() => import('../modules/university-management/faculties'));
const FacultyForm               = lazy(() => import('../modules/university-management/faculties/faculty-form-stepper'));
const Subjects                  = lazy(() => import('../modules/university-management/subjects'));
const SubjectsTypes             = lazy(() => import('../modules/university-management/subjects-types'));
const Books                     = lazy(() => import('../modules/university-management/library/books'));
const BooksCategories           = lazy(() => import('../modules/university-management/library/categories'));
const Departments               = lazy(() => import('../modules/university-management/departments'));
const Semesters                 = lazy(() => import('../modules/university-management/semesters'));
const AdminSuggestedSubjects    = lazy(() => import('../modules/university-management/admin-suggested-subjects'));
const StudentSuggestedSubjects  = lazy(() => import('../modules/university-management/student-subjects-suggestions'));
const StudyPlans                = lazy(() => import('../modules/university-management/study-plans'));

// Transportation Management System
const Vehicles                  = lazy(() => import('../modules/transport-management/vehicles'));
const BusStops                  = lazy(() => import('../modules/transport-management/bus-stops'));
const Routes                    = lazy(() => import('../modules/transport-management/routes'));
const Trips                     = lazy(() => import('../modules/transport-management/trips'));
const TripsBookings             = lazy(() => import('../modules/transport-management/trips-bookings'));

// Chat System
const Chat                      = lazy(() => import('../modules/chat'));
const ChatGroup                 = lazy(() => import('../modules/chat/components/chat-room'));

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
                id: 'profile',
                name: 'Profile',
                path: '/profile',
                isIndex: false,
                childRoutes: null,
                element: <Profile />,
                hasPermission: true
            },
            {
                id: 'subjects-registration',
                name: 'Subjects Registration',
                path: '/subjects-registration',
                isIndex: false,
                childRoutes: null,
                element: <SubjectsRegistration />,
                hasPermission: hasPermission('SubjectRegister.View')
            },
            {
                id: 'my-bookings',
                name: 'My Bookings',
                path: '/my-bookings',
                isIndex: false,
                childRoutes: null,
                element: <MyBookings />,
                hasPermission: true
            },
            {
                id: 'tickets',
                name: 'Tickets',
                path: '/tickets',
                isIndex: false,
                childRoutes: [
                    {
                        id: 'all-tickets',
                        name: 'All Tickets',
                        path: '/tickets',
                        isIndex: true,
                        childRoutes: null,
                        element: <AllTickets />,
                        hasPermission: hasPermission('AllTicket.View')
                    },
                    {
                        id: 'ticket-details',
                        name: 'Ticket Details',
                        path: '/tickets/:ticketId',
                        isIndex: false,
                        childRoutes: null,
                        element: <TicketDetails />,
                        hasPermission: hasPermission('AllTicket.View')
                    },
                ],
                element: <TicketsPage />,
                hasPermission: true
            },
            {
                id: 'tickets-types',
                name: 'Tickets Types',
                path: '/tickets-types',
                isIndex: false,
                childRoutes: null,
                element: <TicketsTypes />,
                hasPermission: hasPermission('TicketType.Insert')
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
            {
                id: 'chat',
                name: 'Chat',
                path: '/chat/:groupId?',
                isIndex: false,
                childRoutes: null,
                element: <Chat />,
                hasPermission: true
            },
        ],
        element: <ProtectedRoute><Main /></ProtectedRoute>,
        hasPermission: true
    },
    ...authRoutes,
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