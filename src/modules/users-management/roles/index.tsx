import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import RoleForm from "./role-form";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { roleValidation } from "./schema";
import { capitalize } from "../../../util";
import { Role } from "./types";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from "../../../hooks/useGetDataById";
import { useActions } from "../../../hooks/useActions";
import { Action } from "../../../types";
import Button from '../../../components/button';

const INITIAL_VALUES: {name: string, roleClaims: string[]} = {
    name: '',
    roleClaims: []
}

const RolesPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [roleId, setRoleId] = useState<string | null>(null);
    const { setAction } = useActions()

    const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleRoleAction(),
		validationSchema: roleValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData<{roles: Role[]}>('/Role/GetAllRoles', page, pageSize, searchKey)

    const {refetch: refetchRole} = useGetDataById<Role>('/Role/GetRole', roleId,{ 
                            onRefetch: data => { 
                                data &&
                                formik.setValues({
                                name: data.data.name,
                                roleClaims: data.data.roleClaims as string[]
						    })}            
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
        [data, isFetching, isLoading, page]);

    const handleSuccess = (message: string) => {
        toast.success(message);
        reset();
    }

    const actionsMap = {
        [ACTION_TYPES.add]: {
            type: currentAction,
            path: '/Role',
            payload: {
                name: formik.values.name,
                roleClaims: formik.values.roleClaims
            },
            onSuccess: () => handleSuccess('Role Added Successfully')
        },
        [ACTION_TYPES.update]: {
            type:  currentAction,
            path: '/Role',
            payload: {
                id: roleId,
                name: formik.values.name,
                roleClaims: formik.values.roleClaims
            },
            onSuccess: () => handleSuccess('Role Updated Successfully')
        },
        [ACTION_TYPES.delete]: {
            type: currentAction,
            path: `/Role`,
            payload: roleId,
            onSuccess: () => handleSuccess('Role Deleted Successfully')
        }
    }
    
    const handleRoleAction = async () => {
        if(formik.isValid && currentAction) {
            setAction(actionsMap[currentAction])
        }
    }

    const reset = () => {
        setCurrentAction(null);
        refetchRole();
        setRoleId(null);
        formik.resetForm();
        refetch();
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
                    return  <Button scope={'Role.Insert'}
                                    className="btn-falcon-success btn-sm"
                                               onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>        
                                    <span className="fas fa-plus"></span>
                                    <span className="ms-1">New</span>
                            </Button>

                    }} 
                    renderRowActions={(data) => {
                        return  <>
                                    <Button scope={'Role.Edit'}
                                            className="btn-falcon-info btn-sm m-1"
                                                onClick={() => {
                                                    setCurrentAction(ACTION_TYPES.update as Action)
                                                    setRoleId(data.id);
                                                }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </Button>
                                    <Button scope={'Role.Delete'} 
                                            className="btn-falcon-danger btn-sm m-1" 
                                            onClick={() => {
                                                setCurrentAction(ACTION_TYPES.delete as Action);
                                                setRoleId(data.id);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </Button>
                                </>
                    }}
                />

                <PopUp  title={`${currentAction && capitalize(currentAction as string)} Role`}
                        show={currentAction !== null}
                        onHide={() => { reset() }}
                        confirmText={`${currentAction} Role`}
                        confirmButtonVariant={
                            currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                        }
                        handleConfirm={handleRoleAction}
                        confirmButtonIsDisabled={currentAction !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <RoleForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Role</>
                        }
                </PopUp>

            </>

}

export default RolesPage
