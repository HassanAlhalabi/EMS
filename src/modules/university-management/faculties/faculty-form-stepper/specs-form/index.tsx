import { FormikProps } from "formik";
import { Form, Row, Col } from "react-bootstrap";

import Feedback from "../../../../../components/feedback";
import { NewSpec } from "../../types";
import useTranslate from "../../../../../hooks/useTranslate";

const SpecsForm = ({formik}: {formik: FormikProps<NewSpec>}) => {

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
                size="lg"
                as="textarea"
                type="text" 
                placeholder={t('arabic_description')}
                name="descriptionAr"
                value={formik.values.descriptionAr} 
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
                placeholder={t('english_name')}
                name="descriptionEn"
                value={formik.values.descriptionEn} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback>
        </Form.Group> 
        <button
            onClick={(e) => { e.preventDefault(); formik.handleSubmit()} } 
            className={`btn btn-falcon-success px-5 px-sm-6 mb-3`} 
            type="button"
            >
            {t('ADD')} {t('speciality')} <span className="fas fa-plus ms-2" data-fa-transform="shrink-3"> </span>
        </button>
    </Form>
  )
}

export default SpecsForm
