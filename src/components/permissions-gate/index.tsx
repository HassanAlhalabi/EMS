import { ReactNode } from "react";
import { hasPermission } from "../../util";

export default function PermissionsGate({
  children,
  scope
}:{children: ReactNode, scope: string | string[]}) {
    if(scope === '' ||  hasPermission(scope)) {
      return children
    }
    return null;
}