import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { USERS_TYPES, WORK_DAYS } from "../../../constants"
import { useQuery } from 'react-query';
import { get } from "../../../http";
import { FormikProps } from "formik";
import { NewUser } from "../../../types/users";
import { useState, ChangeEvent, useEffect } from 'react';
import CategoryBox from "../../../components/category-box";
import { getCookie } from "../../../util";
    

const UserForm = ({formik}:{formik: FormikProps<NewUser>}) => {

    const [facultyId, setFacultyId] = useState<string>();

    const { data } = useQuery(
                            ['/Role/GetRolesList'], 
                        () => get(`/Role/GetRolesList`));

                        
                        
    const [workingDays, setWorkingDays] = useState<{id: number, name: string | null}[]>([])

    const handleSelectedDays = (e: ChangeEvent<HTMLSelectElement>) => {

        const newValue = { 
            id: Number(e.target.value),
            name: e.target.options[e.target.selectedIndex].textContent
        }
        
        const isExisted = workingDays.find(day => day.id === newValue.id);
        if(isExisted) return;

        setWorkingDays(prev => [...prev, newValue]);

        formik.setFieldValue('contract.workDays', [...formik.values.contract.workDays, Number(e.target.value)])

        e.target.value = '';

    }    
    
    const handleRemoveCategory = (id: number) => {
        const newWorkingDays = workingDays.filter(day => day.id !== id)
        setWorkingDays(newWorkingDays);
        formik.setFieldValue('contract.workDays', formik.values.contract.workDays.filter(day => day !== id))
    }

    const { data: faculties } = useQuery(
        ['/Faculty/GetDropDownFaculties'], 
    () => fetch(`http://http://alimakhlouf-002-site2.btempurl.com/api/Faculty/GetDropDownFaculties`,{
        headers: {
            'Authorization': 'Bearer '+getCookie("EMSUser").token
        }
    }).then(res => res.json()));

    const { data: specialities, refetch: refetchSpecialities } = useQuery(
        ['/Speciality/GetDropDownSpecialities',facultyId], 
    () => fetch(`http://http://alimakhlouf-002-site2.btempurl.com/api/Specialty/GetDropDownSpecialties/${facultyId}`,{
        headers: {
            'Authorization': 'Bearer '+getCookie("EMSUser").token
        }
    }).then(res => res.json()),{
        enabled: false
    });

    useEffect(() => {
        if(facultyId) {
            refetchSpecialities()
        }
    },[facultyId])

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
                                    value={formik.values.contract.startAt as string} 
                                    onChange={formik.handleChange}>
                                </Form.Control>            
                                <Feedback type="invalid">
                                    {formik.errors?.contract?.startAt as string}
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
                                    value={formik.values.contract.endAt as string} 
                                    onChange={formik.handleChange}>
                                
                                </Form.Control>            
                                <Feedback type="invalid">
                                    {formik.errors?.contract?.endAt as string}
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
                                    value={formik.values.contract.salary} 
                                    onChange={formik.handleChange}>
                                
                                </Form.Control>            
                                <Feedback type="invalid">
                                    {formik.errors?.contract?.salary as string}
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
                                    return <option value={value}>{key}</option>   
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
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="type">
                                Faculties:
                            </Form.Label>
                            <Form.Select
                                required
                                size="lg"
                                id=""
                                name="facultyId"
                                value={facultyId} 
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => setFacultyId(e.target.value) }>
                                    <option key="no-value" value=""></option>
                                {
                                    faculties?.map((faculty: {id: string, name: string}) => 
                                        <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                                    )
                                }
                            </Form.Select>            
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="superSubjectId">
                                Speciality:             
                            </Form.Label>
                            <Form.Select
                                required
                                size="lg"
                                id="specialtyId"
                                name="specialtyId"
                                value={formik.values.specialtyId} 
                                onChange={formik.handleChange}>
                                    <option key="no-value" value=""></option>
                                {
                                    specialities?.map((speciality: {id: string, name: string}) => 
                                        <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                                    )
                                }
                            </Form.Select>            
                        </Form.Group>
                    </Col>
                </Row>
            }
        </Form>
    )
}

export default UserForm
