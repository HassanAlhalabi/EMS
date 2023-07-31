import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LayoutContext } from '../../contexts/layout-context';
import NavList from '../nav-list';
import NavLink from '../nav-list/nav-link';
import NavListLabel from '../nav-list/nav-list-label';
import Logo from '../logo';
import { useTranslation } from 'react-i18next';
import { useBlur } from '../../hooks/useBlur';

const Drawer = () => {

  const {toggleDrawer, drawerIsExpanded, setIsExpanded} = useContext(LayoutContext);
  const { t } = useTranslation();
  const drawerRef = useRef(null);
  const handleOnBlur = () => { 
    if(window.innerWidth >= 1200) return;
    setIsExpanded(false) 
  };
  useBlur(drawerRef, handleOnBlur);

  return (
    <nav className="navbar navbar-light navbar-vertical navbar-expand-xl ps-3">

      <div className="d-flex align-items-center">
        <div className="toggle-icon-wrapper">
          <button onClick={toggleDrawer} 
                  className="btn navbar-toggler-humburger-icon navbar-vertical-toggle"  
                  title="Toggle Navigation">
            <span className="navbar-toggle-icon">
              <span className="toggle-line"></span>
            </span>
          </button>
        </div>
        <Link className="navbar-brand" to="/">
          <div className="d-flex align-items-center py-3">
            <Logo />
          </div>
        </Link>
      </div>

      <div  ref={drawerRef}  
            className={`collapse navbar-collapse w-sm-75 w-100 w-md-50 w-xl-100
            ${drawerIsExpanded ? 'show' : ''}`}>
        <NavList>

            <NavLink title={t('dashboard')} faIcon="fas fa-chart-pie" link="/" />
            <NavLink title="Subjects Registration" faIcon="fas fa-book "link="subjects-registration" scope="SubjectRegister.View" />
            <NavLink title={t('my_bookings')} faIcon="fas fa-bus "link="my-bookings" />
            <NavLink title={t('chat')} faIcon="fas fa-message"link="chat" />

            <NavListLabel title={t('tasks_management')} scope={['AllTicket.View','TicketType.Insert']}/>
            <NavLink title={t('tasks')} faIcon="fas fa-tasks" link="tickets" scope='AllTicket.View'/>
            <NavLink title={t('task_types')} faIcon="fas fa-ticket" link="tickets-types" scope='TicketType.Insert'/>

            <NavListLabel title={t('users_management')} scope={['User.View','Role.View']}/>
            <NavLink title={t('users')} faIcon="fas fa-users" link="users" scope='User.Insert' />
            <NavLink title={t('roles')} faIcon="fas fa-user" link="roles" scope='Role.Insert'/>

            <NavListLabel title={t('university_management')} 
                          scope={['Faculty.View',
                                  'Subject.View',
                                  'SubjectType.View',
                                  'Book.View',
                                  'Category.View',
                                  'Department.View',
                                  'Semester.View',
                                  'StudentSuggestedSubject.View',
                                  'StudyPlan.View']} />
            <NavLink title={t('faculties')} faIcon="fas fa-university" link="faculties" scope='Faculty.View' />
            <NavLink title={t('subjects')} faIcon="fas fa-chalkboard-teacher" link="subjects" scope='Subject.View' />
            <NavLink title={t('subjects_types')} faIcon="fas fa-book-open" link="subjects-types" scope='SubjectType.View' />
            <NavLink title={t('library')} faIcon="fas fa-archive" scope={['Book.View','Category.View']}>
              <NavLink title={t('books')} faIcon="fa fa-book" link="books" scope='Book.View' />
              <NavLink title={t('categories')} faIcon="fas fa-list-alt" link="books-categories" scope='Category.View' />
            </NavLink>
            <NavLink title={t('departments')} faIcon="fas fa-people-roof" link="departments" scope='Department.View' />
            <NavLink title={t('semesters')} faIcon="fas fa-calendar" link="semesters" scope='Semester.View' />
            <NavLink title={t('subjects_suggestions')} faIcon="fas fa-calendar" link="suggested-subjects" scope='StudentSuggestedSubject.View' />
            <NavLink title={t('subjects_suggestions')} faIcon="fas fa-calendar" link="suggested-subjects-manage" scope='StudentSuggestedSubjectForAdmin.View' />
            <NavLink title={t('study_plans')} faIcon="fas fa-calendar" link="study-plans" scope='StudyPlan.View' />

            <NavListLabel title={t('transport_management')} scope={['Booking.View',
                                                              'BusStop.View',
                                                              'City.View',
                                                              'Route.View',
                                                              'State.View',
                                                              'Trip.View',
                                                              'Vheicle.View']} />
            <NavLink title={t('trips_bookings')} faIcon="fas fa-calendar-alt" link="trips-bookings" scope='AllBooking.View'/>
            <NavLink title={t('trips')} faIcon="fas fa-car-alt" link="trips" />
            <NavLink title={t('vehicles')} faIcon="fas fa-car" link="vehicles" scope='Vehicle.View' />
            <NavLink title={t('bus_stops')} faIcon="fas fa-bus" link="bus-stops" scope='BusStop.View' />
            <NavLink title={t('routes')} faIcon="fas fa-route" link="routes" scope='Route.View' />

        </NavList>
      </div>
    </nav>
  )
}

export default Drawer
