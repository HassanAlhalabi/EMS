import { useMemo } from "react";



const useGetTicketTypesTableColumns = () => {  
    const columns = useMemo(
        () => [
            {
                Header: 'Ticket Type Name',
                accessor: 'title',
            },
            {
                Header: 'Department',
                accessor: 'assignToDepartment.name',
            },
            {
                Header: 'Description',
                accessor: 'description',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )
    return columns
}
 
export default useGetTicketTypesTableColumns;