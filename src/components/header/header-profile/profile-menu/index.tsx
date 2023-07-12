import { MouseEvent, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/auth-context';
import { removeCookie } from '../../../../util';

const ProfileMenu = () => {

  const navigate = useNavigate();
  const {setAccess} = useContext(AuthContext);

  const handleLogOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAccess(null);
    removeCookie('EMSUser');
    navigate('/sign-in');
  }

  return (
      <>
        {/* <a className="dropdown-item fw-bold text-warning" href="#!"> <span className="fas fa-crown me-1"></span> <span>Go Pro</span></a> */}
        {/* <div className="dropdown-divider"></div> */}
        {/* <a className="dropdown-item" href="#!">Set status</a> */}
        <Link className="dropdown-item" to="/profile"> <span className="fas fa-user me-1"></span>  Profile &amp; account</Link>
        {/* <a className="dropdown-item" href="#!">Feedback</a> */}
        {/* <div className="dropdown-divider"></div> */}
        {/* <a className="dropdown-item" href="pages/user/settings.html"> <span className="fas fa-gear me-1"></span>  Settings</a> */}
        <a className="dropdown-item" href="#" onClick={e => handleLogOut(e)}> <span className="fas fa-sign-out me-1"></span>  Logout</a>
      </>
  )
}

export default ProfileMenu
