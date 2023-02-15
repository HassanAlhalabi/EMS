import { ReactNode } from "react"
import { Fade } from "react-bootstrap"

interface IDropdown {
    isOpen: boolean,
    handleToggleOpen: () => void,
    renderMenu: () => ReactNode,
    renderButton: () => ReactNode,
    handleBlur: () => void,
    extraClasses?: string
}

const Dropdown = ({isOpen, handleToggleOpen, renderMenu, renderButton, extraClasses, handleBlur}: IDropdown) => {
  return (
    <div style={{position: 'relative'}}>

      <a  className="nav-link pe-0" 
        role="button"  
        aria-haspopup="true" 
        onClick={handleToggleOpen}>
          {renderButton()}
      </a>

      <Fade in={isOpen} >
        <div onBlur={handleBlur} className={`dropdown-menu dropdown-menu-end py-0 ${extraClasses}`}
            aria-labelledby="navbarDropdownUser">
            <div className="bg-white dark__bg-1000 rounded-2 py-2">
              {renderMenu()}
            </div>
        </div>
      </Fade>

    </div>
  )
}

export default Dropdown
