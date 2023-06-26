import { hasPermission } from "../../../util"

const NavListLabel = ({title, scope}:{title: string, scope?: string[]}) => {
  return scope && hasPermission(scope) ? (
    <div className="row navbar-vertical-label-wrapper mt-3 mb-2">
        <div className="col-auto navbar-vertical-label">{title}</div>
        <div className="col ps-0">
            <hr className="mb-0 navbar-vertical-divider" />
        </div>
    </div>
  ) : null
}

export default NavListLabel
