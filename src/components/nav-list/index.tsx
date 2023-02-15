import { ReactNode } from "react"

const NavList = ({children}:{children: ReactNode}) => {
  return (
    // <nav className="navbar navbar-light navbar-vertical navbar-expand-xl">
      <div className="navbar-vertical-content scrollbar">
        <ul className="navbar-nav flex-column mb-3">
          {children}
        </ul>
      </div>
    // </nav>
  )
}

export default NavList
