import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../components/feedback";
import { NewVehicle } from "../../../types/vehicles";

const BookForm = ({formik}:{formik: FormikProps<NewVehicle>}) => {

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder="Vehicle Brand"
                        name="vehicleBrand"
                        value={formik.values.vehicleBrand} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.vehicleBrand as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder="Vehicle Plate Number"
                        name="vehiclePlate"
                        value={formik.values.vehiclePlate} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.vehiclePlate as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>  
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="number" 
                        placeholder="Vehicle Capacity"
                        name="vehicleCapacity"
                        value={formik.values.vehicleCapacity} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.vehicleCapacity as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="number" 
                        placeholder="End Class Chair Count"
                        name="endClassChairCount"
                        value={formik.values.endClassChairCount} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.endClassChairCount as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>  
    </Form>
  )
}

export default BookForm
