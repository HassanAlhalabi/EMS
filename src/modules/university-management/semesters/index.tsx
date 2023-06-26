import { useEffect, useMemo, useState, ChangeEvent } from 'react';

import { useFormik } from "formik";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, useGet, usePost, usePut } from "../../../hooks";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { addSemesterValidation } from "./schema";
import { FullSemester, NewSemester, Semester } from "./types";
import { capitalize, getAxiosError } from "../../../util";
import SemesterForm from "./semester-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';

const INITIAL_VALUES: NewSemester = {
  nameAr:	'',
  nameEn:	'',
  collectingSuggestionsStartAt: '',
  collectingSuggestionsEndAt: '',
  reviewSuggestionsStartAt: '',
  reviewSuggestionsEndAt: '',
  subjectsRegistrationStartAt: '',
  subjectsRegistrationEndAt: '',
  semesterStartAt: '',
  semesterEndAt: ''
}

const SemestersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const [semesterId, setSemesterId] = useState<string | null>(null);
  const { toggleScreenLoader } = useScreenLoader();
  const get = useGet();

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useGetTableData('/Semester/GetAllSemesters', page, pageSize, searchKey)

  useGetDataById<FullSemester>('/Semester/GetFullSemester', semesterId, {
    onRefetch: data => {
      data && formik.setValues(data.data) 
    }
  })

  useEffect(() => {
    if(semesterId && action === ACTION_TYPES.toggle) {
      handleSemesterAction();
    }
    () => setSemesterId(null);
  },[semesterId]);

  const columns = useMemo(
		() => [
      {
        Header: 'Semester Name',
        accessor: 'name',
      },
      {
        Header: 'Options',
        accessor: 'options',
      }
		],
		[]
	 )

  const semesters = useMemo(
    () => (isLoading || status === 'idle') ? [] : (data?.data.semesters),
    [data, isFetching, isLoading]
  );

  const formik = useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleSemesterAction(),
      validationSchema: addSemesterValidation
  })

  const reset = () => {
    setAction(null); 
    formik.resetForm();
    setSemesterId(null)
  }

  const { mutateAsync , 
          isLoading: postLoading
        } = action === ACTION_TYPES.add ? usePost('/Semester', 
              formik.values) :
              action === ACTION_TYPES.update ? 
              usePut('/Semester', 
{
        id: semesterId,
       ...formik.values
      }) : action === ACTION_TYPES.delete ? 
                useDelete('/Semester',semesterId as string)
             :  usePut(`/Semester/ToggleActivation/${semesterId}`);

  const handleSemesterAction = async () => {

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
        toast.success(`${capitalize(action as string)} Semester Done Successfully`)
        reset();
      } catch(error) {
        toast.error(getAxiosError(error))
      }
      toggleScreenLoader();
    }
  }

  const handleToggleSemester = async (e: ChangeEvent<HTMLInputElement>) => {
    setAction(ACTION_TYPES.toggle);
    setSemesterId(e.target.value);
  }

  return  <>
            <Table<Semester>  
              columns={columns} 
              data={semesters} 
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
              renderRowActions={(semester) => {
                  return  <div className="d-flex align-items-center">
                            <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.update)
                                            setSemesterId(semester.id);
                                    }}>        
                                <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            {/* <button className="btn btn-falcon-danger btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.delete);
                                            setSemesterId(semester.id);
                                    }}>        
                                <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                            </button> */}
                            {/* <SwitchInput 
                              checked={semester.isActive} 
                              value={semester.id} 
                              onChange={handleToggleSemester} /> */}
                          </div>
              }}/>

              <PopUp  
                title={`${action && capitalize(action as string)} Semester`}
                show={action !== null && action !== ACTION_TYPES.toggle}
                onHide={() => { reset() } }
                confirmText={`${action} Semester`}
                confirmButtonVariant={
                  action === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                handleConfirm={handleSemesterAction}
                confirmButtonIsDisabled={!formik.isValid || !formik.dirty}
                actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <SemesterForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Semester</>
                        }
                </PopUp>
              </>
}

export default SemestersPage
