import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

import PopUp from "../../../../../components/popup";
import { ACTION_TYPES } from "../../../../../constants";
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

const INITIAL_VALUES = {
    note: '',
    ticketTypeId: '',
    attachments: []
}

const TicketsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(4);
    const [searchKey, setSearchKey] = useState('');
    const [ticketId ,setTicketId] = useState<null | string>(null);
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const { setAction } = useActions();
    const t = useTranslate();

    const formik = useFormik<NewTicket>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTicketAction(),
		validationSchema: ticketsValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData<{tickets: Ticket[], paginationInfo: PaginationInfo}>('/Ticket/GetAllTickets', page, pageSize, searchKey)
            
    const columns = useMemo(
        () => [
            {
                Header: t('task_serial_number'),
                accessor: 'serial',
            },
            {
                Header: t('task_note'),
                accessor: 'note',
            },
            {
                Header: t('created_by'),
                accessor: 'createdByFullName',
            },
            {
                Header: t('task_type'),
                accessor: 'ticketTypeTitle',
            },
            {
                Header: t('status'),
                accessor: 'ticketStatus',
            },
            {
                Header: t('options'),
                accessor: 'options',
            }
        ],
        []
    )

    const tickets = useMemo(
        () => (data?.data.tickets) ? data.data.tickets.map(ticket => 
                                        ({...ticket, ticketStatus: t(ticket.ticketStatus as TranslateKey)})) : [],
        [data, isFetching, isLoading, page]
    );

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
                            tickets.map(ticket => <TicketCard   key={ticket.ticketId} 
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
                            tickets.map(ticket => <TicketCard   key={ticket.ticketId} 
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
                    <Kanban.Column header={'Pending'}>
                        {
                            tickets.map(ticket => <TicketCard   key={ticket.ticketId} 
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
                    <Kanban.Column header={'Completed'}>
                        {
                            tickets.map(ticket => <TicketCard   key={ticket.ticketId} 
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
