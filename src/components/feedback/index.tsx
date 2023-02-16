import { ReactNode } from 'react';
import { Form } from 'react-bootstrap';

type VALID_TYPES = 'valid' | 'invalid';

interface IFeedback {
    type: VALID_TYPES,
    children: ReactNode
}

const Feedback = ({type,children}: IFeedback) => {
  return (
    <Form.Control.Feedback type={type}>
        {children}
    </Form.Control.Feedback>
  )
}

export default Feedback
