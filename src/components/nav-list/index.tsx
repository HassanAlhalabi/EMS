import { ReactNode, useContext } from "react"
import { LayoutContext } from "../../contexts/layout-context"

const NavList = ({children}:{children: ReactNode}) => {

  const { setIsExpanded } = useContext(LayoutContext)

  return (
    // <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
      <div className="navbar-vertical-content scrollbar" onClick={e => setIsExpanded(true)}>
        <ul className="navbar-nav flex-column mb-3">
          {children}
        </ul>
      </div>
    // </nav>
  )
}

export default NavList
