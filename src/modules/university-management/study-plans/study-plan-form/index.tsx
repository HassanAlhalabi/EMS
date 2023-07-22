import { useEffect, useMemo } from "react";

import { Form, Row, Col } from "react-bootstrap";
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewStudyPlan } from "../types";
import { mapToTyphead } from "../../../../util";
import useGetDropdownFaculties from "../../../../hooks/useGetDropdownFaculties";
import useGetDropdownSpecialities from "../../../../hooks/useGetDropdownSpecialities";
import useGetDropdownSubjects from "../../../../hooks/useGetDropdownSubjects";
import useTranslate from "../../../../hooks/useTranslate";
import useTableSelect from "../../../../hooks/useTableSelect";
import { FullSubject } from "../../subjects/types";

const StudyPlanForm = ({formik}:{formik: FormikProps<NewStudyPlan & {subjects?: FullSubject[]}>}) => {

    const t = useTranslate();
    const { faculties } = useGetDropdownFaculties();
    const { specialities } = useGetDropdownSpecialities(formik.values.facultyId as string);
    const { subjects } = useGetDropdownSubjects();

    const { renderSelectTable, setAllSelectedItems } = useTableSelect('Study Plans',
                                                subjects ? mapToTyphead(subjects.data) : [] ,
                                                formik.errors.studyPlanSubjects as string,
                                                {
                                                    onSelect: selectedSubjects => {
                                                        formik.setValues({
                                                            ...formik.values,
                                                            studyPlanSubjects: [
                                                                ...formik.values.studyPlanSubjects,
                                                                selectedSubjects[0].id
                                                            ]
                                                        })
                                                    },
                                                    onDelete: subjectId => {
                                                        const newSubjects = formik.values.studyPlanSubjects.filter(item => {
                                                            return (item !== subjectId) 
                                                        });
                                                        formik.setValues({
                                                            ...formik.values,
                                                            studyPlanSubjects: newSubjects
                                                        });
                                                    }
                                                }); 
                                                
    useEffect(() => {
        if(formik.values.subjects) {
            setAllSelectedItems(formik.values.subjects)
        }
    }, [formik.values?.subjects?.length])


   const columns = useMemo(
        () => [
            {
                Header: t('subject_name'),
                accessor: 'name',
            },
            {
                Header: t('options'),
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
                        placeholder={t('arabic_name')}
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
                        placeholder={t('english_name')}
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
                        {t('faculty')}:
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
                        {t('speciality')}:             
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
        {renderSelectTable(columns)}
    </Form>
  )
}

export default StudyPlanForm
