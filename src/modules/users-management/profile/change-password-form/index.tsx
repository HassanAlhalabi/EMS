
import { Form, Button, Stack } from "react-bootstrap";
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback"
import { NewPassword } from "../../users/types";

const ChangePsswordForm = ({formik}:{formik: FormikProps<NewPassword>}) => {

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <h4 className="mb-3">
                Update Your Password:
            </h4>
            <Stack className="d-block d-sm-flex gap-2">
                <div  className="mb-3 flex-1">
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
                </div>
                <div className="mb-3 flex-1">
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
                </div>
                <div className="mb-3">
                    <Button className="btn-falcon-primary" 
                            disabled={!formik.dirty || !formik.isValid }
                            onClick={() => formik.handleSubmit()}
                            >Change Password</Button>
                </div>
            </Stack>
        </Form>
    )
}

export default ChangePsswordForm
