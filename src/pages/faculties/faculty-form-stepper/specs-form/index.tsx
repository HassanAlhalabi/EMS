import { FormikProps, FieldArray } from "formik"
import { Form, Row, Col, Button } from "react-bootstrap"
import Feedback from "../../../../components/feedback"
import { NewSpecs } from "../../../../types/faculties"

const SpecsForm = ({formik}:{formik: FormikProps<{specs: NewSpecs[]}>}) => {
  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <FieldArray name="specs"
            render={arrayHelpers => (
                <>
                    {
                      formik.values.specs.map((spec,index) => 
                        <div key={index}>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3">
                                        <Form.Control
                                            size="lg"
                                            required
                                            type="text" 
                                            placeholder="Arabic Name"
                                            name="nameAr"
                                            value={spec.nameAr} 
                                            onChange={formik.handleChange} />
                                        {/* <Feedback type="invalid">
                                            
                                            {spec.errors.nameAr as string}
                                        </Feedback> */}
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
                                            value={spec.nameEn} 
                                            onChange={formik.handleChange} />
                                        {/* <Feedback type="invalid">
                                            {formik.errors.nameEn as string}
                                        </Feedback> */}
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
                                            value={spec.descriptionAr as string} 
                                            onChange={formik.handleChange} />
                                        {/* <Feedback type="invalid">
                                            {formik.errors.descriptionAr as string}
                                        </Feedback> */}
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
                                            value={spec.descriptionEn as string} 
                                            onChange={formik.handleChange} />
                                        {/* <Feedback type="invalid">
                                            {formik.errors.specs.descriptionEn as string}
                                        </Feedback> */}
                                    </Form.Group> 
                                </Col>
                            </Row>
                        <Button  onClick={() => arrayHelpers.insert(index, '')}>+</Button> 
                        </div>
                    )}
                </>
            )} />  
    </Form>
  )
}

export default SpecsForm
