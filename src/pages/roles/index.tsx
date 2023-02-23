import { useFormik } from "formik";
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { ToastContainer } from "react-toastify";
import PopUp from "../../components/popup";
import Table from "../../components/table"
import { ACTION_TYPES, PAGINATION_INFO } from "../../constants";
import { usePost } from "../../hooks";
import { get } from "../../http";
import { roleValidation } from "../../schema/roles";
import RoleForm from "./role-form";
import { toast } from "react-toastify";
import { getAxiosError } from "../../util";

const INITIAL_VALUES: {name: string, roleClaims: string[]} = {
    name: '',
    roleClaims: []
}

// const rolesData = [
//     {
//         id: 'string',
//         name: 'string',
//     },
//     {
//         id: 'string',
//         name: 'string',
//     }
// ]

const RolesPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [action, setAction] = useState<string | null>(null);
  const [roleId, setRoleId] = useState<string | null>(null);

  
  const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleAddRole(),
		validationSchema: roleValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useQuery(
                            ['/Role/GetAllRoles', page, pageSize], 
                            () => get(`/Role/GetAllRoles?page=${page}&pageSize=${pageSize}`),
                            {
                                // @ts-ignore
                                keepPreviousData: true,
                            });

    const { data: role, 
				isLoading: loadingRole, 
				isFetching: fetchingRole,
				refetch: refetchRole,
			 } = useQuery(
                        ['/Role/GetRole', roleId], 
                        () => get(`/Role/GetRole/${roleId}`),
                        {
                            // @ts-ignore
                            enabled: false,   
									 onSuccess: data => console.log('fetched')                
				});
				
	useEffect(() => {
		console.log("Retrigger");
		console.log(role)
		if(role) {
			formik.setValues({
				name: role.data.name,
				roleClaims: role.data.roleClaims
			})
		}
	},[role, isFetching])
	
	console.log({role})
	
	// console.log(formik.values)
    
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

    const { mutateAsync , isLoading: postLoading, isError, error } = usePost('/Role', 
                                            {
                                              name: formik.values.name,
                                              roleClaims: formik.values.roleClaims
                                            });
    
      const handleAddRole = async () => {
    
        // Not Valid ... Do Nothing
        if(!formik.isValid) {
            formik.validateForm();
            return;
        };
    
        // If All Is Ok ... Do It
        if(formik.isValid) {
          try {
            await mutateAsync();
            refetch();
            toast.success('Role Added Successfully')
            setAction(null);
            formik.resetForm();
          } catch(error) {
            toast.error(getAxiosError(error))
          }
        }
    }

    return  <>
                <Table  columns={columns} 
                        data={roles} 
                        loading={isLoading || isFetching}
                        isBulk={false}
                        hasSort={false}
                        pageNumber={page}
                        pageSize={pageSize}
                        setPage={setPage}
                        setPageSize={setPageSize}
                        pagination={data?.data.paginationInfo}
                        renderTableOptions={() => {
                        return  <>
                                    <button className="btn btn-falcon-success btn-sm" type="button" onClick={() => setAction(ACTION_TYPES.add)}>        
                                        <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
                                        <span className="ms-1">New</span>
                                    </button>
                                </>
                        }} 
                        renderRowActions={(roleId: string) => {
                            return  <>
													<button className="btn btn-falcon-info btn-sm m-1" 
															type="button" 
															onClick={() => {
																	setAction(ACTION_TYPES.update)
																	setRoleId(roleId);
																	if(roleId) {
																		refetchRole();
																	}
															}}>        
														<span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
													</button>
													<button className="btn btn-falcon-danger btn-sm m-1" 
															type="button" 
															onClick={() => {
																	setAction(ACTION_TYPES.delete);
																	setRoleId(roleId);
															}}>        
														<span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
													</button>
                                    </>
                        }}
                />

                <PopUp  title={'Add Role'}
                    show={action !== null}
                    onHide={() => { setAction(null), formik.resetForm() } }
                    confirmText={`${action} Role`}
                    handleConfirm={formik.handleSubmit}
                    actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <RoleForm formik={formik} />}
                        {action === ACTION_TYPES.delete && <>Do You Wanna Delete Role</>}
                </PopUp>

                <ToastContainer />

            </>

}

export default RolesPage
