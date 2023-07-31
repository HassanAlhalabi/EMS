import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { addStudentSuggestedSubjectValidation } from "../../../schema/suggested-subjects";
import { NewSubjectSuggestion, SuggestedSubject } from "../../../types/suggested-subjects";
import { capitalize } from "../../../util";
import SubjectSuggestionForm from "./subject-suggestion-form";
import { useGetTableData } from '../../../hooks/useGetTableData';
import { ActionItem, useActions } from '../../../hooks/useActions';
import { Action } from '../../../types';

const INITIAL_VALUES: NewSubjectSuggestion = {
  subjectIds: [],
  isSeniorStudent: false
}

const AdminSuggestedSubjectsPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [bulkData, setBulkData] = useState<SuggestedSubject[]>([]);
  const [studentSuggestedSubjectId, setStudentSuggestedSubjectId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const { setAction } = useActions();

  const formik = useFormik<NewSubjectSuggestion>({
    initialValues: INITIAL_VALUES,
    onSubmit: () => handleStudentSuggestedSubjectAction(),
    validationSchema: addStudentSuggestedSubjectValidation
})

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useGetTableData<{studentSuggestedSubjects: SuggestedSubject[] }>('/StudentSuggestedSubject/GetAllStudentSuggestedSubjectsForAdmin', page, pageSize, searchKey)

  const columns = useMemo(
		() => [
      {
        Header: 'Student Suggested Subjects',
        accessor: 'subjectName',
      },
      {
        Header: 'Count',
        accessor: 'studentCount'
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

  const handleSuccess = async (message: string) => {
    toast.success(message)
    reset();
    await refetch();
  }

  const actionsMap = {
    [ACTION_TYPES.add]: {
      type: currentAction,
      path: '/StudentSuggestedSubject',
      payload: formik.values,
      onSuccess: () => handleSuccess('Subject Suggestion Added Successfully')
    },
    [ACTION_TYPES.bulkUpdate]: {
      type:  ACTION_TYPES.bulkUpdate,
      path: '/StudentSuggestedSubject/AcceptStudentSuggestedSubject',
      payload: {specialtySubjectIds: bulkData.map(subject => subject.specialtySubjectId)},
      onSuccess: () => handleSuccess('Subjects Were Accepted Successfully')
    },
    [ACTION_TYPES.delete]: {
      type: currentAction,
      path: `/StudentSuggestedSubject`,
      payload: studentSuggestedSubjectId,
      onSuccess: () => handleSuccess('Subject Suggestion Deleted Successfully')
    }
  }

  const handleStudentSuggestedSubjectAction = () => {
    if(formik.isValid && currentAction) {
    setAction(actionsMap[currentAction] as ActionItem)
  }}

  const reset = () => {
    setCurrentAction(null); formik.resetForm(); setStudentSuggestedSubjectId(null);
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
              getBulkData={data => setBulkData(data)}
              renderTableOptions={() => {
                                    return  <button 	className="btn btn-falcon-success btn-sm" 
                                              type="button" 
                                              onClick={() => setCurrentAction(ACTION_TYPES.add as Action)}>   
                                                <span className="me-1">Add</span>     
                                                <span className="fas fa-plus"></span>
                                            </button>
                                           
                                    }} 
              renderBulkOptions={data => <button 	className="btn btn-falcon-success btn-sm" 
                                            type="button" 
                                            onClick={() => setAction(actionsMap[ACTION_TYPES.bulkUpdate] as ActionItem)}>   
                                              <span className="me-1">Accept</span>     
                                              <span className="fas fa-check"></span>
                                              {/* <span className="ms-2 me-2">|</span>
                                              <span className="me-1">Update</span>
                                              <span className="fas fa-edit"></span> */}
                                          </button>}
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
                            {/* <button className="btn btn-falcon-danger btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setCurrentAction(ACTION_TYPES.delete as string);
                                            setStudentSuggestedSubjectId(studentSuggestedSubject.specialtySubjectId);
                                    }}>        
                                <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                            </button> */}
                        {/* <SwitchInput 
                              checked={studentSuggestedSubject.isActive} 
                              value={studentSuggestedSubject.id} 
                              onChange={handleToggleStudentSuggestedSubject} /> */}
                          </div>
              }}/>

              <PopUp  
                title={`${currentAction && capitalize(currentAction)} Student Suggested Subjects`}
                show={currentAction === ACTION_TYPES.add}
                onHide={() => { reset() } }
                confirmText={`${currentAction} Student Suggested Subject`}
                confirmButtonVariant={
                  currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                handleConfirm={handleStudentSuggestedSubjectAction}
                confirmButtonIsDisabled={currentAction !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <SubjectSuggestionForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Subject</>
                        }
                </PopUp>
              </>
}

export default AdminSuggestedSubjectsPage
