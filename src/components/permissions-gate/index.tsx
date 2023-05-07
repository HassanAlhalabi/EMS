import { ReactNode } from "react";
import { hasPermission } from "../../util";

export default function PermissionsGate({
  children,
  scope
}:{children: ReactNode, scope: string | string[]}) {
    return hasPermission(scope) ? <>{children}</> : null;
}