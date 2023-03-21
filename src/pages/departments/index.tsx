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
import { addDepartmentValidation } from "../../schema/department";
import { NewDepartment, Department } from "../../types/departments";
import { Faculty } from "../../types/faculties";
import { capitalize, getAxiosError } from "../../util";
import DepartmentForm from "./department-form";

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
  const [action, setAction] = useState<string | null>(null);
  const [departmentId, setDepartmentId] = useState<string | null>(null);
  const { toggleScreenLoader } = useScreenLoader();

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useQuery(
                                            ['/Department/GetAllDepartments', page, pageSize, searchKey], 
                                            () => get(`/Department/GetAllDepartments?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                                            {
                                              keepPreviousData: true,
                                              enabled: false
                                            });

  const { data: department, 
          refetch: refetchDepartment,
        } = useQuery(
                    ['/Department/GetFullDepartment', departmentId], 
                    () => get(`/Department/GetFullDepartment/${departmentId}`),
                    {
                        enabled: false,   
                        onSuccess: data => formik.setValues({
                          ...data.data,
                          facultiesIds: data.data.faculties.map((faculty: Faculty) => faculty.id)
                        })              
        });

  useEffect(() => {
    if(departmentId && action === ACTION_TYPES.update) {
      refetchDepartment();
    }
    if(departmentId && action === ACTION_TYPES.toggle) {
      handleDepartmentAction();
    }
    () => setDepartmentId(null);
  },[departmentId]);

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

  const reset = () => {
    setAction(null); 
    formik.resetForm();
    setDepartmentId(null)
  }

  const { mutateAsync , 
          isLoading: postLoading
        } = action === ACTION_TYPES.add ? usePost('/Department', 
              formik.values) :
              action === ACTION_TYPES.update ? 
              usePut('/Department', 
{
        id: departmentId,
       ...formik.values
      }) : action === ACTION_TYPES.delete ? 
                useDelete('/Department',departmentId as string)
             :  usePut(`/Department/ToggleActivation/${departmentId}`);

  const handleDepartmentAction = async () => {

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
        toast.success(`${capitalize(action as string)} Department Done Successfully`)
        reset();
      } catch(error) {
        toast.error(getAxiosError(error))
      }
      toggleScreenLoader();
    }
  }

  const handleToggleDepartment = async (e: ChangeEvent<HTMLInputElement>) => {
    setAction(ACTION_TYPES.toggle);
    setDepartmentId(e.target.value);
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
                                              onClick={() => setAction(ACTION_TYPES.add)}>        
                                                <span className="fas fa-plus"></span>
                                                <span className="ms-1">New</span>
                                            </button>
                                           
                                    }} 
              renderRowActions={(department) => {
                  return  <div className="d-flex align-items-center">
                            <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.update)
                                            setDepartmentId(department.id);
                                    }}>        
                                <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            <button className="btn btn-falcon-danger btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.delete);
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
                title={`${action && capitalize(action as string)} Department`}
                show={action !== null && action !== ACTION_TYPES.toggle}
                onHide={() => { reset() } }
                confirmText={`${action} Department`}
                confirmButtonVariant={
                  action === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                handleConfirm={handleDepartmentAction}
                confirmButtonIsDisabled={!formik.isValid || !formik.dirty}
                actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <DepartmentForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Department</>
                        }
                </PopUp>
              </>
}

export default DepartmentsPage
