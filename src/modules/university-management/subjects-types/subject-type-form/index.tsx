import { Form, Row, Col } from "react-bootstrap";
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback"
import { NewSubjectType } from "../../subjects/types";
import useTranslate from "../../../../hooks/useTranslate";

const SubjectTypeForm = ({formik}:{formik: FormikProps<NewSubjectType>}) => {

    const t = useTranslate();

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col md={6}>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder={t('arabic_name')}
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
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder={t('english_name')}
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
                placeholder={t('arabic_description')}
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
                placeholder={t('english_description')}
                name="descriptionEn"
                value={formik.values.descriptionEn as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback> 
        </Form.Group> 
        <Form.Group className="mb-3">
            <Form.Control
                size="lg"
                required
                type="number" 
                placeholder={t('max_hours')}
                name="maxHours"
                value={formik.values.maxHours} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.maxHours}
            </Feedback>
        </Form.Group>
    </Form>
  )
}

export default SubjectTypeForm
