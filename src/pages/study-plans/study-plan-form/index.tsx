import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { FormikProps } from "formik";
import { NewStudyPlan } from "../../../types/studyPlan";

const StudyPlanForm = ({formik}:{formik: FormikProps<NewStudyPlan>}) => {

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
    </Form>
  )
}

export default StudyPlanForm
