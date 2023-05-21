import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/icons/spot-illustrations/falcon.png';
import { LayoutContext } from '../../contexts/layout-context';
// import { drawerMenu } from '../../routes';
import NavList from '../nav-list';
import NavLink from '../nav-list/nav-link';
import NavListLabel from '../nav-list/nav-list-label';
import PermissionsGate from '../permissions-gate';

const Drawer = () => {

  const {toggleDrawer, drawerIsExpanded} = useContext(LayoutContext);

  return (
    <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">

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
            <img className="me-2" src={Logo} alt="" width="40" />
            <span className="font-sans-serif">falcon</span>
          </div>
        </Link>
      </div>

      <div className={`collapse navbar-collapse ${drawerIsExpanded ? 'show' : ''}`}>
        <NavList>

            <NavLink title="Dashboard" faIcon="fas fa-chart-pie" link="/" />
            <NavListLabel title='Users Management' scope={['User.View','Role.View']}/>
            <NavLink title="Users" faIcon="fas fa-users" link="users" scope='User.Insert' />
            <NavLink title="Roles" faIcon="fas fa-user" link="roles" scope='Role.Insert'/>

            <NavListLabel title='University Management' 
                          scope={['Faculty.View',
                                  'Subject.View',
                                  'SubjectType.View',
                                  'Book.View',
                                  'Category.View',
                                  'Department.View',
                                  'Semester.View',
                                  'StudentSuggestedSubject.View',
                                  'StudyPlan.View']} />
            <NavLink title="Faculties" faIcon="fas fa-university" link="faculties" scope='Faculty.View' />
            <NavLink title="Subjects" faIcon="fas fa-chalkboard-teacher" link="subjects" scope='Subject.View' />
            <NavLink title="Subjects Types" faIcon="fas fa-book-open" link="subjects-types" scope='SubjectType.View' />
            <NavLink title="Library" faIcon="fas fa-archive" scope={['Book.View','Category.View']}>
              <NavLink title="Books" faIcon="fa fa-book" link="books" scope='Book.View' />
              <NavLink title="Categories" faIcon="fas fa-list-alt" link="books-categories" scope='Category.View' />
            </NavLink>
            <NavLink title="Departments" faIcon="fas fa-people-roof" link="departments" scope='Department.View' />
            <NavLink title="Semesters" faIcon="fas fa-calendar" link="semesters" scope='Semester.View' />
            <NavLink title="Subjects Suggestions" faIcon="fas fa-calendar" link="suggested-subjects" scope='StudentSuggestedSubject.View' />
            <NavLink title="Study Plans" faIcon="fas fa-calendar" link="study-plans" scope='StudyPlan.View' />

            <NavListLabel title='Transport Management' scope={['Booking.View',
                                  'BusStop.View',
                                  'City.View',
                                  'Route.View',
                                  'State.View',
                                  'Trip.View',
                                  'Vheicle.View']} />
            <NavLink title="Bookings" faIcon="fas fa-calendar-alt" link="#" scope='' />
            <NavLink title="Trips" faIcon="fas fa-car-alt" link="#" scope='' />
            <NavLink title="States" faIcon="fas fa-map-marker" link="#" scope='' />
            <NavLink title="Cities" faIcon="fas fa-city" link="#" scope='' />
            <NavLink title="Vehicles" faIcon="fas fa-car" link="#" scope='' />
            <NavLink title="Routes" faIcon="fas fa-route" link="#" scope='' />
            <NavLink title="Bus Stops" faIcon="fas fa-bus" link="#" scope='' />

        </NavList>
      </div>
    </nav>
  )
}

export default Drawer
