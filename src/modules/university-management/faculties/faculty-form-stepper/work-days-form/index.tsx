import { Form, Row, Col } from "react-bootstrap";
import { FormikProps } from 'formik';

import Feedback from "../../../../../components/feedback"
import { NewDay } from "../../types";
import { WORK_DAYS } from "../../../../../constants";

const WorkDaysForm = ({formik}:{formik: FormikProps<NewDay>}) => {

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workingDaysNum">
                       Work Day: 
                    </Form.Label>
                    <Form.Select size="lg" name="name" onChange={formik.handleChange} value={formik.values.name}>
                        <option key='null' value=''>Select Day</option>
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workStartAt">
                       Starts At:
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
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="workEndAt">
                        Ends At:
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
            className={`btn btn-falcon-success px-5 px-sm-6`} 
            type="button"
            >
            Add Day <span className="fas fa-plus ms-2" data-fa-transform="shrink-3"> </span>
        </button>
    </Form>
  )
}

export default WorkDaysForm
