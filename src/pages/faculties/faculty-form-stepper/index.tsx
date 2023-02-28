import { useFormik } from "formik";
import { useParams } from "react-router-dom";
import FormWizard from "../../../components/form-wizard";
import { PaneHeadProps } from "../../../components/form-wizard/pane-head";
import FacultyForm from "./faculty-form";
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
    minCountToSubject: null,
    maxStudCountInGroup: null,
}

const SPECS_INITIAL_STATE = {
    specs: [{
        nameAr: "",
        nameEn: "",
        descriptionAr: "",
        descriptionEn: "",
    }]
}

const FacultyFormPage = () => {

    // const facultyId = useParams().id;

    const facultyFormik = useFormik({
        initialValues: FACULTY_INITIAL_STATE,
        onSubmit: () => {}
    })

    const specsFormik = useFormik({
        initialValues: SPECS_INITIAL_STATE,
        onSubmit: () => {}
    })
    
    
    return (
        <FormWizard headers={formWizardHeaders}>
            <FacultyForm formik={facultyFormik}/>
            <SpecsForm formik={specsFormik} />
            <div>Form 3</div>
        </FormWizard>
    )
}

export default FacultyFormPage
