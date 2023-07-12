import { useMemo } from "react";

import { Link, useParams } from "react-router-dom";
import {Stack} from "react-bootstrap";

import { useGetDataById } from "../../../../../hooks/useGetDataById";
import { FullTicket, NewTicketResult, Ticket } from "../../types";
import Table from "../../../../../components/table";
import CommnetForm from "./components/comment-form";
import CommentList from "./components/comments-list";
import { useFormik } from "formik";
import { ActionItem, useActions } from "../../../../../hooks/useActions";
import { toast } from "react-toastify";
import { ACTION_TYPES } from "../../../../../constants";
import { ticketResultValidation } from "../../schema";

const INITIAL_VALUES = {
    attachments: [],
    description: '',
}

const TicketDetils = () => {

    const { ticketId } = useParams();

    const { data, refetch } = useGetDataById<FullTicket>( '/Ticket/GetTicket', ticketId);

    const { setAction } = useActions()

    const formik = useFormik<NewTicketResult>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleTicketResultAction(),
		validationSchema: ticketResultValidation
	})

    const columns = useMemo(
        () => [
            {
                Header: 'Ticket Serial Number',
                accessor: 'serial',
            },
            {
                Header: 'Created By',
                accessor: 'createdByFullName',
            },
            {
                Header: 'Ticket Type',
                accessor: 'ticketTypeTitle',
            },
            {
                Header: 'Status',
                accessor: 'ticketStatus',
            },
            {
                Header: 'Attachements',
                accessor: 'attachments',
            }
        ],
        []
    )

    const ticket = useMemo(
        () => (data?.data) ? [data.data] : [],
        [data]
    );

    const handleSuccess = async (message: string) => {
        toast.success(message)
        reset();
        await refetch();
    }

    const actionsMap = {
        [ACTION_TYPES.formDataAdd]: {
          type: ACTION_TYPES.formDataAdd,
          path: '/TicketResult',
          payload: {...formik.values, taskId: ticketId},
          onSuccess: () => handleSuccess('Comment Added Successfully')
        }
      }

    const handleTicketResultAction = () => {
        if(formik.isValid) {
        setAction(actionsMap[ACTION_TYPES.formDataAdd] as ActionItem)
    }}

    const reset = () => {
        formik.resetForm();
    }

    return  <>  
                 <Stack direction="horizontal" gap={3} className="mb-3">
                    <Link to={`/tickets`} className="btn btn-falcon-info btn-sm m-1"> 
                        <span className="fas fa-arrow-left" data-fa-transform="shrink-3 down-2"></span>
                    </Link>
                 </Stack>
                <Table<Ticket>  
                    columns={columns} 
                    data={ticket} 
                    isBulk={false}
                    hasSort={false}
                />
                <h3 className="h5 my-4">Comments</h3>
                <CommentList ticketResults={data?.data.ticketResults} />
                <hr className="border" />
                <CommnetForm formik={formik} />
            </>
}
 
export default TicketDetils;