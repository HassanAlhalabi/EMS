import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { USERS_TYPES } from "../../../constants"
import { useQuery } from 'react-query';
import { get } from "../../../http";
import { FormikProps } from "formik";
import { NewUser } from "../../../types/users";

const UserForm = ({formik}:{formik: FormikProps<NewUser>}) => {

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
                        placeholder="First Name"
                        name="firstName"
                        value={formik.values.firstName} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.firstName as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder="Last Name"
                        name="lastName"
                        value={formik.values.lastName} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.lastName as string}
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
                        type="email" 
                        placeholder="Email"
                        name="email"
                        value={formik.values.email as string} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.email as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="tel" 
                        placeholder="Phone Number"
                        name="phoneNumber"
                        value={formik.values.phoneNumber as string} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.phoneNumber as string}
                    </Feedback> 
                </Form.Group> 
            </Col>
        </Row>
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="type">
                        User Type:
                    </Form.Label>
                    <Form.Select
                        size="lg"
                        required
                        id="type"
                        name="type"
                        value={formik.values.type as string} 
                        onChange={formik.handleChange}>
                            <option key="no-value" value=""></option>
                        {
                            Object.entries(USERS_TYPES).map(([key, value]) => 
                                <option key={key} value={value}>{value}</option>
                            )
                        }
                    </Form.Select>            
                    <Feedback type="invalid">
                        {formik.errors.type as string}
                    </Feedback>
                </Form.Group> 
            </Col>
            <Col>
            {
                formik.values.type !== 'Student' &&
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="role">
                            User Role:
                        </Form.Label>
                        <Form.Select
                            size="lg"
                            required
                            id="role"
                            name="roleId"
                            value={formik.values.roleId as string} 
                            onChange={formik.handleChange}>
                                <option key="no-value" value=""></option>
                            {
                                data?.data.roles.map((role: {id: string, name:string} ) => 
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                )
                            }
                        </Form.Select>            
                        <Feedback type="invalid">
                            {formik.errors.roleId as string}
                        </Feedback>
                    </Form.Group>
            }
            </Col>
        </Row> 
    </Form>
  )
}

export default UserForm
