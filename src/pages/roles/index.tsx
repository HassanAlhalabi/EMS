import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { usePagination, useRowSelect, useSortBy } from "react-table";
import Table from "../../components/table"
import { get } from "../../http";

const ROLES_INITIAL_STATE = {
    data: {
        roles: []
    }
}

const RolesPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const { data, isLoading, isFetching } = useQuery(
                                            ['/Role/GetAllRoles', page, pageSize], 
                                            () => get(`/Role/GetAllRoles?page=${page}&pageSize=${pageSize}`),
                                            {
                                                // @ts-ignore
                                                initialData: ROLES_INITIAL_STATE,
                                                keepPreviousData: true,
                                            });

    const columns = useMemo(
        () => [
            {
                Header: 'Role Name',
                accessor: 'name',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

  const roles = useMemo(
    () => {
        if(data && data.data.roles) {
            return  data.data.roles
        }
        return [];
    },
    [data, isFetching, isLoading, page]
  );

  return  <Table  columns={columns} 
                  data={roles} 
                  loading={isLoading || isFetching}
                  pageNumber={page}
                  pageSize={pageSize}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  pagination={data?.data.paginationInfo} />

}

export default RolesPage
