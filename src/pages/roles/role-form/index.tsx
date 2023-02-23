import { Row, Col, Form, FormLabel, Accordion } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { getClaimsMap } from "../../../util";
import { FormikHook } from '../../../types/formik/index';

const RoleForm = ({formik}:{formik: FormikHook}) => {
  return (
    <Form noValidate validated={formik.dirty}>
        <Form.Group className="mb-3">
            <Form.Control
                size="lg"
                required
                type="text" 
                placeholder="Role Name"
                name="name"
                value={formik.values.name} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.name as string}
            </Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Feedback type="invalid">
                {formik.errors.roleClaims as string}
            </Feedback>
            <FormLabel>Role Claims:</FormLabel>
            <Row>
                {Array.from(getClaimsMap()).map(claim =>               
                    <Col key={claim[0]} md="4" className="mb-3">
                        <Accordion>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header>{claim[0]}</Accordion.Header>
                                <Accordion.Body>
                                    {claim[1].map((claimType: string) => 
                                        <Form.Group key={claimType}>
                                            <Form.Check
                                                label={claimType}
                                                required
                                                className="d-inline-block cursor-pointer"
                                                id={`${claim[0]}.${claimType}`}
                                                type="checkbox"
                                                name={`roleClaims`}
                                                value={`Permissions.${claim[0]}.${claimType}`}
                                                checked={formik.values.roleClaims && 
																			formik.values.roleClaims.includes(`Permissions.${claim[0]}.${claimType}`)}
                                                onChange={formik.handleChange} />
                                        </Form.Group>
                                    )}
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>  
                    </Col>
                )}
            </Row>
        </Form.Group>
    </Form>
  )
}

export default RoleForm
