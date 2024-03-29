import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, usePost, usePut } from "../../../hooks";
import { subjectTypeValidation } from "../subjects/schema";
import { capitalize, getAxiosError } from "../../../util";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import {  FullSubjectType, NewSubjectType, Subject, SubjectType } from "../subjects/types";
import SubjectTypeForm from "./subject-type-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import useTranslate, { TranslateKey } from '../../../hooks/useTranslate';

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
    const t = useTranslate();

    const formik = useFormik<NewSubjectType>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleSubjectAction(),
		validationSchema: subjectTypeValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData<{subjectTypes: SubjectType[]}>('/SubjectType/GetAllSubjectTypes', page, pageSize, searchKey);

    useGetDataById<FullSubjectType>('/SubjectType/GetFullSubjectType',subjectId, {
        onRefetch: data => {
            data && formik.setValues(data.data)
        } 
    })        
    
    const columns = useMemo(
        () => [
            {
                Header: t('name'),
                accessor: 'name',
            },
            {
                Header: t('max_hours'),
                accessor: 'maxHours',
            },
            {
                Header: t('options'),
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
                                    <span className="ms-1">{t('new')}</span>
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

                <PopUp  title={`${t(action as TranslateKey)} ${t('subject_type')}`}
								show={action !== null}
								onHide={() => { setAction(null), formik.resetForm(), setSubjectId(null) } }
								confirmText={`${t(action as TranslateKey)} ${t('subject_type')}`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleSubjectAction}
                                confirmButtonIsDisabled={!formik.isValid || !formik.dirty}
								actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <SubjectTypeForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>{t('delete_confirmation')}</>
                        }
                </PopUp>

            </>

}

export default SubjectsPage
