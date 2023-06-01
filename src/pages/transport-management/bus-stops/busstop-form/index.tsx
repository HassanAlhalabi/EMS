import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewBusStop } from "../../../../types/busstop";
import useGetCity from "../../../../hooks/useGetCity";

const BusStopForm = ({formik}:{formik: FormikProps<NewBusStop>}) => {

    const {renderCitiesSelect} = useGetCity(formik);

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                            size="lg"
                            required
                            type="text" 
                            placeholder="Arabic Bus Stop Name"
                            name="nameAr"
                            value={formik.values.nameAr} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.nameAr as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                            size="lg"
                            required
                            type="text" 
                            placeholder="English Bus Stop Name"
                            name="nameEn"
                            value={formik.values.nameEn} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.nameEn as string}
                        </Feedback>
                    </Form.Group>
                </Col>
            </Row> 
            {renderCitiesSelect()}
        </Form>
    )
}

export default BusStopForm
