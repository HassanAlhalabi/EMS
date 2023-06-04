import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import useGetCity from "../../../../hooks/useGetCity";
import { NewRoute } from "../types";
import { useEffect } from "react";

const RouteForm = ({formik}:{formik: FormikProps<NewRoute>}) => {

    const fromCitiesSelect = useGetCity(null,{
        onStateSelect: () => {
            toCitiesSelect.setDisabled(true);
            formik.setFieldValue('toId', null);
        },
        onCitySelect: city => { 
            formik.setFieldValue('fromId', city.cityId);
            toCitiesSelect.setDisabled(true);
            formik.setFieldValue('toId', null);
        },
        onStateDeSelect: () => {
            toCitiesSelect.setDisabled(false);
        }
    });
    const toCitiesSelect =   useGetCity(null,{
        onStateSelect: () => {
            fromCitiesSelect.setDisabled(true);
            formik.setFieldValue('fromId', null);
        },
        onCitySelect: city =>  {
            formik.setFieldValue('toId', city.cityId);
            fromCitiesSelect.setDisabled(true);
            formik.setFieldValue('fromId', null);
        },
        onStateDeSelect: () => {
            fromCitiesSelect.setDisabled(false);
        }
    })

    useEffect(() => {
        if(formik.values.from?.cityId) {
            fromCitiesSelect.setSelectedCity([{
                cityId: formik.values.from.cityId,
                cityName: formik.values.from.cityName,
                label: formik.values.from.cityName
            }]);
            fromCitiesSelect.setSelectedState([{
                stateId: formik.values.from.state?.stateId,
                stateName: formik.values.from.state?.stateName,
                label: formik.values.from.state?.stateName
            }])
        }
    },[formik.values.from])

    useEffect(() => {
        if(formik.values.to?.cityId) {
            toCitiesSelect.setSelectedCity([{
                cityId: formik.values.to.cityId,
                cityName: formik.values.to.cityName,
                label: formik.values.to.cityName
            }]);
            toCitiesSelect.setSelectedState([{
                stateId: formik.values.to.state?.stateId,
                stateName: formik.values.to.state?.stateName,
                label: formik.values.to.state?.stateName
            }])
        }
    },[formik.values.to])

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
