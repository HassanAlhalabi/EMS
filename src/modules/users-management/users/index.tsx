import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import SwitchInput from "../../../components/switch-input/index.";
import Table from "../../../components/table"
import { ACTION_TYPES, WORK_DAYS_NAMES } from "../../../constants";
import { addUserValidation } from "./schema";
import { NewUser, User } from "./types";
import { capitalize } from "../../../util";
import UserForm from "./user-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useActions } from "../../../hooks/useActions";
import { Action, PaginationInfo } from "../../../types";
import { useGetDataById } from "../../../hooks/useGetDataById";
import Button from '../../../components/button';

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
      salary: '',
      workDays: []
  }
}

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [currentAction, setCurrentAction] = useState<Action | null>(null)
  const [userId, setUserId] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: () => handleUserAction(),
    validationSchema: addUserValidation
  });
  const { setAction } = useActions()

  const { data, status, isLoading, isFetching, refetch } = useGetTableData<{users: User[]}>('/User/GetAllUsers', page, pageSize, searchKey)
    
  const {refetch: refetchUser} = useGetDataById<User>('/User/GetUser', userId, {
          onRefetch: data => {
            data && 
            formik.setValues({
            ...formik.values,
            ...data.data,
            roleId: data.data.role.id,
            contract: data.data.contract ? {
              ...data.data.contract,
              endAt: (data.data.contract.endAt as string).split('T')[0],
              startAt: (data.data.contract.startAt as string).split('T')[0],
              workDays: data.data.contract.workDays.map(workDay => ({
                label: WORK_DAYS_NAMES[workDay - 1],
                value: workDay
              }))
            } : null
          })
        }
     });

  const handleSuccess = async (message: string) => {
    toast.success(message)
    await reset();
  }

  const actionsMap = {
    [ACTION_TYPES.add]: {
      type: currentAction,
      path: '/User/PostUser',
      payload: {
                ...formik.values,
                roleId:formik.values.type === 'Student' ? null : formik.values.roleId,
                contract:formik.values.type === 'Student' ? null : formik.values.contract 
              },
      onSuccess: () => handleSuccess('User Added Successfully')
    },
    [ACTION_TYPES.update]: {
      type:  currentAction,
      path: '/User/PutUser',
      payload: {
                  id: userId,
                ...formik.values,
                roleId:formik.values.type === 'Student' ? null : formik.values.roleId,
                contract:formik.values.type === 'Student' ? null :
                  {
                    ...formik.values.contract,
                    workDays: formik.values.contract?.workDays?.map(workDay => workDay.value)
                  }
                },
      onSuccess: () => handleSuccess('User Updated Successfully')
    },
    [ACTION_TYPES.delete]: {
      type: currentAction,
      path: `/User`,
      payload: userId,
      onSuccess: () => handleSuccess('User Deleted Successfully')
    },
    [ ACTION_TYPES.toggle]: {
      type: currentAction,
      path: `/User/ToggleActivation/${userId}`,
      onSuccess: () => handleSuccess('User Toggled Successfully')
    } 
  }

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

  const reset = async () => {
    setCurrentAction(null); 
    formik.resetForm();
    setUserId(null);
    refetchUser();
    await refetch();
  }

  const handleUserAction = () => {
    if(formik.isValid && currentAction) {
      setAction(actionsMap[currentAction])
  }}

  const handleToggleUser = (userId: string) => 
    setAction({
      type: ACTION_TYPES.toggle as Action,
      path: `/User/ToggleActivation/${userId}`,
      onSuccess: () => {
        toast.success(`Toggle User Done Successfully`)
        reset();
      }
    })

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
                                    return  <Button scope={'User.Insert'} 
                                                    className="btn btn-falcon-success btn-sm" 
                                                    onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>        
                                                      <span className="fas fa-plus"></span>
                                                      <span className="ms-1">New</span>
                                            </Button>

                                           
                                           
                                    }} 
              renderRowActions={(user) => {
                  return  <div className="d-flex align-items-center">
                            <Button scope={'User.Edit'} 
                                    className="btn btn-falcon-info btn-sm m-1" 
                                      onClick={() => {
                                        setUserId(user.id)
                                        setCurrentAction(ACTION_TYPES.update as Action)
                                      }}>        
                                  <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </Button>      
                            <Button scope={'User.Delete'}
                                    className="btn btn-falcon-danger btn-sm m-1"
                                      onClick={() => {
                                          setUserId(user.id);
                                          setCurrentAction(ACTION_TYPES.delete as Action);
                                      }}>        
                                  <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                            </Button>
                            <SwitchInput 
                              scope={'User.Edit'}
                              checked={user.isActive} 
                              value={user.id} 
                              onChange={() => handleToggleUser(user.id)} />
                          </div>
              }}/>

              <PopUp  
                title={`${currentAction && capitalize(currentAction)} User`}
                show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
                onHide={() => { reset() } }
                confirmText={`${currentAction} User`}
                confirmButtonVariant={
                  currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                confirmButtonIsDisabled={currentAction !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
                handleConfirm={handleUserAction}
                actionLoading={false}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <UserForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This User</>
                        }
                </PopUp>
              </>
}

export default UsersPage
