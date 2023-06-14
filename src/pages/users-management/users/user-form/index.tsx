import { useState, ChangeEvent, useEffect } from 'react';

import { Form, Row, Col } from "react-bootstrap"
import { useQuery } from 'react-query';
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback"
import { USERS_TYPES, WORK_DAYS, WORK_DAYS_NAMES } from "../../../../constants"
import { NewUser } from "../../../../types/users";
import CategoryBox from "../../../../components/category-box";  
import { useGet } from "../../../../hooks";
import { useGetSpecialities } from "../../../../hooks/useGetSpecialities";

const UserForm = ({formik}:{formik: FormikProps<NewUser>}) => {

    const [workingDays, setWorkingDays] = useState<{id: number, name: string | null}[]>([])
    const get = useGet();

    const { data } = useQuery(['/Role/GetRolesList'], () => get(`/Role/GetRolesList`));

    const handleSelectedDays = (e: ChangeEvent<HTMLSelectElement>) => {

        const newValue = { 
            id: Number(e.target.value),
            name: e.target.options[e.target.selectedIndex].textContent
        }
        
        const isExisted = workingDays.find(day => day.id === newValue.id);
        if(isExisted) return;

        setWorkingDays(prev => [...prev, newValue]);

        formik.values.contract && formik.setFieldValue('contract.workDays', [...formik.values.contract.workDays, Number(e.target.value)])

        e.target.value = '';

    }    
    
    const handleRemoveCategory = (id: number) => {
        const newWorkingDays = workingDays.filter(day => day.id !== id)
        setWorkingDays(newWorkingDays);
        formik.values.contract && formik.setFieldValue('contract.workDays', formik.values.contract.workDays.filter(day => day !== id))
    }

    const { renderSpecialitySelect } = useGetSpecialities()

    useEffect(() => {
        if(formik.values.contract) {
           setWorkingDays(
               formik.values.contract.workDays.map(day => ({
                    id: day,
                    name: WORK_DAYS_NAMES[day - 1]
                })) 
            )
        }
    },[formik.values.contract]);

    console.log(formik.errors)

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
            {
                formik.values.type !== 'Student' ?
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
                        <Form.Select
                            size="lg"
                            required
                            id="working-days"
                            onChange={handleSelectedDays}
                            name="contract.workDays">
                                <option value=""></option>
                            {
                                Object.entries(WORK_DAYS).map(([key, value]) => {
                                    return <option key={key} value={value}>{key}</option>   
                                })
                            }
                        </Form.Select>            
                        <Feedback type="invalid">
                            {formik.errors.roleId as string}
                        </Feedback>
                    </Form.Group>
                    <div className="mb-4">
                        {
                            workingDays.map((day) => {
                                return  <CategoryBox key={day.id} pill>
                                            {day.name} 
                                            <span className="fa fa-trash fa-sm text-danger cursor-pointer ms-2 ps-2" 
                                                    onClick={() => handleRemoveCategory(day.id)}
                                            ></span> 
                                        </CategoryBox>
                            })
                        }
                    </div>
                </> : 
                <Row>
                     {renderSpecialitySelect()}
                </Row>
            }
        </Form>
    )
}

export default UserForm