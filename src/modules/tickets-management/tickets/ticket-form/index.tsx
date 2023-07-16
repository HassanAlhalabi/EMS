import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewTicket } from "../types";
import useGetTickets from "../../../../hooks/useGetTickets";
import { TicketType } from "../../tickets-types/types";
import useFilesUpload from "../../../../hooks/useFilesUpload";
import useTranslate from "../../../../hooks/useTranslate";

const TicketForm = ({formik}:{formik: FormikProps<NewTicket>}) => {

    const t = useTranslate();
    const ticktTypes = useGetTickets();
    const { renderPreview } = useFilesUpload({
        onUpload: (files) => formik.setFieldValue('attachments', files)
    });

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col sm="12">
                    <Form.Group className="mb-3">
                        <Form.Select
                            size="lg"
                            required
                            name="ticketTypeId"
                            value={formik.values.ticketTypeId} 
                            onChange={formik.handleChange}>
                                <option disabled value=''>{t('choos_task_type')}</option>
                                {
                                    ticktTypes?.ticketTypes.map((ticketType: TicketType) => {
                                        return  <option  key={ticketType.ticketTypeId} 
                                                        value={ticketType.ticketTypeId}>    
                                                            {ticketType.title}
                                                </option>
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
                            placeholder={t('task_note')}
                            name="note"
                            value={formik.values.note} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.note as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group>
                        <Form.Label>
                            {t('attachments')}:
                        </Form.Label>
                        {renderPreview()} 
                    </Form.Group>         
                </Col>  
            </Row> 
        </Form>
    )
}

export default TicketForm
