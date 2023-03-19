import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { FormikProps } from "formik";
import { NewSemester } from "../../../types/semesters";

const SemesterForm = ({formik}:{formik: FormikProps<NewSemester>}) => {

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
                    <Form.Label htmlFor="collectingSuggestionsStartAt">
                        Collect Suggestions Starts At:
                    </Form.Label>
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        id="collectingSuggestionsStartAt"
                        name="collectingSuggestionsStartAt"
                        value={formik.values.collectingSuggestionsStartAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.collectingSuggestionsStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="collectingSuggestionsEndAt">
                        Collect Suggestions Ends At:
                    </Form.Label>
                    <Form.Control
                        id="collectingSuggestionsEndAt"
                        size="lg"
                        required
                        type="date" 
                        name="collectingSuggestionsEndAt"
                        value={formik.values.collectingSuggestionsEndAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.collectingSuggestionsEndAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>   
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="reviewSuggestionsStartAt">
                        Review Suggestions Starts At:
                    </Form.Label>
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        name="reviewSuggestionsStartAt"
                        value={formik.values.reviewSuggestionsStartAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.reviewSuggestionsStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="reviewSuggestionsEndAt">
                        Review Suggestions Ends At:
                    </Form.Label>
                    <Form.Control
                        id="reviewSuggestionsEndAt"
                        size="lg"
                        required
                        type="date" 
                        name="reviewSuggestionsEndAt"
                        value={formik.values.reviewSuggestionsEndAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.reviewSuggestionsEndAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="subjectsRegistrationStartAt">
                        Subjects Registration Starts At:
                    </Form.Label>
                    <Form.Control
                        id="subjectsRegistrationStartAt"
                        size="lg"
                        required
                        type="date" 
                        name="subjectsRegistrationStartAt"
                        value={formik.values.subjectsRegistrationStartAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.subjectsRegistrationStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="subjectsRegistrationEndAt">
                        Subjects Registration Ends At:
                    </Form.Label>
                    <Form.Control
                        id="subjectsRegistrationEndAt"
                        size="lg"
                        required
                        type="date" 
                        name="subjectsRegistrationEndAt"
                        value={formik.values.subjectsRegistrationEndAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.subjectsRegistrationEndAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterStartAt">
                        Semester Starts At:
                    </Form.Label>
                    <Form.Control
                        id="semesterStartAt"
                        size="lg"
                        required
                        type="date" 
                        name="semesterStartAt"
                        value={formik.values.semesterStartAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.semesterStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="semesterEndAt">
                        Semester Ends At:
                    </Form.Label>
                    <Form.Control
                        id="semesterEndAt"
                        size="lg"
                        required
                        type="date" 
                        name="semesterEndAt"
                        value={formik.values.semesterEndAt.split('T')[0]} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.semesterEndAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row> 
    </Form>
  )
}

export default SemesterForm
