
import { Form, Row, Col, Button } from "react-bootstrap";
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback"
import { NewPassword } from "../../users/types";

const ChangePsswordForm = ({formik}:{formik: FormikProps<NewPassword>}) => {

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <h4 className="mb-3">
                Update Your Password:
            </h4>
            <Row className="align-items-start">
                <Col md="5" className="mb-3">
                    <Form.Group>
                        <Form.Control   name="newPassword" 
                                        placeholder="New Password..."
                                        onChange={formik.handleChange}
                                        value={formik.values.newPassword} 
                                        required
                                        type="password" />
                    </Form.Group>
                    <Feedback type="invalid">
                            {formik.errors.newPassword as string}
                        </Feedback>
                </Col>
                <Col md="5" className="mb-3">
                    <Form.Group>
                        <Form.Control   required
                                        type="password"
                                        name="confirmPassword" 
                                        placeholder="Confirm New Password..."
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword} />
                        <Feedback type="invalid">
                            {formik.errors.confirmPassword as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col md="2" className="mb-3">
                    <Button className="btn-falcon-primary" 
                            disabled={!formik.dirty || !formik.isValid }
                            onClick={() => formik.handleSubmit()}
                            >Change Password</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default ChangePsswordForm
