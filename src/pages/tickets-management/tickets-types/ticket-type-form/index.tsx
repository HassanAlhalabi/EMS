import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback";
import { NewTicketType } from "../types";
import useGetDepartments from "../../../../hooks/useGetDepartments";
import { Typeahead } from "react-bootstrap-typeahead";
import { mapToTyphead } from "../../../../util";
import SwitchInput from "../../../../components/switch-input/index.";
import { Department } from "../../../../types/departments";
import { useState } from "react";

const BusStopForm = ({formik}:{formik: FormikProps<NewTicketType>}) => {

    const departments = useGetDepartments();

    const [selectedDep, setSelectedDep] = useState()

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <Row>
                <Col sm={12}>
                    <Form.Group className="mb-3">
                        <Form.Control
                            size="lg"
                            required
                            type="text" 
                            placeholder="Ticket Type Title"
                            name="title"
                            value={formik.values.title} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.title as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Control
                            size="lg"
                            as="textarea"
                            type="text" 
                            placeholder="Ticket Type Description"
                            name="description"
                            value={formik.values.description} 
                            onChange={formik.handleChange} />
                        <Feedback type="invalid">
                            {formik.errors.description as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col xs={12}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="stateId">
                            Assigned Department:
                        </Form.Label>
                        <Typeahead
                            selected={ departments?.departments
                                        .filter((dep: Department) => dep.id === formik.values.assignToDepartmentId) 
                                        .map((dep: Department) => ({...dep,label: dep.name}))
                                     }
                            id="stateId"
                            size="lg"
                            className={(formik.errors.assignToDepartmentId !== undefined && formik.dirty) ? 'is-invalid' : 'is-valid'}
                            placeholder='Search Departments'
                            // onInputChange={() => setSelectedState([])}
                            onChange={ selected => formik.setFieldValue('assignToDepartmentId', (selected[0] as Record<string,unknown>)?.id) }
                            options={departments ? mapToTyphead(departments.departments, 'name') : []}
                            isInvalid={formik.errors.assignToDepartmentId !== undefined && formik.dirty}
                            isValid={formik.errors.assignToDepartmentId === undefined && formik.dirty}
                        />
                        <Feedback type="invalid">
                            {formik?.errors.assignToDepartmentId as string}
                        </Feedback>
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="isStudent">
                            Is Student:
                        </Form.Label>
                        <SwitchInput    id="isStudent" 
                                        name="isStudent"
                                        onChange={formik.handleChange}
                                        checked={formik.values.isStudent}
                        />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="isEmployee">
                            Is Employee:
                        </Form.Label>
                        <SwitchInput    id="isEmployee" 
                                        name="isEmployee"
                                        onChange={formik.handleChange}
                                        checked={formik.values.isEmployee}
                        />
                    </Form.Group>
                </Col>
                <Col sm={4}>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="isDoctor">
                            Is Doctor:
                        </Form.Label>
                        <SwitchInput    id="isDoctor" 
                                        name="isDoctor"
                                        onChange={formik.handleChange}
                                        checked={formik.values.isDoctor}
                        />
                    </Form.Group>
                </Col>
            </Row> 
        </Form>
    )
}

export default BusStopForm
