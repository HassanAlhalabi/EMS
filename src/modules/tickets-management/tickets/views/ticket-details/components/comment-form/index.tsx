import { Col, Form, Row } from "react-bootstrap";
import { FormikProps } from "formik";

import PermissionsGate from "../../../../../../../components/permissions-gate";
import Button from "../../../../../../../components/button";
import { NewTicketResult } from "../../../../types";
import useFilesUpload from "../../../../../../../hooks/useFilesUpload";
import Feedback from "../../../../../../../components/feedback";


const CommnetForm = ({ formik }: {formik: FormikProps<NewTicketResult>}) => {

    const {renderPreview} = useFilesUpload({
        onUpload: (files) => formik.setFieldValue('attachments', files)
    });

    return   <PermissionsGate scope=''>
                <Form noValidate validated={formik.dirty} autoComplete="off" className="mb-3">
                    <Row>
                        <Col>
                            <Form.Group className="h-100 mb-3">
                                <Form.Control   as='textarea' 
                                                className="h-75"
                                                placeholder="Add Your Comment..."
                                                required
                                                name="description"
                                                value={formik.values.description} 
                                                onChange={formik.handleChange} />
                                    <Feedback type="invalid">
                                        {formik.errors.description as string}
                                    </Feedback>
                                </Form.Group>                   
                        </Col>
                        <Col>
                            <Form.Group>
                                {renderPreview()}
                            </Form.Group>
                        </Col>
                    </Row>
                    <Button scope={""} 
                            className="btn btn-falcon-primary" 
                            onClick={() => formik.handleSubmit()}>Add Comment</Button>
                </Form>
            </PermissionsGate>;
}
 
export default CommnetForm;