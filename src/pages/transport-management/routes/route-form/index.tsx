import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import useGetCity from "../../../../hooks/useGetCity";
import { Route } from "../types";

const RouteForm = ({formik}:{formik: FormikProps<Route>}) => {

    const fromCitiesSelect = useGetCity(null,{
        initialValues: {state: {
                                stateId: formik.values.fromId,
                                stateName: formik.values?.fromName    
                                },
                        city: {
                                cityId: formik.values.toId,
                                cityName: formik.values?.fromName    
                        }},
        onCitySelect: city => formik.setFieldValue('fromId', city.cityId)
    });
    const toCitiesSelect =   useGetCity(null,{
        initialValues: {state: {
                                    stateId: formik.values.toId,
                                    stateName: formik.values?.toName    
                                },
                        city: {
                                    cityId: formik.values.toId,
                                    cityName: formik.values?.toName    
                        }},
        onCitySelect: city => formik.setFieldValue('toId', city.cityId)
    });

    console.log(formik.values)

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col md={12} lg={6}>
                    <Form.Group className="mb-3">
                        <h5>
                            Departure Location:
                        </h5>
                        { fromCitiesSelect.renderCitiesSelect() }
                        <Feedback type="invalid">
                            {formik.errors.fromId as string}
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
                            {formik.errors.toId as string}
                        </Feedback>
                    </Form.Group>
                </Col>
            </Row> 
        </Form>
    )
}

export default RouteForm
