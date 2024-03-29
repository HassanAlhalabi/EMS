import { useEffect, useMemo, useState } from "react";

import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import FormWizard from "../../../../components/form-wizard";
import { PaneHeadProps } from "../../../../components/form-wizard/pane-head";
import SwitchInput from "../../../../components/switch-input/index.";
import Table from "../../../../components/table";
import { useGet, usePost, usePut } from "../../../../hooks";
import { useScreenLoader } from "../../../../hooks/useScreenLoader";
import { facultyValidation, hallValidation, specValidation, dayValidation } from "../schema";
import { Faculty, FullFaculty, NewDay, NewFaculty, NewHall, NewSpec, WorkDay } from "../types";
import { getAxiosError } from "../../../../util";
import FacultyForm from "./faculty-form";
import HallsForm from "./halls-form";
import SpecsForm from "./specs-form";
import WorkDaysForm from "./work-days-form";
import { WORK_DAYS, WORK_DAYS_NAMES } from "../../../../constants";
import { useGetDataById } from "../../../../hooks/useGetDataById";
import useTranslate from "../../../../hooks/useTranslate";

const FACULTY_INITIAL_STATE = {
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    studingYearsCount: 4,
    isManySpecialty: false,
    specialtyYearNum: 2,
    minCountToSubject: 1,
    maxStudCountInGroup: 1,
    semesterRegistrationRequirement: {
        maxHours: 24,
        minHours: 1,
        minGradePointAverage: 1,
        // maxCount: 1
    }
}

const DAY_INITIAL_STATE = {
    name: '',
    dayNumber: 0,
    workStartAt: '09:00',
    workEndAt: '17:00'
}

const SPEC_INITIAL_STATE = {
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    isDefault: false
}

const HALL_INITIAL_STATE = {
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    maxCount: "",
    isLabratory: false
}

const FacultyFormPage = () => {

    const facultyId = useParams().id;
    const [currentTab, setCurrentTab] = useState(0);
    const handleChangeToNextTab = () => setCurrentTab(prev => prev + 1);
    const handleChangeToPrevTab = () => setCurrentTab(prev => prev - 1);
    const {toggleScreenLoader} = useScreenLoader();
    const t = useTranslate();


    const formWizardHeaders: PaneHeadProps[] = [
        {   
            title: t('faculty'),
            icon: 'fa-university',
            status: 'active'
        },
        {   
            title: t('working_days'),
            icon: 'fa-calendar',
            status: 'unactive'
        },
        {   
            title: t('specializations'),
            icon: 'fa-toolbox',
            status: 'unactive'
        },
        {   
            title: t('halls'),
            icon: 'fa-chalkboard',
            status: 'unactive'
        }
    ]

    useGetDataById<FullFaculty>('/Faculty/GetFullFaculty/',facultyId, {
        onRefetch: data => {
                    if(!data) return;
                    facultyDetailsFormik.setValues({
                        nameAr: data.data.nameAr,
                        nameEn: data.data.nameEn,
                        descriptionAr: data.data.descriptionAr,
                        descriptionEn: data.data.descriptionEn,
                        studingYearsCount: data.data.studingYearsCount,
                        isManySpecialty: data.data.isManySpecialty,
                        specialtyYearNum: data.data.specialtyYearNum,
                        minCountToSubject: data.data.minCountToSubject,
                        maxStudCountInGroup: data.data.maxStudCountInGroup,
                        semesterRegistrationRequirement: data.data.semesterRegistrationRequirement
                    })
                    setWorkDays(data.data.workDay.map((day)=> ({
                        ...day,
                        name: WORK_DAYS_NAMES[day.dayNumber]
                    })))
                    setSpecs(data.data.specialties);
                    setHalls(data.data.halls)
        }
    })                           

    const [workDays, setWorkDays] = useState<NewDay[]>([]);
    const [specs, setSpecs] = useState<NewSpec[]>([]);
    const [halls, setHalls] = useState<NewHall[]>([]);

    const facultyDetailsFormik = useFormik<NewFaculty>({
        initialValues: FACULTY_INITIAL_STATE,
        onSubmit: () => setCurrentTab(1),
        validationSchema: facultyValidation
    })

    const daysFormik = useFormik<NewDay>({
        initialValues: DAY_INITIAL_STATE,
        onSubmit: () => handleAddWorkDay(),
        validationSchema: dayValidation
    })

    const handleAddWorkDay = () => {
        console.log('Here')
        if(daysFormik.isValid) {
            console.log('Here')
            if(workDays.find(day => day.name === daysFormik.values.name)) {
                return;
            }
            setWorkDays(prev => [...prev, {...daysFormik.values, dayNumber: WORK_DAYS[daysFormik.values.name]}].sortByProp('dayNumber'));
            daysFormik.resetForm();
        }
    }

    const handleDeleteWorkDay = (id: number) => {   
        const newDays = workDays.filter(day => day.dayNumber !== id);
        setWorkDays(newDays);
    }

    const specsFormik = useFormik<NewSpec>({
        initialValues: SPEC_INITIAL_STATE,
        onSubmit: () => handleAddSpec(),
        validationSchema: specValidation
    })

    const handleAddSpec = () => {
        if(specsFormik.dirty && specsFormik.isValid) {
            if(specs.find(spec => spec.nameEn === specsFormik.values.nameEn)
                || specs.find(spec => spec.nameAr === specsFormik.values.nameAr)) {
                    return;
            }
            setSpecs(prev => [
                ...prev, 
                {
                    ...specsFormik.values,
                    isDefault: specs.length === 0 ? true : false
                }
            ]);
            specsFormik.resetForm();
        }
    }

    const handleToggleDefaultSpec = (nameEn: string) => {
        setSpecs(prev => {
            return prev.map(spec => {
                return spec.nameEn === nameEn ? {
                    ...spec,
                    isDefault: true
                } : {
                    ...spec,
                    isDefault: false
                }
            })
        })
    }

    const handleDeleteSpec = (title: string, isDefault: boolean) => {
        const newSpecs = specs.filter(spec => spec.nameEn !== title);
        if(isDefault && newSpecs.length > 0) {
            return setSpecs(      
                newSpecs.map((spec, index) => {
                    return index === 0 ? {
                        ...spec,
                        isDefault: true
                    } : {
                        ...spec,
                        isDefault: false
                    }
            }))
        } 
        setSpecs(newSpecs);
    }

    const hallsFormik = useFormik<NewHall>({
        initialValues: HALL_INITIAL_STATE,
        onSubmit: () => handleAddHall(),
        validationSchema: hallValidation
    })

    const handleAddHall = () => {
        if(hallsFormik.dirty && hallsFormik.isValid) {
            if(halls.find(hall => hall.nameEn === hallsFormik.values.nameEn)
                || halls.find(hall => hall.nameAr === hallsFormik.values.nameAr)) {
                    return;
                }
            setHalls(prev => [...prev, hallsFormik.values]);
            hallsFormik.resetForm();
        }
    }

    const handleDeleteHall = (title: string) => {   
        const newHalls = halls.filter(hall => hall.nameEn !== title);
        setHalls(newHalls);
    }

    const daysColumn = useMemo(() => [
        {
            Header: t('day'),
            accessor: 'name',
        },
        {
            Header: t('start_time'),
            accessor: 'workStartAt',
        },
        {
            Header: t('end_time'),
            accessor: 'workEndAt',
        },
        {
            Header: t('options'),
            accessor: 'options',
        },
    ],[]);

    const specsColumn = useMemo(() => [
        {
            Header: t('english_name'),
            accessor: 'nameEn',
        },
        {
            Header: t('arabic_name'),
            accessor: 'nameAr',
        },
        {
            Header: t('options'),
            accessor: 'options',
        },
    ],[])

    const hallsColumn = useMemo(() => [
        {
            id: 'nameEn',
            Header: t('english_name'),
            accessor: 'nameEn',
        },
        {
            id: 'nameAr',
            Header: t('arabic_name'),
            accessor: 'nameAr',
        },
        {
            id: 'isLabratory',
            Header: t('is_labratory'),
            accessor: ((data: NewHall) => data.isLabratory ? '✔' : '') as unknown as string,
        },
        {
            id: 'options',
            Header: t('options'),
            accessor: 'options',
        },
    ],[]);


    console.log(halls)

    const { mutateAsync , 
        isLoading: postLoading
      } = facultyId ? usePut('/Faculty ', 
      {
        id: facultyId,
        ...facultyDetailsFormik.values,
        specialties: [...specs],
        halls: [...halls],
        workDay: [...workDays],
      }) : usePost('/Faculty ', 
      {
        ...facultyDetailsFormik.values,
        specialties: [...specs],
        halls: [...halls],
        workDay: [...workDays],
      })

    const handleFacultyAction = async () => {

        const isValid = facultyDetailsFormik.isValid &&
                        specs.length > 0 &&
                        halls.length > 0;
                        
        // Not Valid ... Do Nothing
        if(!isValid) {
            return;
        };

        // If All Is Ok ... Do It
        try {
            toggleScreenLoader();
            await mutateAsync();
            if(!facultyId) {
                reset();
            }
            toast.success(`Faculty ${facultyId ? 'Updated' : 'Added'} Successfully`)
        } catch(error) {
            toast.error(getAxiosError(error))
        }
        toggleScreenLoader();
    }

    const reset = () => {
        setCurrentTab(0);
        facultyDetailsFormik.resetForm();
        specsFormik.resetForm();
        hallsFormik.resetForm();
        setSpecs([]);
        setHalls([]);
    }
    
    return (
        <FormWizard headers={formWizardHeaders} currentTab={currentTab}>

            {/* General Details About Faculty */}
            <div>
                <Row className="mt-3 mb-5">
                    <Col className="d-flex justify-content-end">
                        <button
                            disabled={!facultyDetailsFormik.isValid || !facultyDetailsFormik.dirty}
                            onClick={(e) => { e.preventDefault(); facultyDetailsFormik.handleSubmit()} } 
                            className={`btn btn-primary px-5 px-sm-6`} 
                            type="submit">
                            {t('next')} <span className="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span>
                        </button>
                    </Col>
                </Row>
                <FacultyForm formik={facultyDetailsFormik}/>
            </div>

            {/* Working Days And Time of The Faculty */}
            <div>
                <Row className="mt-3 mb-5">
                    <Col>
                        <button onClick={handleChangeToPrevTab} 
                                className={`btn btn-fal con-link ps-0 `} type="button"> 
                            <span className="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span>  {t('prev')}
                        </button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button
                            disabled={workDays.length <= 0}
                            onClick={handleChangeToNextTab} 
                            className={`btn btn-falcon-primary px-4 px-sm-6`} 
                            >
                             {t('next')} <span className="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span>
                        </button>
                    </Col>
                </Row>
                <WorkDaysForm formik={daysFormik} />
                <Table columns={daysColumn} data={workDays}
                    renderRowActions={(day: NewDay) => {
                        return  <div className="d-flex align-items-center">
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {handleDeleteWorkDay(day.dayNumber)}}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }} 
                />
     
            </div>

            {/* Specialization Details in the Faculty */}
            <div>
                <Row className="mt-3 mb-5">
                    <Col>
                        <button onClick={handleChangeToPrevTab} 
                                className={`btn btn-falcon-link ps-0 `} type="button"> 
                            <span className="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span>  {t('prev')}
                        </button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button
                            disabled={specs.length <= 0}
                            onClick={handleChangeToNextTab} 
                            className={`btn btn-falcon-primary px-4 px-sm-6`} 
                            >
                             {t('next')} <span className="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span>
                        </button>
                    </Col>
                </Row>
                <SpecsForm  formik={specsFormik} />
                <Table columns={specsColumn} data={specs}
                    renderRowActions={(spec: NewSpec) => {
                        return  <div className="d-flex align-items-center">
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {handleDeleteSpec(spec.nameEn, spec.isDefault)}}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <SwitchInput checked={spec.isDefault} onChange={() => handleToggleDefaultSpec(spec.nameEn)} />
                                </div>
                    }} />
            </div>

            {/* Halls Details in the faculty */}
            <div>
                <Row className="mt-3 mb-5">
                    <Col>
                        <button onClick={handleChangeToPrevTab} 
                                className={`btn btn-falcon-link ps-0 `} type="button"> 
                            <span className="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span>  {t('prev')}
                        </button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button
                            disabled={halls.length <= 0}
                            onClick={handleFacultyAction} 
                            className={`btn btn-success px-5 px-sm-6`} 
                            >
                            {facultyId ?  t('UPDATE') : t('ADD')}  {t('faculty')} {facultyId ? <span className="fas fa-pen ms-2" data-fa-transform="shrink-3"> </span> : 
                                                                                <span className="fas fa-plus ms-2" data-fa-transform="shrink-3"> </span>}
                        </button>
                    </Col>
                </Row>
                <HallsForm  formik={hallsFormik} />
                <Table columns={hallsColumn} data={halls}
                    renderRowActions={(spec: NewSpec) => {
                        return  <div className="d-flex align-items-center">
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {handleDeleteHall(spec.nameEn)}}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }} />
            </div>
        </FormWizard>
    )
}

export default FacultyFormPage
