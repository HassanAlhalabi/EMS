
const ProfileMenu = () => {
  return (
      <>
        <a className="dropdown-item fw-bold text-warning" href="#!"> <span className="fas fa-crown me-1"></span> <span>Go Pro</span></a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="#!">Set status</a>
        <a className="dropdown-item" href="pages/user/profile.html">Profile &amp; account</a>
        <a className="dropdown-item" href="#!">Feedback</a>
        <div className="dropdown-divider"></div>
        <a className="dropdown-item" href="pages/user/settings.html">Settings</a>
        <a className="dropdown-item" href="pages/authentication/card/logout.html">Logout</a>
      </>
  )
}

export default ProfileMenu
