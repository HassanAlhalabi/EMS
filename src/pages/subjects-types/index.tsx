import { useFormik } from "formik";
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from "react-query";
import PopUp from "../../components/popup";
import Table from "../../components/table"
import { ACTION_TYPES } from "../../constants";
import { useDelete, usePost, usePut } from "../../hooks";
import { get } from "../../http";
import { subjectTypeValidation } from "../../schema/subject";
import { toast } from "react-toastify";
import { capitalize, getAxiosError } from "../../util";
import { useScreenLoader } from "../../hooks/useScreenLoader";
import {  NewSubjectType, Subject } from "../../types/subjects";
import SubjectTypeForm from "./subject-type-form";

const INITIAL_VALUES = {
    nameAr: '',
    nameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    maxHours: 1
}

const SubjectsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [action, setAction] = useState<string | null>(null);
    const [subjectId, setSubjectId] = useState<string | null>(null);
    const { toggleScreenLoader } = useScreenLoader();

    const formik = useFormik<NewSubjectType>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleSubjectAction(),
		validationSchema: subjectTypeValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useQuery(
                            ['/SubjectType/GetAllSubjectTypes', page, pageSize], 
                            () => get(`/SubjectType/GetAllSubjectTypes?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                            {
                                keepPreviousData: true,
                            });

    const { data: subject, 
				isLoading: loadingSubject, 
				isFetching: fetchingSubject,
				refetch: refetchSubject,
			 } = useQuery(
                        ['/SubjectType/GetFullSubjectType', subjectId], 
                        () => get(`/SubjectType/GetFullSubjectType/${subjectId}`),
                        {
                            enabled: false,   
                            onSuccess: data => formik.setValues(data.data)            
			            });

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
				
	useEffect(() => {
		if(subjectId && action === ACTION_TYPES.update) {
			refetchSubject();
		}
		() => setSubjectId(null);
	},[subjectId])
    
    const columns = useMemo(
        () => [
            {
                Header: 'Name',
                accessor: 'name',
            },
            {
                Header: 'Max Hours',
                accessor: 'maxHours',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const subjects = useMemo(
        () => {
            if(data && data.data.subjectTypes) {
                return  data.data.subjectTypes
            }
            return [];
        },
        [data, isFetching, isLoading, page]
    );

    const { mutateAsync , 
            isLoading: postLoading, 
            isError, error } = action === ACTION_TYPES.add ? usePost('/SubjectType', formik.values) :
                                            action === ACTION_TYPES.update ? 
                                            usePut('/SubjectType',{
                                                id: subjectId,
                                                ...formik.values
                                            }) : useDelete('/SubjectType',subjectId as string);

    
      const handleSubjectAction = async () => {

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
            toast.success(`${capitalize(action as string)} Subject Type Done Successfully`)
            setAction(null);
			setSubjectId(null);
            formik.resetForm();
          } catch(error) {
            toast.error(getAxiosError(error))
          }
          toggleScreenLoader();
        }
    }

    return  <>
                <Table<Subject>  
                    columns={columns} 
                    hasSearch
                    data={subjects} 
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
                                <button 	className="btn btn-falcon-success btn-sm" 
                                                        type="button" 
                                                        onClick={() => setAction(ACTION_TYPES.add)}>        
                                    <span className="fas fa-plus"></span>
                                    <span className="ms-1">New</span>
                                </button>
                            </>
                    }} 
                    renderRowActions={(data) => {
                        return  <>
                                    <button className="btn btn-falcon-info btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                    setAction(ACTION_TYPES.update)
                                                    setSubjectId(data.id);
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                    setAction(ACTION_TYPES.delete);
                                                    setSubjectId(data.id);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </>
                    }}
                />

                <PopUp  title={`${action && capitalize(action as string)} Subject Type`}
								show={action !== null}
								onHide={() => { setAction(null), formik.resetForm(), setSubjectId(null) } }
								confirmText={`${action} Subject Type`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleSubjectAction}
								actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <SubjectTypeForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Subject</>
                        }
                </PopUp>

            </>

}

export default SubjectsPage
