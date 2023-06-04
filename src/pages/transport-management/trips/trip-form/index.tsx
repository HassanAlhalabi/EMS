import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewTrip } from "../types";

const TripForm = ({formik}:{formik: FormikProps<NewTrip>}) => {

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col md={12} lg={6}>
                    
                </Col>
                <Col md={12} lg={6}>
                
                </Col>
            </Row> 
        </Form>
    )
}

export default TripForm
