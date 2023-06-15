import { useEffect, useMemo, useState } from "react";

import { Typeahead } from "react-bootstrap-typeahead";
import { Form, Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewStudyPlan } from "../../../../types/study-plan";
import Table from "../../../../components/table";
import { mapToTyphead } from "../../../../util";
import { SelectedOption } from "../../../../types";
import { useGet } from "../../../../hooks";

const StudyPlanForm = ({formik}:{formik: FormikProps<NewStudyPlan>}) => {

    const get = useGet();

    const { data: faculties } = useQuery(
        ['/Faculty/GetDropDownFaculties'], 
        () => get(`/Faculty/GetDropDownFaculties`));

    const { data: specialities, refetch: refetchSpecialities } = useQuery(
        ['/Specialty/GetDropDownSpecialties', formik.values.facultyId], 
        () => get(`/Specialty/GetDropDownSpecialties/${formik.values.facultyId}`),
        {
            enabled: false
        });
   
    const { data: subjects } = useQuery(
        ['/Subject/GetDropDownSubjects'], 
        () => get(`/Subject/GetDropDownSubjects`));

    useEffect(() => {
        if(formik.values.facultyId) {
            refetchSpecialities();
        }
    },[formik.values.facultyId])

    const [selectedSubjects, setSelectedSubjects] = useState<Record<string, any>[]>([]);

   const handleSelectSubject = (selectedSubjects: Record<string, any>[]) => {
    
        if(selectedSubjects.length === 0) return;

        // Check If Object Already Exists
        const objectExits = selectedSubjects.find(item => item.id === selectedSubjects[0].id);

        if(objectExits) return;      

        setSelectedSubjects([
            ...selectedSubjects,
            selectedSubjects[0]
        ])
        
        formik.setValues({
            ...formik.values,
            studyPlanSubjects: [
                ...formik.values.studyPlanSubjects,
                selectedSubjects[0].id
            ]
        })
    }
    

    const handleDeleteSubject = (subjectId: string) => {
        const newSubjects = formik.values.studyPlanSubjects.filter(item => {
            return (item !== subjectId) 
        })
        const newSubjectsForTable = selectedSubjects?.filter(item => {
            return (item.id !== subjectId) 
        })
        formik.setValues({
            ...formik.values,
            studyPlanSubjects: newSubjects
        })
        setSelectedSubjects(newSubjectsForTable)
    }

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

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder="Arabic Name"
                        name="nameAr"
                        value={formik.values.nameAr} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.nameAr as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder="English Name"
                        name="nameEn"
                        value={formik.values.nameEn} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.nameEn as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row> 
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="facultyId">
                        Faculties:
                    </Form.Label>
                    <Form.Select
                        required
                        size="lg"
                        id="facultyId"
                        name="facultyId"
                        value={formik.values.facultyId} 
                        onChange={formik.handleChange}>
                            <option key="no-value" value=""></option>
                        {
                            faculties?.data.map((faculty: {id: string, name: string}) => 
                                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                            )
                        }
                    </Form.Select>   
                    <Feedback type="invalid">
                        {formik.errors.facultyId as string}
                    </Feedback>          
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="specialtyId">
                        Speciality:             
                    </Form.Label>
                    <Form.Select
                        required
                        disabled={!Boolean(formik.values.facultyId)}
                        size="lg"
                        id="specialtyId"
                        name="specialtyId"
                        value={formik.values.specialtyId} 
                        onChange={formik.handleChange}>
                            <option key="no-value" value=""></option>
                        {
                            specialities?.data.map((speciality: {id: string, name: string}) => 
                                <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                            )
                        }
                    </Form.Select>  
                    <Feedback type="invalid">
                        {formik.errors.specialtyId as string}
                    </Feedback>          
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Form.Group className="mb-3">
                <Form.Label>
                    Choose Subjects:
                </Form.Label>
                <Typeahead
                    id="studyPlanSubjects"
                    size="lg"
                    className={formik.values.studyPlanSubjects.length !== 0 && formik.dirty ? 'is-valid': 'is-invalid'}
                    placeholder='Search Subjects'
                    onChange={(options) => handleSelectSubject(options as Record<string, any>[])}
                    options={subjects ? mapToTyphead(subjects.data) : []}
                    isInvalid={formik.values.studyPlanSubjects.length === 0 && formik.dirty}
                    isValid={formik.values.studyPlanSubjects.length !== 0 && formik.dirty}
                />
                <Feedback type="invalid">
                    {formik.errors.studyPlanSubjects as string}
                </Feedback>
            </Form.Group> 
        </Row> 
        <Table<Record<string, any>>  
            columns={columns} 
            data={selectedSubjects}
            renderRowActions={data =>  <button className="btn btn-falcon-danger btn-sm m-1" 
            type="button" 
            onClick={() => handleDeleteSubject(data.id)}>        
                    <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                </button>}  />
    </Form>
  )
}

export default StudyPlanForm
