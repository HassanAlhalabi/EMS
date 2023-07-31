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
import useTranslate, { TranslateKey } from "../../../../../hooks/useTranslate";
import FileAttachmentPreview from "../../../../../components/file-attachement-preview";

const INITIAL_VALUES = {
    attachments: [],
    description: '',
}

const TicketDetils = () => {

    const { ticketId } = useParams();
    const t = useTranslate();
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
                Header: t('attachments'),
                accessor: 'attachments',
            }
        ],
        []
    )

    const ticket = useMemo(
        () => (data?.data) ? [{ ...data.data, 
                                ticketStatus: t(data.data.ticketStatus as TranslateKey),
                                attachments: data.data.attachments.map(att => <FileAttachmentPreview key={att} url={att} />)
                                 }] : [],
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
          onSuccess: () => handleSuccess(t('add_success'))
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
                <h3 className="h5 my-4">{t('comments')}</h3>
                <CommentList ticketResults={data?.data.ticketResults} />
                <hr className="border" />
                <CommnetForm formik={formik} />
            </>
}
 
export default TicketDetils;