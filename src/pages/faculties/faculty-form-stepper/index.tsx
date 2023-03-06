import { AxiosResponse } from "axios";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FormWizard from "../../../components/form-wizard";
import { PaneHeadProps } from "../../../components/form-wizard/pane-head";
import Table from "../../../components/table";
import { usePost, usePut } from "../../../hooks";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { get } from "../../../http";
import { facultyValidation, hallValidation, specValidation } from "../../../schema/faculty";
import { NewFaculty, NewHall, NewSpec } from "../../../types/faculties";
import { getAxiosError } from "../../../util";
import FacultyForm from "./faculty-form";
import HallsForm from "./halls-form";
import SpecsForm from "./specs-form";

const formWizardHeaders: PaneHeadProps[] = [
    {   
        title: 'Faculty',
        icon: 'fa-university',
        status: 'active'
    },
    {   
        title: 'Specializations',
        icon: 'fa-toolbox',
        status: 'unactive'
    },
    {   
        title: 'Halls',
        icon: 'fa-chalkboard',
        status: 'unactive'
    }
]

const FACULTY_INITIAL_STATE = {
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    minCountToSubject: 1,
    maxStudCountInGroup: 1,
}

const SPEC_INITIAL_STATE = {
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
}

const HALL_INITIAL_STATE = {
    nameAr: "",
    nameEn: "",
    descriptionAr: "",
    descriptionEn: "",
    maxCount: 5
}

const FacultyFormPage = () => {

    const facultyId = useParams().id;
    const [currentTab, setCurrentTab] = useState(0);
    const handleChangeToNextTab = () => setCurrentTab(prev => prev + 1);
    const handleChangeToPrevTab = () => setCurrentTab(prev => prev - 1);
    const {toggleScreenLoader} = useScreenLoader();
    const [action, setAction] = useState(null);

    const {data: facultyData, refetch: refetchFaculty } = useQuery(['faculty', facultyId], 
                                        () => get(`/Faculty/GetFullFaculty/${facultyId}`),{
                                            enabled: false,
                                            onSuccess: (data: AxiosResponse) => {
                                                facultyFormik.setValues({
                                                    nameAr: data.data.nameAr,
                                                    nameEn: data.data.nameEn,
                                                    descriptionAr: data.data.descriptionAr,
                                                    descriptionEn: data.data.descriptionEn,
                                                    minCountToSubject: data.data.minCountToSubject,
                                                    maxStudCountInGroup: data.data.maxStudCountInGroup,
                                                });
                                                setSpecs(data.data.specialties                                                    );
                                                setHalls(data.data.halls)
                                            }
                                        })

    useEffect(() => {
        refetchFaculty();
    },[facultyId])

    const [specs, setSpecs] = useState<NewSpec[]>([]);
    const [halls, setHalls] = useState<NewHall[]>([]);

    const facultyFormik = useFormik<NewFaculty>({
        initialValues: FACULTY_INITIAL_STATE,
        onSubmit: () => setCurrentTab(1),
        validationSchema: facultyValidation
    })

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
            setSpecs(prev => [...prev, specsFormik.values]);
            specsFormik.resetForm();
        }
    }

    const handleDeleteSpec = (title: string) => {
        const newSpecs = specs.filter(spec => spec.nameEn !== title);
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
                || specs.find(hall => hall.nameAr === hallsFormik.values.nameAr)) {
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

    const specsColumn = useMemo(() => [
        {
            Header: 'Speciality Name',
            accessor: 'nameEn',
        },
        {
            Header: 'Arabic Name',
            accessor: 'nameAr',
        },
        {
            Header: 'Options',
            accessor: 'options',
        },
    ],[])

    const hallsColumn = useMemo(() => [
        {
            Header: 'Hall Name',
            accessor: 'nameEn',
        },
        {
            Header: 'Arabic Name',
            accessor: 'nameAr',
        },
        {
            Header: 'Options',
            accessor: 'options',
        },
    ],[]);

    const { mutateAsync , 
        isLoading: postLoading
      } = facultyId ? usePut('/Faculty ', 
      {
        id: facultyId,
        ...facultyFormik.values,
        specialties: [...specs],
        halls: [...halls]
      }) : usePost('/Faculty ', 
      {
        ...facultyFormik.values,
        specialties: [...specs],
        halls: [...halls]
      })

    const handleFacultyAction = async () => {

        const isValid = facultyFormik.isValid &&
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
        facultyFormik.resetForm();
        specsFormik.resetForm();
        hallsFormik.resetForm();
        setSpecs([]);
        setHalls([]);
    }
    
    return (
        <FormWizard headers={formWizardHeaders} currentTab={currentTab}>
            <FacultyForm formik={facultyFormik}/>
            <div>
                <SpecsForm  formik={specsFormik} />
                            
                <Row className="mt-3">
                    <Col>
                        <button onClick={handleChangeToPrevTab} 
                                className={`btn btn-falcon-link ps-0 `} type="button"> 
                            <span className="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span> Prev
                        </button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button
                            disabled={specs.length <= 0}
                            onClick={handleChangeToNextTab} 
                            className={`btn btn-falcon-primary px-5 px-sm-6`} 
                            >
                            Next <span className="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span>
                        </button>
                    </Col>
                </Row>
                <Table columns={specsColumn} data={specs}
                    renderRowActions={(spec: NewSpec) => {
                        return  <div className="d-flex align-items-center">
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {handleDeleteSpec(spec.nameEn)}}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </div>
                    }} />
            </div>
            <div>
                <HallsForm  formik={hallsFormik} />
                            
                <Row className="mt-3">
                    <Col>
                        <button onClick={handleChangeToPrevTab} 
                                className={`btn btn-falcon-link ps-0 `} type="button"> 
                            <span className="fas fa-chevron-left me-2" data-fa-transform="shrink-3"></span> Prev
                        </button>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <button
                            disabled={halls.length <= 0}
                            onClick={handleFacultyAction} 
                            className={`btn btn-success px-5 px-sm-6`} 
                            >
                            Add Faculty <span className="fas fa-plus ms-2" data-fa-transform="shrink-3"> </span>
                        </button>
                    </Col>
                </Row>
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
