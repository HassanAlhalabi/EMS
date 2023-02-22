import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import Table from "../../components/table"
import { get } from "../../http";

const USERS_INITIAL_STATE = {
  data: {
      users: [],
      paginationInfo: {
    }
  }
}

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);

  const { data, isLoading, isFetching } = useQuery(
                                            ['/User/GetAllUsers', page, pageSize], 
                                            () => get(`/User/GetAllUsers?page=${page}&pageSize=${pageSize}`),
                                            {
                                              // @ts-ignore
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
    () => (data?.data.users),
    [data, isFetching, isLoading]
  );

  return  <Table  columns={columns} 
                  data={users} 
                  loading={isLoading || isFetching} 
                  pageNumber={page}
                  pageSize={pageSize}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  pagination={data?.data.paginationInfo} />
  // return <RSTable />

}

export default UsersPage
