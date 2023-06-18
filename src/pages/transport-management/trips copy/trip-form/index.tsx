import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";
import { useQuery } from "react-query";
import Select from 'react-select';

import Feedback from "../../../../components/feedback";
import { NewTrip } from "../types";
import { useGet } from "../../../../hooks";
import { VehicleDropDown } from "../../vehicles/types";
import { RouteDropDown } from "../../routes/types";
import { BusStop } from "../../../../types/busstop";

const TripForm = ({formik}:{formik: FormikProps<NewTrip>}) => {

    const get = useGet();

    const { data: routes } = useQuery(
        ['/Route/GetDropDownRoutes'], 
    () => get(`/Route/GetDropDownRoutes`));

    const { data: vehicles } = useQuery(
        ['/Vehicle/GetDropdownVehicles'], 
    () => get(`/Vehicle/GetDropDownVehicles`));

    const { data: busStopsData, isLoading: busStopsLoading } = useQuery(
        ['/BusStop/GetBusStops'], 
    () => get(`/BusStop/GetBusStops?page=1&pageSize=200`));

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col md={12} lg={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="departureHour">
                            Departure Hour: 
                        </Form.Label>
                        <Form.Control
                            size="lg"
                            required
                            type="time" 
                            placeholder="Departure Hour"
                            name="departureHoure"
                            value={formik.values.departureHoure} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.departureHoure as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col md={12} lg={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="routeId">
                            Route: 
                        </Form.Label>
                        <Form.Select
                            size="lg"
                            required
                            id="routeId"
                            name="routeId"
                            value={formik.values.routeId} 
                            onChange={formik.handleChange}>
                                <option key="no-value" value="">---------------</option>
                            {
                                routes?.data.map((route: RouteDropDown) => 
                                    <option key={route.routeId} value={route.routeId}>
                                        {route.from ? route.from.cityName : 'University'} to {route.to ? route.to.cityName : 'University'}
                                    </option>
                                )
                            }
                        </Form.Select>
                        <Feedback type="invalid">
                            {formik.errors.routeId as string}
                        </Feedback>
                    </Form.Group>     
                </Col>
                <Col md={12} lg={4}>
                    <Form.Group>
                        <Form.Label htmlFor="vehicleId">
                            Vehicle: 
                        </Form.Label>
                        <Form.Select
                            size="lg"
                            required
                            id="vehicleId"
                            name="vehicleId"
                            value={formik.values.vehicleId} 
                            onChange={formik.handleChange}>
                                <option key="no-value" value="">---------------</option>
                            {
                                vehicles?.data.map((vehicle: VehicleDropDown) => 
                                    <option key={vehicle.vehicleId} value={vehicle.vehicleId}>{vehicle.vehicleBrand} {vehicle.vehiclePlate}</option>
                                )
                            }
                        </Form.Select> 
                        <Feedback type="invalid">
                            {formik.errors.vehicleId as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col md={12}>
                    <Form.Group>
                        <Form.Label htmlFor="busStops">
                            Bus Stops: 
                        </Form.Label>
                            <Select
                                id="busStops"
                                name='busStops'
                                isMulti
                                isLoading={busStopsLoading}
                                options={busStopsData?.data.busStops?.map((busStop: BusStop)=> ({
                                            value: busStop.busStopId,
                                            label: busStop.busStopName
                                        }))}
                                onChange={(newOptions) => {formik.setFieldValue('busStops',newOptions)}} 
                                value={formik.values.busStops}/>
                        <Feedback type="invalid">
                            {formik.errors.busStops as string}
                        </Feedback>
                    </Form.Group>
                </Col>
            </Row> 
        </Form>
    )
}

export default TripForm
