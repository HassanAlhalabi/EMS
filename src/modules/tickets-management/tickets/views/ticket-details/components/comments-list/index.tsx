import { Col, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { TicketResult } from "../../../../types";

const CommentList = ({ ticketResults }:{ticketResults: TicketResult[] | undefined}) => {

    if(!ticketResults) return <></>

    return  ticketResults.length === 0 ?
                <p className="alert alert-info">No Comments Yet</p>
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
                                    <h6>Attacmhnets</h6>
                                    {
                                        result.attachments.map(att =>  <p>{att}</p>)
                                    }
                                </Col>
                        </Row>)
                    }
                </ListGroupItem>
            </ListGroup>;
}
 
export default CommentList;