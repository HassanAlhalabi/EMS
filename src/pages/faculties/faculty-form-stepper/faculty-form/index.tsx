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
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
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
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder="Arabic Description"
                        name="descriptionEn"
                        value={formik.values.descriptionEn as string} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.descriptionEn as string}
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
                        placeholder="Minimum Student Count"
                        name="minCountToSubject"
                        value={formik.values.minCountToSubject as number} 
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
                        value={formik.values.maxStudCountInGroup as number} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.maxStudCountInGroup as string}
                    </Feedback>
                </Form.Group> 
            </Col>
        </Row>
    </Form>
  )
}

export default FacultyForm
