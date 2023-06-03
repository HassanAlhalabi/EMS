import { Children, ReactNode, useState } from "react";
import { Collapse } from "react-bootstrap";
import { NavLink, To } from "react-router-dom";
import { hasPermission } from "../../../util";

interface INavLink {
    faIcon: string,
    title: string,
    link?: To,
    scope?: string | string[],
    children?: ReactNode,
}

const CustomNavLink = ({faIcon,title,link,scope, children}:INavLink) => {

    const [expanded, setExpanded] = useState(false);
    const isParent = Children.count(children) > 0;

    const toggleMenuList = () => setExpanded(prev => !prev);

    if(scope && !hasPermission(scope)) return null;

    return isParent ? (
        <li className="nav-item">
            <a className={`nav-link dropdown-indicator ${expanded ? '' : 'collapesed'}`} 
                href="#"
                role="button" 
                aria-expanded={expanded && isParent}
                aria-controls="dashboard"
                onClick={toggleMenuList}>
                <div className="d-flex align-items-center">
                    <span className="nav-link-icon">
                        <span className={faIcon}></span>
                    </span>
                    <span className="nav-link-text ps-1">{title}</span>
                </div>
            </a>
            <li className="nav-item ps-2">
                <Collapse in={expanded}>
                    <ul className='nav' id="dashboard">
                        {children}
                    </ul>
                </Collapse>
            </li>
    </li>) : (  <NavLink  
                    className={`nav-link`} 
                    to={link ? link : '/'} 
                    role="button">
                    <div className="d-flex align-items-center">
                        <span className="nav-link-icon">
                            <span className={faIcon}></span>
                        </span>
                        <span className="nav-link-text ps-1">{title}</span>
                    </div>
                </NavLink>)
}

export default CustomNavLink
