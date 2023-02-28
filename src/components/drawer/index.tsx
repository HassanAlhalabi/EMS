import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/img/icons/spot-illustrations/falcon.png';
import { LayoutContext } from '../../contexts/layout-context';
import { drawerMenu } from '../../routes';
import NavList from '../nav-list';
import NavLink from '../nav-list/nav-link';
import NavListLabel from '../nav-list/nav-list-label';

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
            {/* {
              drawerMenu.map(menuItem => ({

              }))
            } */}

            <NavLink title="Dashboard" faIcon="fas fa-chart-pie" link="/" />

            <NavListLabel title='Users Management' />
            <NavLink title="Users" faIcon="fas fa-users" link="users" />
            <NavLink title="Roles" faIcon="fas fa-user" link="roles" />

            <NavListLabel title='University Management' />
            <NavLink title="Faculties" faIcon="fas fa-university" link="faculties" />
            <NavLink title="Library" faIcon="fas fa-archive">
              <NavLink title="Books" faIcon="fas fa-book" link="books" />
              <NavLink title="Categories" faIcon="fas fa-list-alt" link="books-categories" />
            </NavLink>

            <NavListLabel title='Students Management' />
            <NavLink title="Users" faIcon="fas fa-users" link="users" />
            <NavLink title="Roles" faIcon="fas fa-user" link="roles" />
            <NavLink title="Calendar" faIcon="fas fa-calendar-alt" link="#" />

            <NavListLabel title='Transport Management' />
            <NavLink title="Calendar" faIcon="fas fa-calendar-alt" link="#" />
            <NavLink title="Chat" faIcon="fas fa-comments" link="#" />
            <NavLink title="Calendar" faIcon="fas fa-calendar-alt" link="#" />

        </NavList>
      </div>
    </nav>
  )
}

export default Drawer
