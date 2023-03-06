import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { USERS_TYPES } from "../../../constants"
import { useQuery } from 'react-query';
import { get } from "../../../http";
import { FormikProps } from "formik";
import { NewSubject } from "../../../types/subjects";

const SubjectForm = ({formik}:{formik: FormikProps<NewSubject>}) => {

    const { data } = useQuery(
                            ['/Role/GetRolesList'], 
                        () => get(`/Role/GetRolesList`));

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
                        name="titleAr"
                        value={formik.values.titleAr} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.titleAr as string}
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
                        name="titleEn"
                        value={formik.values.titleEn} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.titleEn as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>  
        {/* <Form.Group className="mb-3">
            <Form.Control
                as="textarea"
                size="lg"
                required
                type="text" 
                placeholder="Email"
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
                placeholder="descriptionEn"
                name="descriptionEn"
                value={formik.values.descriptionEn as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback> 
        </Form.Group>  */}
    </Form>
  )
}

export default SubjectForm
