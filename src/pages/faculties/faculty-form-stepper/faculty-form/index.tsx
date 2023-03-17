import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../../components/feedback"
import { FormikProps } from 'formik';
import { NewFaculty } from "../../../../types/faculties";

const FacultyForm = ({formik}:{formik: FormikProps<NewFaculty>}) => {
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
        <Form.Group className="mb-3">
            <Form.Control
                as='textarea'
                size="lg"
                required
                type="text" 
                placeholder="Arabic Description"
                name="descriptionAr"
                value={formik.values.descriptionAr as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionAr as string}
            </Feedback>
        </Form.Group> 
        <Form.Group className="mb-3">
            <Form.Control
                as="textarea"
                size="lg"
                required
                type="text" 
                placeholder="English Description"
                name="descriptionEn"
                value={formik.values.descriptionEn as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback>
        </Form.Group> 
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        placeholder="Minimum Student Count"
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
                    <Form.Control
                        size="lg"
                        required
                        type="number" 
                        placeholder="Maximum Students Number in a Class"
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
                    <Form.Control
                        size="lg"
                        required
                        type="number"
                        min={1} 
                        max={7}
                        placeholder="Working Days Number"
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
                    <Form.Control
                        min={1} 
                        max={24}
                        size="lg"
                        required
                        type="number" 
                        placeholder="Working Day Starts At"
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
                    <Form.Control
                        min={1} 
                        max={24}
                        size="lg"
                        required
                        type="number" 
                        placeholder="Working Day Ends At"
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
