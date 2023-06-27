import { useMemo, useState } from 'react';

// import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';

import { SemesterSubject } from "./types";
// import { semesterSubjectsValidation } from "./schema";
// import SemesterSubjectForm from "../../semesterSubject-form";
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';
import { useGetTableData } from '../../../hooks/useGetTableData';
import { ACTION_TYPES } from '../../../constants';
import Table from '../../../components/table';
import PopUp from '../../../components/popup';

const INITIAL_VALUES = {

}

const SemesterSubjectPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [currentAction, setCurrentAction] = useState<Action | null>(null);
    const [semesterSubjectId, setSemesterSubjectId] = useState<string | null>(null);
    const { setAction } = useActions()

    // const formik = useFormik<NewSemesterSubject>({
	// 	initialValues: INITIAL_VALUES,
	// 	onSubmit: () => handleSemesterSubjectAction(),
	// 	validationSchema: semesterSubjectsValidation
	// })

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/StudentSemesterSubjects/GetAllSubjectsRegister', page, pageSize, searchKey)
            
    const columns = useMemo(
        () => [
            {
                Header: 'Subject Name',
                accessor: 'subjectName',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const semesterSubjects = useMemo(
        () => (data?.data.semesterSubjects) ? data.data.semesterSubjects : [],
        [data, isFetching, isLoading, page]
    );

    const handleSuccess = async (message: string) => {
        toast.success(message)
        // reset();
        await refetch();
    }

    // const actionsMap = {
    //     [ACTION_TYPES.formDataAdd]: {
    //       type: currentAction,
    //       path: '/StudentSemesterSubjects',
    //       payload: formik.values,
    //       onSuccess: () => handleSuccess('Semester Subject Added Successfully')
    //     }
    //   }

    // const handleSemesterSubjectAction = () => {
    //     if(formik.isValid && currentAction) {
    //     setAction(actionsMap[currentAction])
    // }}

    // const reset = () => {
    //     setCurrentAction(null); formik.resetForm(); setSemesterSubjectId(null);
    // }

    return  <>
                <Table<SemesterSubject>  
                    columns={columns} 
                    hasSearch
                    data={semesterSubjects} 
                    loading={isLoading || isFetching}
                    isBulk={false}
                    hasSort={false}
                    pageNumber={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    pagination={data?.data.paginationInfo}
                    renderTableOptions={() => {
                        return  <>
                                    {/* <button className="btn btn-falcon-success btn-sm" 
                                            type="button" 
                                            onClick={() => setCurrentAction(ACTION_TYPES.formDataAdd as Action)}>        
                                        <span className="fas fa-plus"></span>
                                        <span className="ms-1">New</span>
                                    </button> */}
                                </>
                    }} 
                    renderRowActions={(data) => {
                        return  <div className="d-flex justify-content-center align-items-center">
                                    <Link to={`/semesterSubjects/${data.semesterSubjectId}`} className="btn btn-falcon-info btn-sm m-1"> 
                                        <span className="fas fa-eye" data-fa-transform="shrink-3 down-2"></span>
                                    </Link>
                                </div>
                    }}
                />
{/* 
                <PopUp  title={`Add SemesterSubject`}
                        show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
                        onHide={() => reset()}
                        confirmText={`Add SemesterSubject`}
                        confirmButtonVariant={
                            currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                        }
                        handleConfirm={handleSemesterSubjectAction}
                        // loadingData={loadingSemesterSubject}
                        confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && currentAction !== ACTION_TYPES.delete}
                    >
                        {(  currentAction === ACTION_TYPES.formDataAdd || 
                            currentAction === ACTION_TYPES.formDataUpdate)
                                && <SemesterSubjectForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This SemesterSubject</>
                        }
                </PopUp> */}

            </>

}

export default SemesterSubjectPage