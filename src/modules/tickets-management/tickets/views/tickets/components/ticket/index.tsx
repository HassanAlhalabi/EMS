import { Button, Dropdown } from "react-bootstrap";

import { Ticket } from "../../../../types";
import av1 from '../../../../../../../assets/img/team/1-thumb.png';
import av2 from '../../../../../../../assets/img/team/2-thumb.png';
import av3 from '../../../../../../../assets/img/team/3-thumb.png';
import { ReactNode } from "react";


const TicketCard = (props: {id: string, ticket: Ticket, renderTicketOptions?: () => ReactNode}) => {
    return <div id={props.ticket.ticketId}>
                <Dropdown>
                    {props.renderTicketOptions?.()}
                </Dropdown>
                                                        
                <div className="mb-2">
                    <span className="badge py-1 me-1 mb-1 badge-soft-success">New</span>
                    <span className="badge py-1 me-1 mb-1 badge-soft-primary">Goal</span>
                </div>
                
                <p className="mb-0 fw-medium font-sans-serif stretched-link" data-bs-toggle="modal" data-bs-target="#kanban-modal-1">
                    {props.ticket.note}
                </p>
                
                <div className="kanban-item-footer cursor-default">
                    <div className="text-500 z-index-2">
                        <span className="me-2" data-bs-toggle="tooltip" title="" data-bs-original-title="Attachments">
                            <span className="fas fa-paperclip me-1"></span>
                            <span>1</span>
                        </span>
                        <span className="me-2" data-bs-toggle="tooltip" title="" data-bs-original-title="Checklist"> 
                            <span className="fas fa-user me-1"></span>
                            <span>2/10</span>
                        </span>
                    </div>
                    <div className="z-index-2">
                        <div className="avatar avatar-l align-top ms-n2" data-bs-toggle="tooltip" title="" data-bs-original-title="Sophie">
                            <img className="rounded-circle" src={av1} alt="" />
                        </div>
                        <div className="avatar avatar-l align-top ms-n2" data-bs-toggle="tooltip" title="" data-bs-original-title="Antony">
                            <img className="rounded-circle" src={av2} alt="" />
                        </div>
                        <div className="avatar avatar-l align-top ms-n2" data-bs-toggle="tooltip" title="" data-bs-original-title="Emma">
                            <img className="rounded-circle" src={av3} alt="" />
                        </div>
                    </div>
                </div>

            </div>
}
 
export default TicketCard;