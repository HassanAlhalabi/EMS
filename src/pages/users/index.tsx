import { useFormik } from "formik";
import { useEffect, useMemo, useState, ChangeEvent } from 'react';

import { useQuery } from "react-query";
import { toast } from "react-toastify";
import PopUp from "../../components/popup";
import SwitchInput from "../../components/switch-input/index.";

import Table from "../../components/table"
import { ACTION_TYPES } from "../../constants";
import { useDelete, usePost, usePut } from "../../hooks";
import { useScreenLoader } from "../../hooks/useScreenLoader";
import { get } from "../../http";
import { addUserValidation } from "../../schema/user";
import { NewUser, User } from "../../types/users";
import { capitalize, getAxiosError } from "../../util";
import UserForm from "./user-form";

const INITIAL_VALUES: NewUser = {
  roleId: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: "",
  type: ''
}

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toggleScreenLoader } = useScreenLoader();

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useQuery(
                                            ['/User/GetAllUsers', page, pageSize, searchKey], 
                                            () => get(`/User/GetAllUsers?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                                            {
                                              keepPreviousData: true,
                                              enabled: false
                                            });

  const { data: user, 
          refetch: refetchUser,
        } = useQuery(
                    ['/User/GetUser', userId], 
                    () => get(`/User/GetUser/${userId}`),
                    {
                        // @ts-ignore
                        enabled: false,   
                onSuccess: data => formik.setValues({
                  roleId: data.data.role.id ,
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
    if(userId && action === ACTION_TYPES.toggle) {
      handleUserAction();
    }
    () => setUserId(null);
  },[userId]);

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
        accessor: 'role',
      },
      {
        Header: 'Options',
        accessor: 'options',
      }
		],
		[]
	 )

  const users = useMemo(
    () => (isLoading || status === 'idle') ? [] : (data?.data.users),
    [data, isFetching, isLoading]
  );

  const formik = useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleUserAction(),
      validationSchema: addUserValidation
  })

  const reset = () => {
    setAction(null); 
    formik.resetForm();
    setUserId(null)
  }

  const { mutateAsync , 
          isLoading: postLoading
        } = action === ACTION_TYPES.add ? usePost('/User/PostUser', 
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
        email: formik.values.email,
        phoneNumber: formik.values.phoneNumber ,
        type: formik.values.type 
      }) : action === ACTION_TYPES.delete ? 
                useDelete('/User',userId as string)
             :  usePut(`/User/ToggleActivation/${userId}`);

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

  const handleToggleUser = async (e: ChangeEvent<HTMLInputElement>) => {
    setAction(ACTION_TYPES.toggle);
    setUserId(e.target.value);
  }

  return  <>
            <Table<User>  
              columns={columns} 
              data={users} 
              isBulk
              hasSort
              hasSearch
              loading={isLoading} 
              pageNumber={page}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
              pagination={data?.data.paginationInfo}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              fetchData={refetch} 
              renderTableOptions={() => {
                                    return  <button 	className="btn btn-falcon-success btn-sm" 
                                              type="button" 
                                              onClick={() => setAction(ACTION_TYPES.add)}>        
                                                <span className="fas fa-plus"></span>
                                                <span className="ms-1">New</span>
                                            </button>
                                           
                                    }} 
              renderRowActions={(user) => {
                  return  <div className="d-flex align-items-center">
                            <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.update)
                                            setUserId(user.id);
                                    }}>        
                                <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            <button className="btn btn-falcon-danger btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.delete);
                                            setUserId(user.id);
                                    }}>        
                                <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            <SwitchInput 
                              checked={user.isActive} 
                              value={user.id} 
                              onChange={handleToggleUser} />
                          </div>
              }}/>

              <PopUp  
                title={`${action && capitalize(action as string)} User`}
                show={action !== null && action !== ACTION_TYPES.toggle}
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
