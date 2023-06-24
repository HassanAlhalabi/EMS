import { Link, useParams } from "react-router-dom";
import { useGetDataById } from "../../../../../hooks/useGetDataById";
import { FullTicket, Ticket } from "../../types";
import Table from "../../../../../components/table";
import { useMemo } from "react";
import { Stack } from "react-bootstrap";


const TicketDetils = () => {

    const { ticketId } = useParams();

    const { progressLoading: loadingTicket, data} = useGetDataById<FullTicket>( '/Ticket/GetTicket', ticketId);

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

    const tickets = useMemo(
        () => (data?.data) ? [data.data] : [],
        [loadingTicket]
    );

    

    return  <>  
                 <Stack direction="horizontal" gap={3} className="mb-3">
                    <Link to={`/tickets`} className="btn btn-falcon-info btn-sm m-1"> 
                        <span className="fas fa-arrow-left" data-fa-transform="shrink-3 down-2"></span>
                    </Link>
                 </Stack>
                <Table<Ticket>  
                    columns={columns} 
                    data={tickets} 
                    loading={loadingTicket}
                    isBulk={false}
                    hasSort={false}
                />
            </>
}
 
export default TicketDetils;