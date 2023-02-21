import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import RSTable from "../../components/rstable";
import Table from "../../components/table"
import { useGet } from "../../hooks";
import { get } from "../../http";

const USERS_INITIAL_STATE = {
  users: []
}

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const { data, isLoading, isFetching } = useQuery(
                                            ['/User/GetAllUsers', page, pageSize], 
                                            () => get(`/User/GetAllUsers?page=${page}&pageSize=${pageSize}`),
                                            {
                                              initialData: USERS_INITIAL_STATE,
                                              keepPreviousData: true,
                                            });

  const columns = useMemo(
		() => [
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Options',
        accessor: 'options',
      }
		],
		[]
	 )

  const users = useMemo(
    () => data.users,
    [data, isFetching, isLoading]
  );

  return  <Table  columns={columns} 
                  data={users} 
                  loading={isLoading || isFetching} 
                  setPage={setPage}
                  setPageSize={setPageSize}
                  pageSize={pageSize}
                  pagination={data?.paginationInfo} />
  // return <RSTable />

}

export default UsersPage
