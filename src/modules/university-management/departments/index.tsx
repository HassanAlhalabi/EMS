import { useEffect, useMemo, useState, ChangeEvent } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, usePost, usePut } from "../../../hooks";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { addDepartmentValidation } from "./schema";
import { NewDepartment, Department, FullDepartment } from "./types";
import { capitalize, getAxiosError } from "../../../util";
import DepartmentForm from "./department-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import { Action } from '../../../types';
import { ActionItem, useActions } from '../../../hooks/useActions';

const INITIAL_VALUES: NewDepartment = {
  nameAr:	'',
  nameEn:	'',
  descriptionAr: '',
  descriptionEn: '',
  facultiesIds: [],
  usersIds: []
}

const DepartmentsPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const { setAction } = useActions()

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useGetTableData<{departments: Department[]}>('/Department/GetAllDepartments', page, pageSize, searchKey)

  const {refetch: refetchDepartment } = useGetDataById<FullDepartment>('/Department/GetFullDepartment', departmentId, {
        onRefetch: data => {
            data && formik.setValues({
                    ...data.data,
                    facultiesIds: data.data.faculties?.map((faculty) => ({id: faculty.id, label: faculty.name})),
                    usersIds: data.data.users ? data.data.users.map(user => user.id) : []
                  }) 
        }
      })

  const columns = useMemo(
		() => [
      {
        Header: 'Department Name',
        accessor: 'name',
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Options',
        accessor: 'options',
      }
		],
		[]
	 )

  const departments = useMemo(
    () => (isLoading || status === 'idle') ? [] : (data?.data.departments),
    [data, isFetching, isLoading]
  );

  const formik = useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleDepartmentAction(),
      validationSchema: addDepartmentValidation
  })

  const handleSuccess = (message: string) => {
    toast.success(message)
    reset();
    refetch();
}

console.log(formik.values.usersIds)

const actionsMap: Record<string, ActionItem> = {
    [ACTION_TYPES.add]: {
      type: currentAction,
      path: '/Department',
      payload: {...formik.values,
                facultiesIds: formik.values.facultiesIds?.map(faculty => faculty.id)},
      onSuccess: () => handleSuccess('Department Added Successfully'),
      onError: () => setCurrentAction(null)
    },
    [ACTION_TYPES.update]: {
      type:  currentAction,
      path: '/Department',
      payload: {...formik.values,
                facultiesIds: formik.values.facultiesIds?.map(faculty => faculty.id)},
      onSuccess: () => handleSuccess('Department Updated Successfully'),
      onError: () => setCurrentAction(null)
    },
    [ACTION_TYPES.delete]: {
      type: currentAction,
      path: `/Department`,
      payload: departmentId,
      onSuccess: () => handleSuccess('Department Deleted Successfully'),
      onError: () => setCurrentAction(null)
    }
  }

  const handleDepartmentAction = () => {
      if(formik.isValid && currentAction) {
      setAction(actionsMap[currentAction])
  }}

  const reset = () => {
      setCurrentAction(null); 
      formik.resetForm(); 
      setDepartmentId(null);
      refetchDepartment()
  }

  return  <>
            <Table<Department>  
              columns={columns} 
              data={departments} 
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
                                              onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>        
                                                <span className="fas fa-plus"></span>
                                                <span className="ms-1">New</span>
                                            </button>
                                           
                                    }} 
              renderRowActions={(department) => {
                  return  <div className="d-flex align-items-center">
                            <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setCurrentAction(ACTION_TYPES.update as Action)
                                            setDepartmentId(department.id);
                                    }}>        
                                <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            <button className="btn btn-falcon-danger btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setCurrentAction(ACTION_TYPES.delete as Action)
                                            setDepartmentId(department.id);
                                    }}>        
                                <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            {/* <SwitchInput 
                              checked={department.isActive} 
                              value={department.id} 
                              onChange={handleToggleDepartment} /> */}
                          </div>
              }}/>

              <PopUp  
                title={`${currentAction && capitalize(currentAction as string)} Department`}
                show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
                onHide={() => { reset() } }
                confirmText={`${currentAction} Department`}
                confirmButtonVariant={
                  currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                handleConfirm={handleDepartmentAction}
                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && !(currentAction === ACTION_TYPES.delete)}
                  >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <DepartmentForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Department</>
                        }
                </PopUp>
              </>
}

export default DepartmentsPage
