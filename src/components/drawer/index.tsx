import { useContext } from 'react';
import Logo from '../../assets/img/icons/spot-illustrations/falcon.png';
import { LayoutContext } from '../../contexts/layout-context';
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
        <a className="navbar-brand" href="/">
          <div className="d-flex align-items-center py-3">
            <img className="me-2" src={Logo} alt="" width="40" />
            <span className="font-sans-serif">falcon</span>
          </div>
        </a>
      </div>

      <div className={`collapse navbar-collapse ${drawerIsExpanded ? 'show' : ''}`}>
        <NavList>
            <NavLink title="Dashboard" faIcon="fas fa-chart-pie" link="#">
              <NavLink title="Dashboard" faIcon="fas fa-chart-pie" link="#" />
            </NavLink>

            <NavListLabel title='App' />
            <NavLink title="Calendar" faIcon="fas fa-calendar-alt" link="#" />
            <NavLink title="Chat" faIcon="fas fa-comments" link="#" />
            <NavLink title="Calendar" faIcon="fas fa-calendar-alt" link="#" />

            <NavListLabel title='Pages' />
            <NavLink title="Calendar" faIcon="fas fa-calendar-alt" link="#">
              <NavLink title="Chat" faIcon="fas fa-comments" link="#" />
              <NavLink title="Calendar" faIcon="fas fa-calendar-alt" link="#" />
            </NavLink>
        </NavList>
      </div>
    </nav>
  )
}

export default Drawer
