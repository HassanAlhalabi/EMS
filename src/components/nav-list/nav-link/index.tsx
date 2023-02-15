import { Children, ReactNode, useState } from "react";
import { Collapse } from "react-bootstrap";

interface INavLink {
    faIcon: string,
    title: string,
    link: string,
    children?: ReactNode,
}

const NavLink = ({faIcon,title,link, children}:INavLink) => {

    const [expanded, setExpanded] = useState(false);
    const isParent = Children.count(children) > 0;

    const toggleMenuList = () => setExpanded(prev => !prev);

    return (
        <li className="nav-item">
            <a  className={`nav-link ${isParent ? 'dropdown-indicator' : '' } ${expanded ? '' : 'collapesed'}`} 
                href={link} 
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
            {
            isParent &&
            <Collapse in={expanded}>
                <ul className='nav' id="dashboard">
                    {children}
                </ul>
            </Collapse>
            }
            </li>
    )
}

export default NavLink
