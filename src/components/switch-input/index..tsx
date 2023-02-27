import { Form } from 'react-bootstrap'
import { FormCheckInputProps } from 'react-bootstrap/esm/FormCheckInput'

const SwitchInput = (props: FormCheckInputProps) => {
  return (
    <div className='switch-input'>
        <Form.Switch {...props} />
    </div>
  )
}

export default SwitchInput
