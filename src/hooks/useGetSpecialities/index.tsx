import { ChangeEvent, useEffect, useState } from "react";

import { useQuery } from "react-query";
import { Col, Form, Row } from "react-bootstrap";

import { useGet } from "..";

interface Faculty {
    id: string,
    name: string,
}

interface Speciality {
    id: string,
    name: string,
}

const optionInitialState = {id: '', name: ''};

export const useGetSpecialities = function(defaultFaculty?: string, defaultSpeciality?: string) {

    const get = useGet();
    const [faculty, setFaculty] = useState<Faculty>(optionInitialState);
    const [speciality, setSpeciality] = useState<Speciality>(optionInitialState);

    const reset = () => {
        setFaculty(optionInitialState);
        setSpeciality(optionInitialState);
    }
    
    const { data: faculties } = useQuery(
        ['/Faculty/GetDropDownFaculties'], 
        () => get(`/Faculty/GetDropDownFaculties`));

    const { data: specialities, refetch: refetchSpecialities, isFetching } = useQuery(
        ['/Specialty/GetDropDownSpecialties', faculty.id], 
        () => get(`/Specialty/GetDropDownSpecialties/${faculty.id}`),
        {
            enabled: false
        });

    useEffect(() => {
        if(faculty.id) refetchSpecialities()
    },[faculty.id])

    useEffect(() => {
        if(defaultFaculty) {
            setFaculty(prev => ({
                ...prev,
                id: defaultFaculty
            }))
        }
    },[defaultFaculty])

    useEffect(() => {
        if(defaultSpeciality) {
            setSpeciality(prev => ({
                ...prev,
                id: defaultSpeciality
            }))
        }
    },[defaultSpeciality])


    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const {target: {value, name, options}} =  event;
        const optionName = options[options.selectedIndex].textContent as string;
        if(name === 'facultyId') setFaculty({id: value, name: optionName});
        if(name === 'specialityId') setSpeciality({id: value, name: optionName})
    }    

    const renderSpecialitySelect = () => {
        return (
            <Row>
                <Col>
                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="facultyId">
                            Faculties:
                        </Form.Label>
                        <Form.Select
                            size="lg"
                            id=""
                            name="facultyId"
                            value={faculty?.id} 
                            onChange={handleChange}>
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
                        <Form.Label htmlFor="specialityId">
                            Speciality:             
                        </Form.Label>
                        <Form.Select
                            disabled={!faculty?.id || isFetching}
                            size="lg"
                            id="specialityId"
                            name="specialityId"
                            value={speciality?.id} 
                            onChange={handleChange}>
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
        faculty,
        speciality,
        renderSpecialitySelect,
        reset
    }

}