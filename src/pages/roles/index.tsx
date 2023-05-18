import { useFormik } from "formik";
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from "react-query";
import PopUp from "../../components/popup";
import Table from "../../components/table"
import { ACTION_TYPES } from "../../constants";
import { useDelete, useGet, usePost, usePut } from "../../hooks";
import { roleValidation } from "../../schema/roles";
import RoleForm from "./role-form";
import { toast } from "react-toastify";
import { capitalize, getAxiosError } from "../../util";
import { useScreenLoader } from "../../hooks/useScreenLoader";
import { Role } from "../../types/roles";
import PermissionsGate from "../../components/permissions-gate";

const INITIAL_VALUES: {name: string, roleClaims: string[]} = {
    name: '',
    roleClaims: []
}

const RolesPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [action, setAction] = useState<string | null>(null);
    const [roleId, setRoleId] = useState<string | null>(null);
    const { toggleScreenLoader } = useScreenLoader();
    const get = useGet();

    const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleRoleAction(),
		validationSchema: roleValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useQuery(
                            ['/Role/GetAllRoles', page, pageSize], 
                            () => get(`/Role/GetAllRoles?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                            {
                                // @ts-ignore
                                keepPreviousData: true,
                            });

    const { refetch: refetchRole,
			 } = useQuery(
                        ['/Role/GetRole', roleId], 
                        () => get(`/Role/GetRole/${roleId}`),
                        {
                            // @ts-ignore
                            enabled: false,   
                            onSuccess: data => formik.setValues({
                                name: data.data.name,
                                roleClaims: data.data.roleClaims
						    })              
			            });

    useEffect(() => {
        let searchTimeout: number; 
        if(searchKey) {
            searchTimeout = setTimeout(() => {
            refetch();
            },600);
            return () => clearTimeout(searchTimeout);;
        }
        refetch();
        return () => clearTimeout(searchTimeout);
        },[page,pageSize,searchKey])
				
	useEffect(() => {
		if(roleId && action === ACTION_TYPES.update) {
			refetchRole();
		}
		return () => setRoleId(null);
	},[roleId])
    
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

    const { mutateAsync , 
            isLoading: postLoading } = action === ACTION_TYPES.add ? usePost('/Role', 
                                        {
                                            name: formik.values.name,
                                            roleClaims: formik.values.roleClaims
                                        }) :
                                                        action === ACTION_TYPES.update ? 
                                                        usePut('/Role', 
                                        {
                                                            id: roleId,
                                            name: formik.values.name,
                                            roleClaims: formik.values.roleClaims
                                        }) : useDelete('/Role',roleId as string);

    
      const handleRoleAction = async () => {

        // Not Valid ... Do Nothing
        if(!formik.isValid && action !== ACTION_TYPES.delete) {
            formik.validateForm();
            return;
        };
    
        // If All Is Ok ... Do It
        if(formik.isValid) {
          try {
            toggleScreenLoader();
            await mutateAsync();
            refetch();
            toast.success(`${capitalize(action as string)} Role Done Successfully`)
            setAction(null);
			setRoleId(null);
            formik.resetForm();
          } catch(error) {
            toast.error(getAxiosError(error))
          }
          toggleScreenLoader();
        }
    }

    return  <>
                <Table<Role>  
                    columns={columns} 
                    hasSearch
                    data={roles} 
                    loading={isLoading || isFetching}
                    isBulk={false}
                    hasSort={false}
                    pageNumber={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    pagination={data?.data.paginationInfo}
                    renderTableOptions={() => {
                    return  <PermissionsGate scope={'Role.Insert'}>
                                <button 	className="btn btn-falcon-success btn-sm" 
                                                        type="button" 
                                                        onClick={() => setAction(ACTION_TYPES.add)}>        
                                    <span className="fas fa-plus"></span>
                                    <span className="ms-1">New</span>
                                </button>
                            </PermissionsGate>
                    }} 
                    renderRowActions={(data) => {
                        return  <>
                                    <PermissionsGate scope={'Role.Edit'}>
                                        <button className="btn btn-falcon-info btn-sm m-1" 
                                                type="button" 
                                                onClick={() => {
                                                        setAction(ACTION_TYPES.update)
                                                        setRoleId(data.id);
                                                }}>        
                                            <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                        </button>
                                    </PermissionsGate>
                                    <PermissionsGate scope={'Role.Delete'}>
                                        <button className="btn btn-falcon-danger btn-sm m-1" 
                                                type="button" 
                                                onClick={() => {
                                                        setAction(ACTION_TYPES.delete);
                                                        setRoleId(data.id);
                                                }}>        
                                            <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                        </button>
                                    </PermissionsGate>
                                </>
                    }}
                />

                <PopUp  title={`${action && capitalize(action as string)} Role`}
								show={action !== null}
								onHide={() => { setAction(null), formik.resetForm(), setRoleId(null) } }
								confirmText={`${action} Role`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleRoleAction}
								actionLoading={postLoading}
                                confirmButtonIsDisabled={action !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <RoleForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Role</>
                        }
                </PopUp>

            </>

}

export default RolesPage
