import HeaderProfile from "../header-profile"
import HeaderSearch from "../header-search"
import { useContext } from 'react';
import { LayoutContext } from "../../../contexts/layout-context";
import { Link } from "react-router-dom";

const HeaderNav = () => {

  const { toggleDrawer } = useContext(LayoutContext);

  return (
    <nav className="navbar navbar-light navbar-glass navbar-top navbar-expand">
      
      <button className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" 
              onClick={toggleDrawer}
              type="button"  aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation">
          <span className="navbar-toggle-icon">
              <span className="toggle-line"></span>
          </span>
      </button>

      <Link className="navbar-brand me-1 me-sm-3" to="/">
        <div className="d-flex align-items-center">
          <img className="me-2" src="assets/img/icons/spot-illustrations/falcon.png" alt="" width="40" />
          <span className="font-sans-serif">falcon</span>
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
