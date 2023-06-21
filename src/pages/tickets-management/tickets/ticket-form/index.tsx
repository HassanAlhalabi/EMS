import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewTicket } from "../types";
import useGetTickets from "../../../../hooks/useGetTickets";
import { TicketType } from "../../tickets-types/types";

const BusStopForm = ({formik}:{formik: FormikProps<NewTicket>}) => {

    const ticktTypes = useGetTickets();

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col sm="12">
                    <Form.Group className="mb-3">
                        <Form.Select
                            size="lg"
                            required
                            placeholder="Ticket Type"
                            name="ticketTypeId"
                            value={formik.values.ticketTypeId} 
                            onChange={formik.handleChange}>
                                <option disabled value=''>Choose Ticket Type</option>
                                {
                                    ticktTypes.ticketTypes.map((ticketType: TicketType) => {
                                        return <option value={ticketType.ticketTypeId}>Ticket Type: {ticketType.name}</option>
                                    } )
                                }
                        </Form.Select>
                        <Feedback type="invalid">
                            {formik.errors.ticketTypeId as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col sm="12">
                    <Form.Group className="mb-3">
                        <Form.Control
                            as="textarea"
                            size="lg"
                            required
                            type="text" 
                            placeholder="Ticket Note"
                            name="note"
                            value={formik.values.note} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.note as string}
                        </Feedback>
                    </Form.Group>
                </Col>
            </Row> 
        </Form>
    )
}

export default BusStopForm
