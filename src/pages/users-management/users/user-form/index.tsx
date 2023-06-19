import { Form, Row, Col } from "react-bootstrap"
import { useQuery } from 'react-query';
import { FormikProps } from "formik";
import Select from 'react-select';

import Feedback from "../../../../components/feedback"
import { USERS_TYPES, WORK_DAYS } from "../../../../constants"
import { NewUser } from "../../../../types/users";
import { useGet } from "../../../../hooks";
import { useGetSpecialities } from "../../../../hooks/useGetSpecialities";

const UserForm = ({formik}:{formik: FormikProps<NewUser>}) => {

    const get = useGet();

    const { data } = useQuery(['/Role/GetRolesList'], () => get(`/Role/GetRolesList`));
   
    const { renderSpecialitySelect } = useGetSpecialities(formik.values.facultyId, formik.values.specialtyId)

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
                            value={formik.values.email} 
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
                            value={formik.values.phoneNumber} 
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
                            value={formik.values.type} 
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
                                value={formik.values.roleId} 
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
            {
                (formik.values.type === 'Doctor' || 
                formik.values.type === 'Employee') &&
                <>
                    <h4 className="mt-3">Contract Details:</h4>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="contractStartAt">
                                    Start Date:
                                </Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="date"
                                    required
                                    id="contractStartAt"
                                    name="contract.startAt"
                                    value={formik.values.contract?.startAt as string} 
                                    onChange={formik.handleChange}>
                                </Form.Control>            
                                <Feedback type="invalid">
                                    {(formik.errors?.contract as unknown as Record<string, string>)?.startAt}
                                </Feedback>
                            </Form.Group> 
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="contractEndAt">
                                    End Date:
                                </Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="date"
                                    required
                                    id="contractEndAt"
                                    name="contract.endAt"
                                    value={formik.values.contract?.endAt as string} 
                                    onChange={formik.handleChange}>
                                
                                </Form.Control>            
                                <Feedback type="invalid">
                                    {(formik.errors?.contract as unknown as Record<string, string>)?.endAt}
                                </Feedback>
                            </Form.Group> 
                        </Col>
                        <Col>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="contractSalary">
                                    Salary:
                                </Form.Label>
                                <Form.Control
                                    size="lg"
                                    type="number"
                                    min="1"
                                    required
                                    id="contractSalary"
                                    name="contract.salary"
                                    value={formik.values.contract?.salary} 
                                    onChange={formik.handleChange}>
                                
                                </Form.Control>            
                                <Feedback type="invalid">
                                    {(formik.errors?.contract as unknown as Record<string, string>)?.salary}
                                </Feedback>
                            </Form.Group> 
                        </Col>
                    </Row> 
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="role">
                            Working Days:
                        </Form.Label>
                        <Select 
                            isMulti
                            name='contract.workDays'
                            onChange={newOptions => formik.setFieldValue('contract.workDays', newOptions)}
                            value={formik.values.contract?.workDays}
                            options={Object.entries(WORK_DAYS).map(([key, value]) => ({
                                label: key,
                                value,
                            }))} />
                        <Feedback type="invalid">
                            {(formik.errors?.contract as unknown as Record<string, string>)?.workDays}
                        </Feedback>
                    </Form.Group>
                </> 
                } 
                {
                    (formik.values.type === 'Student') &&
                    <Row>
                        {renderSpecialitySelect()}
                    </Row>
                }
        </Form>
    )
}

export default UserForm
