import { useMemo, useState, useEffect } from 'react';

import { useFormik } from "formik";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, useGet, usePost, usePut } from "../../../hooks";
import { subjectValidation } from "./schema";
import { capitalize, getAxiosError } from "../../../util";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { FullSubject, NewSubject, Subject } from "./types";
import SubjectForm from "./subject-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';

const INITIAL_VALUES = {
    nameAr: '',
    nameEn: '',
    descriptionAr: "",
    descriptionEn: "",
    subjectTypeId: '',
    hasLabratory: false,
    specialtySubjects: []
}

const SubjectsPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [action, setAction] = useState<string | null>(null);
    const [subjectId, setSubjectId] = useState<string | null>(null);
    const { toggleScreenLoader } = useScreenLoader();
    const get = useGet();

    const formik = useFormik<NewSubject>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleSubjectAction(),
		validationSchema: subjectValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Subject/GetAllSubjects', page, pageSize, searchKey)

    useGetDataById<FullSubject>('/Subject/GetFullSubject', subjectId, {
        onRefetch: data => {
            data &&
            formik.setValues({
                ...data.data,
                subjectTypeId: data.data.subjectType.id,
                specialtySubjects: data.data.specialtySubjects.map((fs) => {
                    return {
                        facultyId: fs.faculty.id,
                        facultyName: fs.faculty.name,
                        specialtyId: fs.specialty.id,
                        specialtyName: fs.specialty.name,
                        superSubjectId: fs.superSubject ? fs.superSubject.id : '',
                        superSubjectName: fs.superSubject ? fs.superSubject.name : '',
                    }
                })
            })
        }
    })                      
    
    const columns = useMemo(
        () => [
            {
                Header: 'Subject Name',
                accessor: 'name',
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
            if(data && data.data.subjects) {
                return  data.data.subjects
            }
            return [];
        },
        [data, isFetching, isLoading, page]
    );

    const { mutateAsync , 
            isLoading: postLoading, 
            isError, error } = action === ACTION_TYPES.add ? 
                                            usePost('/Subject', formik.values) :
                                            action === ACTION_TYPES.update ? 
                                            usePut('/Subject', {
                                                ...formik.values
                                            }) : 
                                            useDelete('/Subject',subjectId as string);

    
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
            toast.success(`${capitalize(action as string)} Subject Done Successfully`)
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

                <PopUp  title={`${action && capitalize(action as string)} Subject`}
                        show={action !== null}
                        onHide={() => { setAction(null), formik.resetForm(), setSubjectId(null) } }
                        confirmText={`${action} Subject`}
                        confirmButtonVariant={
                            action === ACTION_TYPES.delete ? 'danger' : "primary"
                        }
                        confirmButtonIsDisabled={action !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
                        handleConfirm={handleSubjectAction}
                        actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <SubjectForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Subject</>
                        }
                </PopUp>

            </>

}

export default SubjectsPage
