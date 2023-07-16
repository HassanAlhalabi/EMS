import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { TicketResult } from "../../../../types";
import useTranslate from "../../../../../../../hooks/useTranslate";
import FileAttachmentPreview from "../../../../../../../components/file-attachement-preview";

const CommentList = ({ ticketResults }:{ticketResults: TicketResult[] | undefined}) => {

    const t = useTranslate();

    if(!ticketResults) return <></>

    return  ticketResults.length === 0 ?
                <p className="alert alert-info">{t('no_comments_yet')}</p>
            : <ListGroup className="mb-3">
                <ListGroupItem>
                    {
                        ticketResults.map(result => 
                            <Row key={result.ticketResultId}>
                                <Col md={8}>
                                    <h6>{result.createdByFullName}</h6>
                                    <p>{result.description}</p>
                                </Col>
                                <Col md={4}>
                                    <h5>{t('attachments')}</h5>
                                    {
                                        result.attachments.length === 0 ?
                                            <span className="text-muted small">{t('no_attachments')}</span>
                                        : result.attachments.map(attachment =>  
                                                                <FileAttachmentPreview key={attachment} url={attachment} />
                                                                )
                                    }
                                </Col>
                        </Row>)
                    }
                </ListGroupItem>
            </ListGroup>;
}
 
export default CommentList;