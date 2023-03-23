import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../../components/feedback"
import { FormikProps } from 'formik';
import { NewFaculty } from "../../../../types/faculties";
import SwitchInput from "../../../../components/switch-input/index.";

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
                    <Form.Label htmlFor="workingDaysNum">
                        Number Of Working Days: 
                    </Form.Label>
                    <Form.Control
                        id="workingDaysNum"
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        max={7}
                        name="workingDaysNum"
                        value={formik.values.workingDaysNum} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.workingDaysNum as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workStartAt">
                        Working Day Starts At:
                    </Form.Label>
                    <Form.Control
                        id="workStartAt"
                        min={1} 
                        max={24}
                        size="lg"
                        required
                        type="time" 
                        name="workStartAt"
                        value={formik.values.workStartAt} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.workStartAt as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workEndAt">
                        Working Day Ends At:
                    </Form.Label>
                    <Form.Control
                        id="workEndAt"
                        min={1} 
                        max={24}
                        size="lg"
                        required
                        type="time" 
                        name="workEndAt"
                        value={formik.values.workEndAt} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.workEndAt as string}
                    </Feedback>
                </Form.Group> 
            </Col>
        </Row>
        <Row className="mt-3">
            <Col>
            </Col>
            <Col className="d-flex justify-content-end">
                <button
                    disabled={!formik.isValid || !formik.dirty}
                    onClick={(e) => { e.preventDefault(); formik.handleSubmit()} } 
                    className={`btn btn-primary px-5 px-sm-6`} 
                    type="submit">
                    Next <span className="fas fa-chevron-right ms-2" data-fa-transform="shrink-3"> </span>
                </button>
            </Col>
        </Row>
    </Form>
  )
}

export default FacultyForm
