import { useEffect, useMemo, useState, ChangeEvent } from 'react';

import { useFormik } from "formik";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, usePost, usePut } from "../../../hooks";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { addStudyPlanValidation } from "./schema";
import { FullStudyPlan, NewStudyPlan, StudyPlan } from "./types";
import { capitalize, getAxiosError } from "../../../util";
import StudyPlanForm from "./study-plan-form";
import { useGetTableData } from "../../../hooks/useGetTableData";
import { useGetDataById } from '../../../hooks/useGetDataById';

const INITIAL_VALUES: NewStudyPlan = {
  nameAr:	'',
  nameEn:	'',
  specialtyId: '',
  studyPlanSubjects: []
}

const StudyPlansPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [action, setAction] = useState<string | null>(null);
  const [studyPlanId, setStudyPlanId] = useState<string | null>(null);
  const { toggleScreenLoader } = useScreenLoader();

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useGetTableData('/StudyPlan/GetAllStudyPlans', page, pageSize, searchKey)

  useGetDataById<FullStudyPlan>('/StudyPlan/GetFullStudyPlan',studyPlanId,{
    onRefetch: data => {
      data &&
      formik.setValues(data.data)
    }
  })

  useEffect(() => {
    if(studyPlanId && action === ACTION_TYPES.toggle) {
      handleStudyPlanAction();
    }
    () => setStudyPlanId(null);
  },[studyPlanId]);

  const columns = useMemo(
		() => [
      {
        Header: 'StudyPlan Name',
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

  const studyPlans = useMemo(
    () => (isLoading || status === 'idle') ? [] : (data?.data.studyPlans),
    [data, isFetching, isLoading]
  );

  const formik = useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleStudyPlanAction(),
      validationSchema: addStudyPlanValidation
  })

  const reset = () => {
    setAction(null); 
    formik.resetForm();
    setStudyPlanId(null)
  }

  const { mutateAsync , 
          isLoading: postLoading
        } = action === ACTION_TYPES.add ? usePost('/StudyPlan', 
              formik.values) :
              action === ACTION_TYPES.update ? 
              usePut('/StudyPlan', 
{
        id: studyPlanId,
       ...formik.values
      }) : action === ACTION_TYPES.delete ? 
                useDelete('/StudyPlan',studyPlanId as string)
             :  usePut(`/StudyPlan/ToggleActivation/${studyPlanId}`);

  const handleStudyPlanAction = async () => {

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
        toast.success(`${capitalize(action as string)} StudyPlan Done Successfully`)
        reset();
      } catch(error) {
        toast.error(getAxiosError(error))
      }
      toggleScreenLoader();
    }
  }

  const handleToggleStudyPlan = async (e: ChangeEvent<HTMLInputElement>) => {
    setAction(ACTION_TYPES.toggle);
    setStudyPlanId(e.target.value);
  }

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
                                              onClick={() => setAction(ACTION_TYPES.add)}>        
                                                <span className="fas fa-plus"></span>
                                                <span className="ms-1">New</span>
                                            </button>
                                           
                                    }} 
              renderRowActions={(studyPlan) => {
                  return  <div className="d-flex align-items-center">
                            <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {
                                            setAction(ACTION_TYPES.update)
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
                title={`${action && capitalize(action as string)} Study Plan`}
                show={action !== null && action !== ACTION_TYPES.toggle}
                onHide={() => { reset() } }
                confirmText={`${action} Study Plan`}
                confirmButtonVariant={
                  action === ACTION_TYPES.delete ? 'danger' : "primary"
                }
                handleConfirm={handleStudyPlanAction}
                actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <StudyPlanForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This StudyPlan</>
                        }
                </PopUp>
              </>
}

export default StudyPlansPage
