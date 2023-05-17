import { useState,useEffect, ChangeEvent, MouseEvent, useMemo } from 'react';

import { Form, Row, Col } from "react-bootstrap";
import { FormikProps } from "formik";

import Feedback from "../../../components/feedback";
import { NewSubject } from "../../../types/subjects";
import Table from "../../../components/table";
import { useGetSpecialities } from "../../../hooks/useGetSpecialities";
import SwitchInput from "../../../components/switch-input/index.";
import { useGetSubjects } from "../../../hooks/useGetSubjects";
import { useGetSubjectsTypes } from "../../../hooks/useGetSubjectsTypes";

type FacultySubjectProps = {
    facultyId: string,
    facultyName: string,
    specialityId: string,
    specialityName: string,
    superSubjectId: string,
    superSubjectName: string
}

const SubjectForm = (   {formik, loading}:
                        {formik: FormikProps<NewSubject>, loading: boolean}
                    ) => {

    const [facultySubjects, setFacultySubjects] = useState<FacultySubjectProps[]>([]);
    const {faculty, speciality, renderSpecialitySelect, reset} = useGetSpecialities();
    const subjects = useGetSubjects(speciality.id)
    const subjectsTypes = useGetSubjectsTypes();
    const [superSubjectId, setSuperSubjectId] = useState<string>('');
    const [superSubjectName, setSuperSubjectName] = useState<string>('');

    const handleAddFacultySubject = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if(faculty.id) {
            // Check If Object Already Exists
            const objectExits = formik.values.specialtySubjects.find(item => 
                                    item.specialtyId === speciality.id &&
                                    item.facultyId === faculty.id);

            if(objectExits) {
                return;
            }       

            setFacultySubjects(prev => 
                [
                    ...prev,
                {
                    facultyId: faculty.id,
                    facultyName: faculty.name,
                    specialityId: speciality?.id,
                    specialityName: speciality?.name,
                    superSubjectId,
                    superSubjectName
                }]
            )
            
            formik.setValues({
                ...formik.values,
                specialtySubjects: [
                    ...formik.values.specialtySubjects,
                    {
                        facultyId: faculty.id,
                        facultyName: faculty.name,
                        specialtyId: speciality?.id,
                        specialtyName: speciality?.name,
                        superSubjectId,
                        superSubjectName
                    }
                ]
            })
        }
        setSuperSubjectId('');
        setSuperSubjectName('');
        reset();
    }

    useEffect(() => {
        setFacultySubjects(formik.values.specialtySubjects.map(facultySubject => {
            return {
                facultyId: facultySubject.facultyId,
                facultyName: facultySubject.facultyName,
                specialityId: facultySubject.specialtyId,
                specialityName: facultySubject.specialtyName,
                superSubjectId: facultySubject.superSubjectId,
                superSubjectName: facultySubject.superSubjectName
            }
        }))
    },[loading])

    const handleDeleteFacultySubject = (facultyId: string, specialtyId: string) => {
        const newFacultySubjects = formik.values.specialtySubjects.filter(item => {
            return (item.specialtyId !== specialtyId && item.facultyId !== facultyId) 
        })
        const newFacultySubjectsForTable = facultySubjects?.filter(item => {
            return (item.specialityId !== specialtyId && item.facultyId !== facultyId) 
        })
        formik.setValues({
            ...formik.values,
            specialtySubjects: newFacultySubjects
        })
        setFacultySubjects(newFacultySubjectsForTable)
    }

    const columns = useMemo(
        () => [
            {
                Header: 'Faculty Name',
                accessor: 'facultyName',
            },
            {
                Header: 'Speciality Name',
                accessor: 'specialityName',
            },
            {
                Header: 'Pre-Requested Subject Name',
                accessor: 'superSubjectName',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

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
                as="textarea"
                size="lg"
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
                    <Form.Label htmlFor="type">
                        Subject Type:
                    </Form.Label>
                    <Form.Select
                        size="lg"
                        required
                        id="subjectTypeId"
                        name="subjectTypeId"
                        value={formik.values.subjectTypeId} 
                        onChange={formik.handleChange}>
                            <option key="no-value" value=""></option>
                        {
                            subjectsTypes?.map((subjectType: {id: string, name: string}) => 
                                <option key={subjectType.id} value={subjectType.id}>{subjectType.name}</option>
                            )
                        }
                    </Form.Select>            
                    <Feedback type="invalid">
                        {formik.errors.subjectTypeId as string}
                    </Feedback>
            </Form.Group> 
            </Col>
            <Col sm={4}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="hasLabratory">
                        Has Labratory: 
                    </Form.Label>
                    <SwitchInput
                        id="hasLabratory"                    
                        name="hasLabratory"
                        checked={formik.values.hasLabratory} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.hasLabratory as string}
                    </Feedback>
                </Form.Group> 
            </Col>
        </Row>

        {renderSpecialitySelect()}

        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="superSubjectId">
                        Pre-request Subject:             
                    </Form.Label>
                    <Form.Select
                        size="lg"
                        id="superSubjectId"
                        name="superSubjectId"
                        value={superSubjectId ? superSubjectId : ''} 
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => { 
                            setSuperSubjectId(e.target.value);
                            setSuperSubjectName(e.target.options[e.target.selectedIndex].textContent as string)
                        }}>
                            <option key="no-value" value=""></option>
                        {
                            subjects?.map((subject: {id: string, name: string}) => 
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            )
                        }
                    </Form.Select>            
                </Form.Group>
            </Col>
        </Row>
        <button className="btn btn-success" onClick={handleAddFacultySubject}>
                Add Faculty Pre-Requested Subject <i className="fa fa-plus"></i>
        </button>
        <Table<FacultySubjectProps>  columns={columns} 
                data={facultySubjects}
                renderRowActions={data =>  <button className="btn btn-falcon-danger btn-sm m-1" 
                type="button" 
                onClick={() => handleDeleteFacultySubject(data.facultyId, data.superSubjectId)}>        
                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                    </button>}  />
    </Form>
  )
}

export default SubjectForm
