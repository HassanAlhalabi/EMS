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
                        Collect Suggestoins Start At
                    </Form.Label>
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="Suggestions Started At"
                        id="collectingSuggestionsStartAt"
                        name="collectingSuggestionsStartAt"
                        value={formik.values.collectingSuggestionsStartAt} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.collectingSuggestionsStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="English Name"
                        name="collectingSuggestionsEndAt"
                        value={formik.values.collectingSuggestionsEndAt} 
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
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="Suggestions Started At"
                        name="reviewSuggestionsStartAt"
                        value={formik.values.reviewSuggestionsStartAt} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.reviewSuggestionsStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="English Name"
                        name="reviewSuggestionsEndAt"
                        value={formik.values.reviewSuggestionsEndAt} 
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
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="Suggestions Started At"
                        name="subjectsRegistrationStartAt"
                        value={formik.values.subjectsRegistrationStartAt} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.subjectsRegistrationStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="English Name"
                        name="subjectsRegistrationEndAt"
                        value={formik.values.subjectsRegistrationEndAt} 
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
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="Suggestions Started At"
                        name="semesterStartAt"
                        value={formik.values.semesterStartAt} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.semesterStartAt as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="date" 
                        placeholder="English Name"
                        name="semesterEndAt"
                        value={formik.values.semesterEndAt} 
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
