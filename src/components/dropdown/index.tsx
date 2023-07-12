import { ReactNode } from "react"
import { Dropdown } from "react-bootstrap"

interface IDropdown {
    isOpen: boolean,
    handleToggleOpen: () => void,
    renderMenu: () => ReactNode,
    renderButton: () => ReactNode,
    handleBlur: () => void,
    extraClasses?: string
}

const toggleButtonStyle = {
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  padding: 0,
  display: 'flex'
}

const CDropdown = ({isOpen, 
                    handleToggleOpen, 
                    renderMenu, 
                    renderButton, 
                    extraClasses, 
                    handleBlur}: IDropdown) => {
  return (
    <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic" 
                        className="nav-link pe-0" 
                        style={toggleButtonStyle}>
        {renderButton()}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {renderMenu()}
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default CDropdown
