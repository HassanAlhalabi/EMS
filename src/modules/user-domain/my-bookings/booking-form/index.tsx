import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";
import { useQuery } from "react-query";

import Feedback from "../../../../components/feedback";
import { NewTripBooking } from "../types";
import { useGet } from "../../../../hooks";
import { Trip } from "../../../transport-management/trips/types";
import useTranslate from "../../../../hooks/useTranslate";

const TripForm = ({formik}:{formik: FormikProps<NewTripBooking>}) => {

    const get = useGet();

    const { data: trips } = useQuery(
        ['/Trip/GetTrips'], 
    () => get(`/Trip/GetTrips?page=1&pageSize=2000`));

    const t = useTranslate();

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col md={12} lg={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="chairNumber">
                            {t('chairs_number')}: 
                        </Form.Label>
                        <Form.Control
                            size="lg"
                            type="number"
                            required
                            placeholder={t('chairs_number')}
                            name="chairNumber"
                            value={formik.values.chairNumber} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.chairNumber as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col md={12} lg={8}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="tripId">
                            {t('trip')}: 
                        </Form.Label>
                        <Form.Select
                            size="lg"
                            required
                            id="tripId"
                            name="tripId"
                            value={formik.values.tripId} 
                            onChange={formik.handleChange}>
                                <option key="no-value" value="">---------------</option>
                            {
                                trips?.data.trips.map((trip: Trip) => 
                                    <option key={trip.tripId} value={trip.tripId}>
                                        {trip.route.from ? trip.route.from.cityName : t('university')} {t('to')} {trip.route.to ? trip.route.to.cityName : t('university')}
                                    </option>
                                )
                            }
                        </Form.Select>
                        <Feedback type="invalid">
                            {formik.errors.tripId as string}
                        </Feedback>
                    </Form.Group>     
                </Col>
            </Row> 
        </Form>
    )
}

export default TripForm
