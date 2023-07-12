import { FormikProps } from "formik"
import { Form, Row, Col } from "react-bootstrap"

import Feedback from "../../../../../components/feedback"
import { NewHall } from "../../types"
import SwitchInput from "../../../../../components/switch-input/index."

const HallsForm = ({formik}: {formik: FormikProps<NewHall>}) => {
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
                size="lg"
                as="textarea"
                type="text" 
                placeholder="Arabic Description"
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
                placeholder="English Description"
                name="descriptionEn"
                value={formik.values.descriptionEn} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback>
        </Form.Group> 
        <Row>
            <Col sm={8}>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="number" 
                        placeholder="Max Student Count In a Hall"
                        name="maxCount"
                        value={formik.values.maxCount} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.maxCount as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col sm={4}>
                <Form.Group className="mb-3 d-flex align-items-center">
                    <Form.Label className="ms-2 me-2 mb-0" htmlFor="isLabratory">
                        Is Labratory: 
                    </Form.Label>
                    <SwitchInput
                        id="isLabratory"                    
                        name="isLabratory"
                        checked={formik.values.isLabratory} 
                        onChange={formik.handleChange} />
                </Form.Group> 
            </Col>
        </Row>
        <button
            onClick={(e) => { e.preventDefault(); formik.handleSubmit()} } 
            className={`btn btn-falcon-success px-5 px-sm-6`} 
            type="button" >
            Add Hall <span className="fas fa-plus ms-2" data-fa-transform="shrink-3"> </span>
        </button>
    </Form>
  )
}

export default HallsForm
