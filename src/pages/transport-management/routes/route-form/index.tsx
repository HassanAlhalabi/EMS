import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewBusStop } from "../../../../types/busstop";
import useGetCity from "../../../../hooks/useGetCity";

const RouteForm = ({formik}:{formik: FormikProps<NewBusStop>}) => {

    const fromCitiesSelect = useGetCity(null,{
        onCitySelect: city => formik.setFieldValue('fromId', city.cityId)
    });
    const toCitiesSelect =   useGetCity(null,{
        onCitySelect: city => formik.setFieldValue('toId', city.cityId)
    });

    console.log(formik.values)

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col md={12} lg={6}>
                    <Form.Group className="mb-3">
                        <h5>
                            Destination Location:
                        </h5>
                        { fromCitiesSelect.renderCitiesSelect() }
                        <Feedback type="invalid">
                            {formik.errors.nameAr as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col md={12} lg={6}>
                    <Form.Group className="mb-3">
                        <h5>
                            Destination Location:
                        </h5>
                        { toCitiesSelect.renderCitiesSelect() }
                        <Feedback type="invalid">
                            {formik.errors.nameEn as string}
                        </Feedback>
                    </Form.Group>
                </Col>
            </Row> 
        </Form>
    )
}

export default RouteForm
