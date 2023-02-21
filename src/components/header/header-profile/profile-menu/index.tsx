import { MouseEvent, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../contexts/auth-context';
import { removeCookie } from '../../../../util';

const ProfileMenu = () => {

  const navigate = useNavigate();
  const {setAuthUser} = useContext(AuthContext);

  const handleLogOut = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setAuthUser(false);
    removeCookie('EMSUser');
    navigate('/sign-in');
  }

  return (
      <>
        <a className="dropdown-item fw-bold text-warning" href="#!"> <span className="fas fa-crown me-1"></span> <span>Go Pro</span></a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#!">Set status</a>
        <a className="dropdown-item" href="pages/user/profile.html">Profile &amp; account</a>
        <a className="dropdown-item" href="#!">Feedback</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="pages/user/settings.html">Settings</a>
        <a className="dropdown-item" href="#" onClick={e => handleLogOut(e)}>Logout</a>
      </>
  )
}

export default ProfileMenu
