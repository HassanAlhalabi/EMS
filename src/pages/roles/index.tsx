import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import RSTable from "../../components/rstable";
import Table from "../../components/table"
import { useGet } from "../../hooks";
import { get } from "../../http";

const USERS_INITIAL_STATE = {
  users: []
}

const RolesPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // const { data, isLoading, isFetching } = useGet('/User/GetAllUsers', page, pageSize);
  const { data, isLoading, isFetching } = useQuery(
                                            ['/Role/GetAllRoles', page, pageSize], 
                                            () => get(`/User/GetAllRoles?page=${page}&pageSize=${pageSize}`),
                                            {
                                              initialData: USERS_INITIAL_STATE,
                                              keepPreviousData: true,
                                            });

    const columns = useMemo(
        () => [
            {
                Header: 'Role Name',
                accessor: 'roleName',
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

export default RolesPage
