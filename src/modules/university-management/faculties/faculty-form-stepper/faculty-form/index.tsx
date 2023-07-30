import { Form, Row, Col } from "react-bootstrap";
import { FormikProps } from 'formik';

import Feedback from "../../../../../components/feedback";
import { NewFaculty } from "../../types";
import SwitchInput from "../../../../../components/switch-input/index.";
import useTranslate from "../../../../../hooks/useTranslate";

const FacultyForm = ({formik}:{formik: FormikProps<NewFaculty>}) => {

    const t = useTranslate();

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nameAr">
                        {t('arabic_title')}:
                    </Form.Label>
                    <Form.Control
                        id="nameAr"
                        size="lg"
                        required
                        type="text" 
                        name="nameAr"
                        value={formik.values.nameAr} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.nameAr as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nameEn">
                    {t('english_title')}:
                    </Form.Label>
                    <Form.Control
                        id="nameEn"
                        size="lg"
                        required
                        type="text" 
                        name="nameEn"
                        value={formik.values.nameEn} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.nameEn as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>  
        <Form.Group className="mb-3">
            <Form.Label htmlFor="descriptionAr">
            {t('arabic_description')}:
            </Form.Label>
            <Form.Control
                id="descriptionAr"
                as='textarea'
                size="lg"
                type="text" 
                name="descriptionAr"
                value={formik.values.descriptionAr} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionAr as string}
            </Feedback>
        </Form.Group> 
        <Form.Group className="mb-3">
            <Form.Label htmlFor="descriptionEn">
                {t('english_description')}:
            </Form.Label>
            <Form.Control
                id="descriptionEn"
                as="textarea"
                size="lg"
                type="text" 
                name="descriptionEn"
                value={formik.values.descriptionEn} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback>
        </Form.Group> 
        <Row>
            <Col sm={5}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="studingYearsCount">
                        {t('number_of_study_years')}
                    </Form.Label>
                    <Form.Control
                        id="studingYearsCount"
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        name="studingYearsCount"
                        value={formik.values.studingYearsCount} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.studingYearsCount as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col sm={2}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="isManySpecialty">
                        {t('has_specialiaztions')}: 
                    </Form.Label>
                    <SwitchInput
                        id="isManySpecialty"                    
                        name="isManySpecialty"
                        checked={formik.values.isManySpecialty} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.isManySpecialty as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col sm={5}>
                {
                    formik.values.isManySpecialty && 
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="specialtyYearNum">
                            {t('specialiaztion_starting_year')}: 
                        </Form.Label>
                        <Form.Control
                            id="specialtyYearNum"
                            size="lg"
                            required
                            type="number" 
                            name="specialtyYearNum"
                            value={formik.values.specialtyYearNum} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.specialtyYearNum as string}
                        </Feedback>
                    </Form.Group>
                } 
            </Col>
        </Row>
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="minCountToSubject">
                        {t('minimum_students')}: 
                    </Form.Label>
                    <Form.Control
                        id="minCountToSubject"
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        name="minCountToSubject"
                        value={formik.values.minCountToSubject} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.minCountToSubject as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="maxStudCountInGroup">
                        {t('max_student')}: 
                    </Form.Label>
                    <Form.Control
                        id="maxStudCountInGroup"
                        size="lg"
                        required
                        type="number" 
                        name="maxStudCountInGroup"
                        value={formik.values.maxStudCountInGroup} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.maxStudCountInGroup as string}
                    </Feedback>
                </Form.Group> 
            </Col>
        </Row>
        <Row>
            <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterRegistrationRequirement.minHours">
                        {t('semester_min-hours')}: 
                    </Form.Label>
                    <Form.Control
                        id="semesterRegistrationRequirement.minHours"
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        name="semesterRegistrationRequirement.minHours"
                        value={formik.values.semesterRegistrationRequirement?.minHours} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.semesterRegistrationRequirement?.minHours as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterRegistrationRequirement.maxHours">
                        {t('semester_max_hours')}:
                    </Form.Label>
                    <Form.Control
                        id="semesterRegistrationRequirement.maxHours"
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        name="semesterRegistrationRequirement.maxHours"
                        value={formik.values.semesterRegistrationRequirement?.maxHours} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.semesterRegistrationRequirement?.maxHours as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterRegistrationRequirement.minGradePointAverage">
                        {t('semester_min_avg_grade')}: 
                    </Form.Label>
                    <Form.Control
                        id="semesterRegistrationRequirement.minGradePointAverage"
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        name="semesterRegistrationRequirement.minGradePointAverage"
                        value={formik.values.semesterRegistrationRequirement?.minGradePointAverage} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.semesterRegistrationRequirement?.minGradePointAverage as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            {/* <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterRegistrationRequirement.maxCount">
                        Semester Max Courses Count To Register: 
                    </Form.Label>
                    <Form.Control
                        id="semesterRegistrationRequirement.maxCount"
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        name="semesterRegistrationRequirement.maxCount"
                        value={formik.values.semesterRegistrationRequirement?.maxCount} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.semesterRegistrationRequirement?.maxCount as string}
                    </Feedback>
                </Form.Group> 
            </Col> */}
        </Row>
    </Form>
  )
}

export default FacultyForm
