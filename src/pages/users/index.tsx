import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../components/popup";
import SwitchInput from "../../components/switch-input/index.";
import Table from "../../components/table"
import { ACTION_TYPES } from "../../constants";
import { addUserValidation } from "../../schema/user";
import { NewUser, User } from "../../types/users";
import { capitalize } from "../../util";
import UserForm from "./user-form";
import PermissionsGate from "../../components/permissions-gate";
import { useGetTableData } from "../../hooks/useGetTableData";
import { useActions } from "../../hooks/useActions";
import { Action } from "../../types";
import { useGetDataById } from "../../hooks/useGetDataById";

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
  const [currentAction, setCurrentAction] = useState<Action | null>(null)
  const [userId, setUserId] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: () => handleUserAction(),
    validationSchema: addUserValidation
  });
  const { setAction } = useActions()

    const { data, 
            status,
            isLoading, 
            isFetching, 
            refetch } = useGetTableData('/User/GetAllUsers', page, pageSize, searchKey)
    
    useGetDataById<User>('/User/GetUser', userId, {
      onSuccess: data => formik.setValues({
        ...formik.values,
        ...data.data,
        roleId: data.data.role.id,
        contract: data.data.contract ? {
          ...data.data.contract,
          endAt: (data.data.contract.endAt as string).split('T')[0],
          startAt: (data.data.contract.startAt as string).split('T')[0]
        } : null
      }) 
    });

    const actionsMap = {
      [ACTION_TYPES.add]: {
        type: currentAction,
        path: '/User/PostUser',
        payload: {
                  ...formik.values,
                  roleId:formik.values.type === 'Student' ? null : formik.values.roleId,
                  contract:formik.values.type === 'Student' ? null : formik.values.contract 
                },
        onSuccess: () => {
          toast.success(`User Added Successfully`)
          reset();
        }
      },
      [ACTION_TYPES.update]: {
        type:  currentAction,
        path: '/User/PutUser',
        payload: {
                    id: userId,
                  ...formik.values
                  },
        onSuccess: () => {
          toast.success(`User Updated Successfully`)
          reset();
        },
      },
      [ACTION_TYPES.delete]: {
        type: currentAction,
        path: `/User`,
        payload: userId,
        onSuccess: () => {
          toast.success(`User Deleted Successfully`)
          reset();
        }
      },
      [ ACTION_TYPES.toggle]: {
        type: currentAction,
        path: `/User/ToggleActivation/${userId}`,
        onSuccess: () => {
          toast.success(`Toggle User Done Successfully`)
          reset();
        }
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

  const reset = () => {
    setCurrentAction(null); 
    formik.resetForm();
    setUserId(null);
    refetch();
  }

  const handleUserAction = () => {
      // Not Valid ... Do Nothing
    if(!formik.isValid && currentAction !== ACTION_TYPES.delete) {
        formik.validateForm();
        return;
    };
    // If All Is Ok ... Do It
    if(formik.isValid && currentAction) {
      setAction(actionsMap[currentAction])
    }
  }

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
                                    return  <PermissionsGate scope={'User.Insert'}>
                                              <button className="btn btn-falcon-success btn-sm" 
                                                type="button" 
                                                onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>        
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
                                        setUserId(user.id)
                                        setCurrentAction(ACTION_TYPES.update as Action)
                                      }}>        
                                  <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                              </button>
                            </PermissionsGate>
                            <PermissionsGate scope={'User.Delete'}>
                              <button className="btn btn-falcon-danger btn-sm m-1" 
                                      type="button" 
                                      onClick={() => {
                                          setUserId(user.id);
                                          setCurrentAction(ACTION_TYPES.delete as Action);
                                      }}>        
                                  <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                              </button>
                            </PermissionsGate>
                            <PermissionsGate scope={'User.Edit'}>
                              <SwitchInput 
                                checked={user.isActive} 
                                value={user.id} 
                                onChange={() => handleToggleUser(user.id)}/>
                              </PermissionsGate>
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
