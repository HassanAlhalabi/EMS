import { useEffect, useMemo, useState, ChangeEvent } from 'react';

import { useFormik } from "formik";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import PopUp from "../../components/popup";
import Table from "../../components/table"
import { ACTION_TYPES } from "../../constants";
import { useBulkDelete, useGet, usePost, usePut } from "../../hooks";
import { useScreenLoader } from "../../hooks/useScreenLoader";
import { addStudentSuggestedSubjectValidation } from "../../schema/suggested-subjects";
import { NewSubjectSuggestion, SuggestedSubject } from "../../types/suggested-subjects";
import { capitalize, getAxiosError } from "../../util";
import SubjectSuggestionForm from "./subject-suggestion-form";
import { useGetTableData } from '../../hooks/useGetTableData';

const INITIAL_VALUES: NewSubjectSuggestion = {
  subjectIds: [],
  isSeniorStudent: false
}

const StudentSuggestedSubjectsPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const [studentSuggestedSubjectId, setStudentSuggestedSubjectId] = useState<string | null>(null);
  const { toggleScreenLoader } = useScreenLoader();
  const get = useGet();

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useGetTableData('/StudentSuggestedSubject/GetAllStudentSuggestedSubjects', page, pageSize, searchKey)

  const { refetch: refetchStudentSuggestedSubject,
        } = useQuery(
                    ['/StudentSuggestedSubject/GetStudentSuggestedSubject', studentSuggestedSubjectId], 
                    () => get(`/StudentSuggestedSubject/GetStudentSuggestedSubject/${studentSuggestedSubjectId}`),
                    {
                        enabled: false,   
                        onSuccess: data => formik.setValues(data.data)              
        });

  useEffect(() => {
    if(studentSuggestedSubjectId && action === ACTION_TYPES.update) {
      refetchStudentSuggestedSubject();
    }
    if(studentSuggestedSubjectId && action === ACTION_TYPES.toggle) {
      handleStudentSuggestedSubjectAction();
    }
  },[studentSuggestedSubjectId]);

  const columns = useMemo(
		() => [
      {
        Header: 'Student Suggested Subjects',
        accessor: 'subjectName',
      },
      {
        Header: 'Options',
        accessor: 'options',
      }
    ],
    []
	)

  const studentSuggestedSubjects = useMemo(
    () => (isLoading || status === 'idle') ? [] : (data?.data.studentSuggestedSubjects),
    [data, isFetching, isLoading]
  );

  const formik = useFormik<NewSubjectSuggestion>({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleStudentSuggestedSubjectAction(),
      validationSchema: addStudentSuggestedSubjectValidation
  })

  const reset = () => {
    setAction(null); 
    formik.resetForm();
    setStudentSuggestedSubjectId(null)
  }

  const { mutateAsync , 
          isLoading: postLoading
        } = action === ACTION_TYPES.add ? usePost('/StudentSuggestedSubject', 
              formik.values) :
              action === ACTION_TYPES.update ? 
              usePut('/StudentSuggestedSubject', 
{
        id: studentSuggestedSubjectId,
       ...formik.values
      }) : action === ACTION_TYPES.delete ? 
                useBulkDelete('/StudentSuggestedSubject',[studentSuggestedSubjectId] as string[])
             :  usePut(`/StudentSuggestedSubject/ToggleActivation/${studentSuggestedSubjectId}`);

  const handleStudentSuggestedSubjectAction = async () => {

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
        toast.success(`${capitalize(action as string)} Student Suggested Subjects Done Successfully`)
        reset();
      } catch(error) {
        toast.error(getAxiosError(error))
      }
      toggleScreenLoader();
    }
  }

  const handleToggleStudentSuggestedSubject = async (e: ChangeEvent<HTMLInputElement>) => {
    setAction(ACTION_TYPES.toggle);
    setStudentSuggestedSubjectId(e.target.value);
  }

  return  <>
            <Table<SuggestedSubject>  
              columns={columns} 
              data={studentSuggestedSubjects} 
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
                                                <span className="me-1">Add</span>     
                                                <span className="fas fa-plus"></span>
                                                {/* <span className="ms-2 me-2">|</span>
                                                <span className="me-1">Update</span>
                                                <span className="fas fa-edit"></span> */}
                                            </button>
                                           
                                    }} 
              renderRowActions={(studentSuggestedSubject) => {
                  return  <div className="d-flex align-items-center">
                            {/* <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.update)
                                            setStudentSuggestedSubjectId(studentSuggestedSubject.specialtySubjectId);
                                    }}>        
                                <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </button> */}
                            <button className="btn btn-falcon-danger btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.delete);
                                            setStudentSuggestedSubjectId(studentSuggestedSubject.specialtySubjectId);
                                    }}>        
                                <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            {/* <SwitchInput 
                              checked={studentSuggestedSubject.isActive} 
                              value={studentSuggestedSubject.id} 
                              onChange={handleToggleStudentSuggestedSubject} /> */}
                          </div>
              }}/>

              <PopUp  
                title={`${action && capitalize(action)} Student Suggested Subjects`}
                show={action !== null && action !== ACTION_TYPES.toggle}
                onHide={() => { reset() } }
                confirmText={`${action} Student Suggested Subject`}
                confirmButtonVariant={
                  action === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                handleConfirm={handleStudentSuggestedSubjectAction}
                actionLoading={postLoading}
                confirmButtonIsDisabled={action !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <SubjectSuggestionForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Subject</>
                        }
                </PopUp>
              </>
}

export default StudentSuggestedSubjectsPage
