import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";
import { useQuery } from "react-query";

import Feedback from "../../../../components/feedback";
import { NewTripBooking } from "../types";
import { useGet } from "../../../../hooks";
import { Trip } from "../../trips/types";

const TripForm = ({formik}:{formik: FormikProps<NewTripBooking>}) => {

    const get = useGet();

    const { data: trips } = useQuery(
        ['/Trip/GetTrips'], 
    () => get(`/Trip/GetTrips?page=1&pageSize=2000`));

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col md={12} lg={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="chairNumber">
                            Chairs Number: 
                        </Form.Label>
                        <Form.Control
                            size="lg"
                            type="number"
                            required
                            placeholder="Chairs Number"
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
                            Trip: 
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
                                        {trip.route.from ? trip.route.from.cityName : 'University'} to {trip.route.to ? trip.route.to.cityName : 'University'}
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
