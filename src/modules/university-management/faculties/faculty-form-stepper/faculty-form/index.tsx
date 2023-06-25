import { Form, Row, Col } from "react-bootstrap";
import { FormikProps } from 'formik';

import Feedback from "../../../../../components/feedback";
import { NewFaculty } from "../../types";
import SwitchInput from "../../../../../components/switch-input/index.";

const FacultyForm = ({formik}:{formik: FormikProps<NewFaculty>}) => {

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nameAr">
                        Arabic Title
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="nameEn">
                        English Title
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
                Arabic Description
            </Form.Label>
            <Form.Control
                id="descriptionAr"
                as='textarea'
                size="lg"
                type="text" 
                name="descriptionAr"
                value={formik.values.descriptionAr as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionAr as string}
            </Feedback>
        </Form.Group> 
        <Form.Group className="mb-3">
            <Form.Label htmlFor="descriptionEn">
                English Description
            </Form.Label>
            <Form.Control
                id="descriptionEn"
                as="textarea"
                size="lg"
                type="text" 
                name="descriptionEn"
                value={formik.values.descriptionEn as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback>
        </Form.Group> 
        <Row>
            <Col sm={5}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="studingYearsCount">
                        Number Of Study Years: 
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
                        Has Specialiaztions: 
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
                            Specialiaztion Starting Year: 
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="minCountToSubject">
                        Minimum Students Number in a Class: 
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="maxStudCountInGroup">
                        Maximum Students Number in a Class: 
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterRegistrationRequirement.minHours">
                        Semester Min Hours: 
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterRegistrationRequirement.maxHours">
                        Semester Max Hours: 
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterRegistrationRequirement.minGradePointAverage">
                        Semester Min Average Grade: 
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
