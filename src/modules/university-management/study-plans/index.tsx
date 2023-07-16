import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { addStudyPlanValidation } from "./schema";
import { FullStudyPlan, NewStudyPlan, StudyPlan } from "./types";
import StudyPlanForm from "./study-plan-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';
import useTranslate, { TranslateKey } from '../../../hooks/useTranslate';
import { Action } from '../../../types';
import { useActions } from '../../../hooks/useActions';

const INITIAL_VALUES: NewStudyPlan = {
  nameAr:	'',
  nameEn:	'',
  specialtyId: '',
  studyPlanSubjects: [],
}

const StudyPlansPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [studyPlanId, setStudyPlanId] = useState<string | null>(null);
  const [currentAction, setCurrentAction] = useState<Action | null>(null);
  const { setAction } = useActions()
  const t = useTranslate();

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useGetTableData('/StudyPlan/GetAllStudyPlans', page, pageSize, searchKey)

  const { refetch: refetchPlan } = useGetDataById<FullStudyPlan>('/StudyPlan/GetFullStudyPlan',studyPlanId,{
    onRefetch: data => {
      data && formik.setValues({
        ...data.data,
        studyPlanSubjects: data.data.subjects.map(subject => subject.id),
      })
    }
  })

  const columns = useMemo(
		() => [
      {
        Header: t('studyPlan_name'),
        accessor: 'name',
      },
      {
        Header: t('description'),
        accessor: 'description',
      },
      {
        Header: t('options'),
        accessor: 'options',
      }
		],
		[]
	 )

  const studyPlans = useMemo(
    () => (isLoading || status === 'idle') ? [] : (data?.data.studyPlans),
    [data, isFetching, isLoading]
  );

  const formik = useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleStudyPlanAction(),
      validationSchema: addStudyPlanValidation
  })

  const handleSuccess = (message: string) => {
    toast.success(message);
    reset();
}

const actionsMap = {
    [ACTION_TYPES.add]: {
        type: currentAction,
        path: '/StudyPlan',
        payload: formik.values,
        onSuccess: () => handleSuccess(t('add_success'))
    },
    [ACTION_TYPES.update]: {
        type:  currentAction,
        path: '/StudyPlan',
        payload: {
          id: studyPlanId,
          ...formik.values
        },
        onSuccess: () => handleSuccess(t('update_success'))
    },
}

  const handleStudyPlanAction = async () => {
      if(formik.isValid && currentAction) {
          setAction(actionsMap[currentAction])
      }
  }

  const reset = () => {
      setCurrentAction(null);
      refetchPlan();
      setStudyPlanId(null);
      formik.resetForm();
      refetch();
  }

  // const handleToggleStudyPlan = async (e: ChangeEvent<HTMLInputElement>) => {
  //   setAction(ACTION_TYPES.toggle);
  //   setStudyPlanId(e.target.value);
  // }

  return  <>
            <Table<StudyPlan>  
              columns={columns} 
              data={studyPlans} 
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
                                                <span className="ms-1">{t('new')}</span>
                                            </button>
                                           
                                    }} 
              renderRowActions={(studyPlan) => {
                  return  <div className="d-flex align-items-center">
                            <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setCurrentAction(ACTION_TYPES.update as Action)
                                            setStudyPlanId(studyPlan.id);
                                    }}>        
                                <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            {/* <button className="btn btn-falcon-danger btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.delete);
                                            setStudyPlanId(studyPlan.id);
                                    }}>        
                                <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                            </button> */}
                            {/* <SwitchInput 
                              checked={studyPlan.isActive} 
                              value={studyPlan.id} 
                              onChange={handleToggleStudyPlan} /> */}
                          </div>
              }}/>

              <PopUp  
                title={`${t(currentAction as TranslateKey)} ${t('study_plan')}`}
                show={currentAction !== null && currentAction !== ACTION_TYPES.toggle}
                onHide={() => { reset() } }
                confirmText={`${t(currentAction as TranslateKey)} ${t('study_plan')}`}
                confirmButtonVariant={
                  currentAction === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                handleConfirm={handleStudyPlanAction}
                    >
                        {(  currentAction === ACTION_TYPES.add || 
                            currentAction === ACTION_TYPES.update)
                                && <StudyPlanForm formik={formik} />}
                        {currentAction === ACTION_TYPES.delete && 
                                    <>{t('delete_confirmation')} {t('study_plan')}</>
                        }
                </PopUp>
              </>
}

export default StudyPlansPage
