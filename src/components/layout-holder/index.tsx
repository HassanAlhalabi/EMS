import { ReactNode, useContext } from "react";
import { LayoutContext } from "../../contexts/layout-context";
import LayoutSettings from "../layout-settings";

const LayoutHolder = ({ children } : { children: ReactNode }) => {
  
  const { drawerIsExpanded, theme } = useContext(LayoutContext);
  
  return (
    <div  className={`${drawerIsExpanded ? '' : 'navbar-vertical-collapsed' } 
          ${theme === 'DARK' ? 'dark' : ''} `}>

      <main className="main" >
        <div className='container-fluid'>
          {children}
        </div>
      </main>

      {/* <LayoutSettings /> */}

    </div>
  )
}

export default LayoutHolder
