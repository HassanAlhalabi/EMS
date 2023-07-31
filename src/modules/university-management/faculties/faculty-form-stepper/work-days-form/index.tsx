import { Form, Row, Col } from "react-bootstrap";
import { FormikProps } from 'formik';

import Feedback from "../../../../../components/feedback"
import { NewDay } from "../../types";
import { WORK_DAYS } from "../../../../../constants";
import useTranslate from "../../../../../hooks/useTranslate";

const WorkDaysForm = ({formik}:{formik: FormikProps<NewDay>}) => {

    const t = useTranslate();

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workingDaysNum">
                        {t('work_day')}: 
                    </Form.Label>
                    <Form.Select size="lg" name="name" onChange={formik.handleChange} value={formik.values.name}>
                        <option key='null' value=''>{t('select_day')}</option>
                        {
                            Object.entries(WORK_DAYS).map(([key,value]) => 
                                <option key={key} value={key}>{key}</option>
                            )
                        }
                    </Form.Select>
                    <Feedback type="invalid">
                        {formik.errors.name as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workStartAt">
                        {t('starts_at')}:
                    </Form.Label>
                    <Form.Control
                        id="workStartAt"
                        min={1} 
                        max={24}
                        size="lg"
                        required
                        type="time" 
                        value={formik.values.workStartAt}
                        name="workStartAt"
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.workStartAt as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col md={4}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workEndAt">
                        {t('ends_at')}:
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
        <button
            onClick={(e) => { e.preventDefault(); formik.handleSubmit()} } 
            className={`btn btn-falcon-success px-5 px-sm-6 mb-3`} 
            type="button"
            >
            {t('ADD')} {t('day')} <span className="fas fa-plus ms-2" data-fa-transform="shrink-3"> </span>
        </button>
    </Form>
  )
}

export default WorkDaysForm
