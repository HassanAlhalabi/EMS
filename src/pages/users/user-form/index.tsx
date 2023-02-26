import { Form } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { FormikHook } from "../../../types/formik"

const UserForm = ({formik}:{formik: FormikHook}) => {
  return (
    <Form noValidate validated={formik.dirty}>
        <Form.Group className="mb-3">
            <Form.Control
                size="lg"
                required
                type="text" 
                placeholder="User Name"
                name="userName"
                value={formik.values.userName} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.userName}
            </Feedback>
        </Form.Group> 
        <Row>
        <Col>
            <Form.Group className="mb-3">
            <Form.Control
                size="lg"
                required
                type="text" 
                placeholder="First Name"
                name="firstName"
                value={formik.values.firstName} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.firstName}
            </Feedback>
            </Form.Group>
        </Col>
        <Col>
            <Form.Group className="mb-3">
            <Form.Control
                size="lg"
                required
                type="text" 
                placeholder="First Name"
                name="firstName"
                value={formik.values.firstName} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.firstName}
            </Feedback>
            </Form.Group>
        </Col>
        </Row>  
    </Form>
  )
}

export default UserForm
