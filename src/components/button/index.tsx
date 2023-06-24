import { ButtonProps } from "react-bootstrap";
import PermissionsGate from "../permissions-gate";

const Button = (props: ButtonProps & {scope: string}) => {
    return  <PermissionsGate scope={props.scope || ''}>
                <button type="button"
                        {...props}
                        className={`btn ${props?.className}`} >        
                    {props.children}
                </button>
            </PermissionsGate>
}

export default Button;