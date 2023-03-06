import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { useQuery } from 'react-query';
import { get } from "../../../http";
import { FormikProps } from "formik";
import { NewSubject, SubjectType } from "../../../types/subjects";

const SubjectForm = ({formik}:{formik: FormikProps<NewSubject>}) => {

    const { data: faculties } = useQuery(
                            ['/Faculty/GetAllFaculties'], 
                        () => get(`/Faculty/GetAllFaculties`));

    const { data: subjects } = useQuery(
                            ['/Subject/GetAllSubjects'], 
                        () => get(`/Subject/GetAllSubjects`));

    const { data: subjectTypes } = useQuery(
                            ['/SubjectType/GetAllSubjectTypes'], 
                        () => get(`/SubjectType/GetAllSubjectTypes`));

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
                as="textarea"
                size="lg"
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
                type="text" 
                placeholder="English Description"
                name="descriptionEn"
                value={formik.values.descriptionEn as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback> 
        </Form.Group> 
        <Form.Group className="mb-3">
            <Form.Label htmlFor="type">
                Subject Type:
            </Form.Label>
            <Form.Select
                size="lg"
                required
                id="type"
                name="type"
                value={formik.values.subjectTypeId as string} 
                onChange={formik.handleChange}>
                    <option key="no-value" value=""></option>
                {
                    subjectTypes?.data.faculties.map((subjectType: SubjectType) => 
                        <option key={subjectType.id} value={subjectType.id}>{subjectType.name}</option>
                    )
                }
            </Form.Select>            
            <Feedback type="invalid">
                {formik.errors.subjectTypeId as string}
            </Feedback>
        </Form.Group> 
    </Form>
  )
}

export default SubjectForm
