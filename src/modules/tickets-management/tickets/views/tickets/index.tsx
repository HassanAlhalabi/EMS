import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

import PopUp from "../../../../../components/popup";
import { ACTION_TYPES, TASK_STATUS } from "../../../../../constants";
import { Ticket, NewTicket, TicketResult } from "../../types";
import { ticketsValidation } from "../../schema";
import TicketForm from "../../ticket-form";
import { useGetTableData } from "../../../../../hooks/useGetTableData";
import { Action, PaginationInfo } from '../../../../../types';
import { ActionItem, useActions } from '../../../../../hooks/useActions';
import useTranslate, { TranslateKey } from '../../../../../hooks/useTranslate';
import Kanban from '../../../../../components/kanban';
import TicketsTopBar from './components/tickets-top-bar';
import TicketCard from './components/ticket';
import { Button } from 'react-bootstrap';
import useGetData from '../../../../../hooks/useGetData';

const INITIAL_VALUES = {
    note: '',
    ticketTypeId: '',
    attachments: []
}

const TicketsPage = () => {

    const [ticketId ,setTicketId] = useState<null | string>(null);
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const { setAction } = useActions();
    const t = useTranslate();

    const [openTickets, setOpenTickets] = useState<Ticket[]>([]);
    const [inProgressTickets, setInProgressTickets] = useState<Ticket[]>([]);
    const [completedTickets, setCompletedTickets] = useState<Ticket[]>([]);
    const [closedTickets, setClosedTickets] = useState<Ticket[]>([]);

    const formik = useFormik<NewTicket>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTicketAction(),
		validationSchema: ticketsValidation
	})

    const { refetch } = useGetData<{tickets: Ticket[], paginationInfo: PaginationInfo}>(`/Ticket/GetAllTickets?page=1&pageSize=1000`,{
                onSuccess: data => {
                    setOpenTickets(data.data.tickets.filter(ticket => ticket.ticketStatus === TASK_STATUS.open));
                    setInProgressTickets(data.data.tickets.filter(ticket => ticket.ticketStatus === TASK_STATUS.inProgress));
                    setCompletedTickets(data.data.tickets.filter(ticket => ticket.ticketStatus === TASK_STATUS.completed));
                    setClosedTickets(data.data.tickets.filter(ticket => ticket.ticketStatus === TASK_STATUS.closed));
                }
            });

    const handleSuccess = async (message: string) => {
        toast.success(message)
        reset();
        await refetch();
    }

    const actionsMap = {
        [ACTION_TYPES.formDataAdd]: {
          type: currentAction,
          path: '/Ticket',
          payload: formik.values,
          onSuccess: () => handleSuccess(t('add_success'))
        },
        ['CLOSE_TICKET']: {
            type: ACTION_TYPES.update,
            path: '/Ticket/CloseTickets',
            payload: {
                ticketIds: [ticketId]
            },
            onSuccess: () => handleSuccess(t('update_success'))
          }
      }

    const handleTicketAction = () => {
        if(formik.isValid && currentAction) {
        setAction(actionsMap[currentAction] as ActionItem)
    }}

    const reset = () => {
        setCurrentAction(null); formik.resetForm();
    }

    return  <>

    <button onClick={() => setCurrentAction(ACTION_TYPES.formDataAdd as Action)}>Create Ticket</button>

                <TicketsTopBar />

                <Kanban>
                    <Kanban.Column header={'Open'}>
                        {
                            openTickets.map(ticket => <TicketCard   key={ticket.ticketId} 
                                                                id={ticket.ticketId} 
                                                                ticket={ticket}
                                                                renderTicketOptions={() => {
                                                                    return  <Button className='btn-falcon-danger btn-sm kanban-item-dropdown-btn hover-actions'
                                                                                    onMouseDown={() => {
                                                                                        setCurrentAction('CLOSE_TICKET' as Action)
                                                                                        setTicketId(ticket.ticketId)
                                                                                    }}>
                                                                                <span className="fas fa-sm fa-trash"></span>
                                                                            </Button>   
                                                                }}/>)
                        }
                    </Kanban.Column>
                    <Kanban.Column header={'In Progress'}>
                        {
                            inProgressTickets.map(ticket => <TicketCard   key={ticket.ticketId} 
                                                                id={ticket.ticketId} 
                                                                ticket={ticket}
                                                                renderTicketOptions={() => {
                                                                    return  <Button className='btn-falcon-danger btn-sm kanban-item-dropdown-btn hover-actions'
                                                                                    onClick={() => {
                                                                                        setCurrentAction('CLOSE_TICKET' as Action)
                                                                                        setTicketId(ticket.ticketId)
                                                                                    }}>
                                                                                <span className="fas fa-sm fa-trash"></span>
                                                                            </Button>   
                                                                }}/>)
                        }
                    </Kanban.Column>
                    <Kanban.Column header={'Completed'}>
                        {
                            completedTickets.map(ticket => <TicketCard   key={ticket.ticketId} 
                                                                id={ticket.ticketId} 
                                                                ticket={ticket}
                                                                renderTicketOptions={() => {
                                                                    return  <Button className='btn-falcon-danger btn-sm kanban-item-dropdown-btn hover-actions'
                                                                                    onClick={() => {
                                                                                        setCurrentAction('CLOSE_TICKET' as Action)
                                                                                        setTicketId(ticket.ticketId)
                                                                                    }}>
                                                                                <span className="fas fa-sm fa-trash"></span>
                                                                            </Button>   
                                                                }} />)
                        }
                    </Kanban.Column>
                    <Kanban.Column header={'Closed'}>
                        {
                            closedTickets.map(ticket => <TicketCard   
                                                            key={ticket.ticketId} 
                                                            id={ticket.ticketId} 
                                                            ticket={ticket}
                                                            renderTicketOptions={() => {
                                                                return  <Button className='btn-falcon-danger btn-sm kanban-item-dropdown-btn hover-actions'
                                                                                onClick={() => {
                                                                                    setCurrentAction('CLOSE_TICKET' as Action)
                                                                                    setTicketId(ticket.ticketId)
                                                                                }}>
                                                                            <span className="fas fa-sm fa-trash"></span>
                                                                        </Button>   
                                                        }}/>)
                        }
                    </Kanban.Column>
                </Kanban>

                <PopUp  title={`${t(currentAction as TranslateKey)} ${t('task')}`}
                        show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
                        onHide={() => reset()}
                        confirmText={`${t('create')} ${t('task')}`}
                        confirmButtonVariant={
                            currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                        }
                        handleConfirm={handleTicketAction}
                        confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && (
                            currentAction !== ACTION_TYPES.delete
                            && currentAction !== 'CLOSE_TICKET' as Action
                        )}
                    >
                        {(  currentAction === ACTION_TYPES.formDataAdd || 
                            currentAction === ACTION_TYPES.formDataUpdate)
                                && <TicketForm formik={formik} />}
                        {(currentAction === ACTION_TYPES.delete || currentAction === 'CLOSE_TICKET' as Action) && 
                                    <>{t('delete_confirmation')}</>
                        }
                </PopUp>

            </>

}

export default TicketsPage
