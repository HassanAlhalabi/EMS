
export interface PaneHeadProps {
    title: string,
    icon: string,
    status: 'active' | 'done' | 'unactive'
}

const PaneHead = ({title, icon, status}: PaneHeadProps) => {
    return (
        <li className="nav-item">
            <a href="#" className={`nav-link fw-semi-bold ${status}`} >
                <span className="nav-item-circle-parent">
                    <span className="nav-item-circle">
                        <span className={`fas ${icon}`}></span> 
                    </span>
                </span>
                <span className="d-none d-md-block mt-1 fs--1">
                    {title}
                </span>
            </a>
        </li>
    )
}

export default PaneHead
