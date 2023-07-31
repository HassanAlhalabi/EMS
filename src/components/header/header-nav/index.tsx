import { useContext } from 'react';

import { Link } from "react-router-dom";

import HeaderProfile from "../header-profile"
import { LayoutContext } from "../../../contexts/layout-context";
import Logo from '../../logo';

const HeaderNav = () => {

  const { toggleDrawer } = useContext(LayoutContext);

  return (
    <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand">
      
      <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" 
              onClick={e => {e.stopPropagation(); toggleDrawer()}}
              type="button"  aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation">
          <span className="navbar-toggle-icon">
              <span className="toggle-line"></span>
          </span>
      </button>

      <Link className="navbar-brand me-1 me-sm-3" to="/">
        <div className="d-flex align-items-center">
          <Logo />
        </div>
      </Link>

      {/* <ul className="navbar-nav align-items-center d-none d-lg-block">
        <li className="nav-item">
            <HeaderSearch />
        </li>
      </ul> */}

      <HeaderProfile />

  </nav>
  )
}

export default HeaderNav
