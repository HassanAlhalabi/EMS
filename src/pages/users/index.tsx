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
import { addUserValidation } from "../../schema/user";
import { NewUser, User } from "../../types/users";
import { capitalize, getAxiosError } from "../../util";
import UserForm from "./user-form";
import PermissionsGate from "../../components/permissions-gate";
import { useHTTP } from "../../hooks/useHTTP";
import { useGetTableData } from "../../hooks/useGetTableData";

const INITIAL_VALUES: NewUser = {
  roleId: '',
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: "",
  type: '',
  specialtyId: '',
  facultyId: '',
  contract: {
      startAt: '',
      endAt: '',
      salary: 0,
      workDays: []
  }
}

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { toggleScreenLoader } = useScreenLoader();
  const { get } = useHTTP();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: () => handleUserAction(),
    validationSchema: addUserValidation
  })

    const { data, 
            status,
            isLoading, 
            isFetching, 
            refetch } = useGetTableData('/User/GetAllUsers', page, pageSize, searchKey)

  const {  refetch: refetchUser,
        } = useQuery(
                    ['/User/GetUser', userId], 
                    () => get(`/User/GetUser/${userId}`),
                    {
                        enabled: false,   
                        onSuccess: data => formik.setValues({
                          ...data.data,
                          roleId: data.data.role.id,
                          contract: data.data.contract ? {
                            ...data.data.contract,
                            endAt: data.data.contract.endAt.split('T')[0],
                            startAt: data.data.contract.startAt.split('T')[0]
                          } : null
                        })                    
        });

  useEffect(() => {
    if(userId && action === ACTION_TYPES.update) {
      refetchUser();
    }
    if(userId && action === ACTION_TYPES.toggle) {
      handleUserAction();
    }
  },[userId]);


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

  const reset = () => {
    setAction(null); 
    formik.resetForm();
    setUserId(null)
  }

  const { mutateAsync , 
          isLoading: postLoading
        } = action === ACTION_TYPES.add ? usePost('/User/PostUser', 
              {
                ...formik.values,
                roleId:formik.values.type === 'Student' ? null : formik.values.roleId,
                contract:formik.values.type === 'Student' ? null : formik.values.contract 
              }) : action === ACTION_TYPES.update ? 
                     usePut('/User/PutUser', 
          {
            id: userId,
          ...formik.values
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
                                    return  <PermissionsGate scope={'User.Insert'}>
                                              <button className="btn btn-falcon-success btn-sm" 
                                                type="button" 
                                                onClick={() => setAction(ACTION_TYPES.add)}>        
                                                  <span className="fas fa-plus"></span>
                                                  <span className="ms-1">New</span>
                                              </button>
                                            </PermissionsGate>
                                           
                                           
                                    }} 
              renderRowActions={(user) => {
                  return  <div className="d-flex align-items-center">
                            <PermissionsGate scope={'User.Edit'}>
                              <button className="btn btn-falcon-info btn-sm m-1" 
                                      type="button" 
                                      onClick={() => {
                                              setAction(ACTION_TYPES.update)
                                              setUserId(user.id);
                                      }}>        
                                  <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                              </button>
                            </PermissionsGate>
                            <PermissionsGate scope={'User.Delete'}>
                              <button className="btn btn-falcon-danger btn-sm m-1" 
                                      type="button" 
                                      onClick={() => {
                                              setAction(ACTION_TYPES.delete);
                                              setUserId(user.id);
                                      }}>        
                                  <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                              </button>
                            </PermissionsGate>
                            <PermissionsGate scope={'User.Edit'}>
                              <SwitchInput 
                                checked={user.isActive} 
                                value={user.id} 
                                onChange={handleToggleUser} />
                              </PermissionsGate>
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
                confirmButtonIsDisabled={action !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
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
