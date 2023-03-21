
import member from '../../../assets/img/team/3-thumb.png';
import ProfileMenu from './profile-menu';
import { useContext, useState } from 'react';
import CDropdown from '../../dropdown';
import NotificationMenu from '../notification-menu';
import { LayoutContext } from '../../../contexts/layout-context';

const HeaderProfile = () => {

  const [profileMenuIsOpen, setProfileMenuIsOpen] = useState(false);
  const handleToggleProfileMenu = () => setProfileMenuIsOpen(prev => !prev);

  const [notificationMenuIsOpen, setNotificationMenuIsOpen] = useState(false);
  const handleToggleNotificationMenu = () => setNotificationMenuIsOpen(prev => !prev);
  const handleBlur = () =>  { 
    setNotificationMenuIsOpen(false)
  }

  const { theme, toggleTheme } = useContext(LayoutContext);

  return (
    
    <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">

      <li className="nav-item">
        <div className="theme-control-toggle pl-2" onClick={toggleTheme}>
          <label className="mb-0 theme-control-toggle-label theme-control-toggle-light" htmlFor="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="" data-bs-original-title="Switch to light theme" aria-label="Switch to light theme">
              {
                theme === 'DARK' ? 
                <i className="fas fa-sun fs-0"></i> :
                <i className="fas fa-moon fs-0"></i>
              }
          </label>
        </div>
      </li>

    <li className="nav-item">

      <CDropdown
        handleBlur={() => setNotificationMenuIsOpen(false)}
        isOpen={notificationMenuIsOpen}
        renderButton={() => (      <a className="nav-link notification-indicator notification-indicator-primary px-2 " id="navbarDropdownNotification" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="fas fa-bell" style={{fontSize: '24px'}}></span> 
                      </a>)}
        renderMenu={() => <NotificationMenu />}       
        handleToggleOpen={handleToggleNotificationMenu} 
      />
  
    </li>
    <li className="nav-item" onBlur={handleBlur}>
      <CDropdown
        handleBlur={() => setProfileMenuIsOpen(false)}
        isOpen={profileMenuIsOpen}
        handleToggleOpen={handleToggleProfileMenu}
        renderButton={() => <div className="avatar avatar-xl">
                        <img className="rounded-circle" src={member} alt="" />
                      </div>}
        renderMenu={() => <ProfileMenu />}
      />
    </li>
  </ul>
  )
}

export default HeaderProfile
