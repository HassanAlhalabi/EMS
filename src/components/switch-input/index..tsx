import { Form } from 'react-bootstrap'
import { FormCheckInputProps } from 'react-bootstrap/esm/FormCheckInput'
import PermissionsGate from '../permissions-gate'

const SwitchInput = (props: FormCheckInputProps & {scope?: string}) => {
  return (
    <PermissionsGate scope={props.scope || ''}>
        <div className='switch-input'>
          <Form.Switch {...props} />
        </div>
    </PermissionsGate>
  )
}

export default SwitchInput
