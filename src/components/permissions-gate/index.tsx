import { hasPermission } from "../../util";

export default function PermissionsGate({
  children,
  scope
}:{children: JSX.Element, scope: string | string[]}) {
    if(scope === '' ||  hasPermission(scope)) {
      return children
    }
    return null;
}