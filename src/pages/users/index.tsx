import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import PopUp from "../../components/popup";
import Table from "../../components/table"
import { ACTION_TYPES, PAGINATION_INFO, USERS_TYPES } from "../../constants";
import { useDelete, usePost, usePut } from "../../hooks";
import { useScreenLoader } from "../../hooks/useScreenLoader";
import { get } from "../../http";
import { addUserValidation } from "../../schema/user";
import { NewUser } from "../../types/users";
import { capitalize, getAxiosError } from "../../util";
import UserForm from "./user-form";

const USERS_INITIAL_STATE = {
  data: {
      users: [],
      paginationInfo: PAGINATION_INFO
  }
}

const INITIAL_VALUES: NewUser = {
  roleId: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: "",
  type: USERS_TYPES.employee
}

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [action, setAction] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toggleScreenLoader } = useScreenLoader();

  const { data, isLoading, isFetching, refetch } = useQuery(
                                            ['/User/GetAllUsers', page, pageSize], 
                                            () => get(`/User/GetAllUsers?page=${page}&pageSize=${pageSize}`),
                                            {
                                              // @ts-ignore
                                              initialData: USERS_INITIAL_STATE,
                                              keepPreviousData: true,
                                            });

  const { data: User, 
            isLoading: loadingUser, 
            isFetching: fetchingUser,
            refetch: refetchUser,
            } = useQuery(
                            ['/User/GetUser', userId], 
                            () => get(`/User/GetUser/${userId}`),
                            {
                                // @ts-ignore
                                enabled: false,   
                        onSuccess: data => formik.setValues({
                          roleId: data.data.roleId ,
                          firstName: data.data.firstName ,
                          lastName: data.data.lastName ,
                          email: data.data.email ,
                          phoneNumber: data.data.phoneNumber ,
                          type: data.data.type 
                  })              
            });

  useEffect(() => {
    if(userId && action === ACTION_TYPES.update) {
      refetchUser();
    }
    () => setUserId(null);
  },[userId])

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
        Header: 'Role',
        accessor: 'roleId',
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

  const formik = useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleUserAction(),
      validationSchema: addUserValidation
  })

  const reset = () => {
    setAction(null), formik.resetForm(), setUserId(null)
  }
  

  const { mutateAsync , 
    isLoading: postLoading, 
    isError, error } = action === ACTION_TYPES.add ? usePost('/User/PostUser', 
                                {
                                  roleId: formik.values.roleId ,
                                  firstName: formik.values.firstName ,
                                  lastName: formik.values.lastName ,
                                  email: formik.values.email ,
                                  phoneNumber: formik.values.phoneNumber ,
                                  type: formik.values.type 
                                }) :
                                                action === ACTION_TYPES.update ? 
                                                usePut('/User/PutUser', 
                                {
                                  id: userId,
                                  roleId: formik.values.roleId ,
                                  firstName: formik.values.firstName ,
                                  lastName: formik.values.lastName ,
                                  email: formik.values.email ,
                                  phoneNumber: formik.values.phoneNumber ,
                                  type: formik.values.type 
                                }) : useDelete('/User',userId as string);
  
    const handleUserAction = async () => {

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
        toast.success(`${capitalize(action as string)} User Done Successfully`)
        reset();
      } catch(error) {
        toast.error(getAxiosError(error))
      }
      toggleScreenLoader();
    }
  }

  return  <>
          <Table  columns={columns} 
                  data={users} 
                  isBulk={true}
                  hasSort={true}
                  loading={isLoading || isFetching} 
                  pageNumber={page}
                  pageSize={pageSize}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  pagination={data?.data.paginationInfo}
                  fetchData={refetch} 
                  renderTableOptions={() => {
                    return  <>
                                <button 	className="btn btn-falcon-success btn-sm" 
                          type="button" 
                          onClick={() => setAction(ACTION_TYPES.add)}>        
                                    <span className="fas fa-plus"></span>
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
                                                    setUserId(roleId);
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                    setAction(ACTION_TYPES.delete);
                                                    setUserId(roleId);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </>
                    }}/>

            <PopUp  title={`${action && capitalize(action as string)} User`}
								show={action !== null}
								onHide={() => { reset() } }
								confirmText={`${action} User`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleUserAction}
								actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <UserForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This User</>
                        }
                </PopUp>
              </>
}

export default UsersPage
