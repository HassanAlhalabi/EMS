import { useEffect } from "react";

import { useQuery } from "react-query";
import { Col, Form, Row } from "react-bootstrap";
import { FormikProps } from "formik";

import { useGet } from "..";

export const useGetSpecialities = function<T>
                            (formik: FormikProps<T & {facultyId: string, specialtyId: string}>) {

    const get = useGet();
    
    const { data: faculties } = useQuery(
        ['/Faculty/GetDropDownFaculties'], 
        () => get(`/Faculty/GetDropDownFaculties`));

    const { data: specialities, refetch: refetchSpecialities } = useQuery(
        ['/Specialty/GetDropDownSpecialties', formik.values.facultyId], 
        () => get(`/Specialty/GetDropDownSpecialties/${formik.values.facultyId}`),
        {
            enabled: false
        });

    useEffect(() => {
        if(formik.values.facultyId) {
            refetchSpecialities();
        }
    },[formik.values.facultyId]);

    const renderSpecialitySelect = () => {
        return (
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
                            value={formik.values.facultyId} 
                            onChange={formik.handleChange}>
                                <option key="no-value" value=""></option>
                            {
                                faculties?.data.map((faculty: {id: string, name: string}) => 
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
                                specialities?.data.map((speciality: {id: string, name: string}) => 
                                    <option key={speciality.id} value={speciality.id}>{speciality.name}</option>
                                )
                            }
                        </Form.Select>            
                    </Form.Group>
                </Col>
            </Row>
        )
    }

    return {
        faculties,
        specialities, 
        renderSpecialitySelect
    }

}