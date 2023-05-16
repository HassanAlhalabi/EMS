import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { useQuery } from 'react-query';
import { FormikProps } from "formik";
import { SpecialitySubject, NewSubject,  } from "../../../types/subjects";
import { useState,useEffect, ChangeEvent, MouseEvent, useMemo } from 'react';
import Table from "../../../components/table";
import { useGet } from "../../../hooks";
import { useGetSpecialities } from "../../../hooks/useGetSpecialities";

type FacultySubjectProps = {
    facultyId: string,
    facultyName?: string | null,
    specialityId: string,
    specialityName: string,
    superSubjectId: string | null,
    superSubjectName?: string | null
}

const SubjectForm = (   {formik, loading}:
                        {formik: FormikProps<NewSubject>, loading: boolean}
                    ) => {

    const [facultyId, setFacultyId] = useState<string>();
    const [facultyName, setFacultyName] = useState<string | null>(null);
    const [superSubjectId, setSuperSubjectId] = useState<string | null>(null);
    const [superSubjectName, setSuperSubjectName] = useState<string | null>(null);
    const [facultySubjects, setFacultySubjects] = useState<FacultySubjectProps[]>([])
    const {faculties,specialities,renderSpecialitySelect} = useGetSpecialities<FacultySubjectProps>();
    const get = useGet();


    const { data: subjects, refetch: refetchSubjects } = useQuery(
                            ['/Subject/GetDropDownSubjects', facultyId ], 
                        () => get(`/Subject/GetDropDownSubjects?FacultyId=${facultyId}`),{
                            enabled: false
                        });

    const { data: subjectTypes } = useQuery(
                            ['/SubjectType/GetDropDownSubjectTypes'], 
                        () => get(`/SubjectType/GetDropDownSubjectTypes`));

    const handleAddFacultySubject = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // if(facultyId) {
        //     // Check If Object Already Exists
        //     const objectExits = formik.values.facultySubjects.find(item => item.facultyId === facultyId);

        //     if(objectExits) {
        //         return;
        //     }       

        //     setFacultySubjects(prev => ([
        //         ...prev,
        //         {
        //             facultyId,
        //             facultyName,
        //             superSubjectId,
        //             superSubjectName
        //         }
        //     ]))
            
        //     formik.setValues({
        //         ...formik.values,
        //         facultySubjects: [
        //             ...formik.values.facultySubjects,
        //             {
        //                 facultyId,
        //                 superSubjectId
        //             }
        //         ]
        //     })
        // }
        // setFacultyId('');
        // setFacultyName(null);
        // setSuperSubjectId(null);
        // setSuperSubjectName(null);
    }

    useEffect(() => {
        setFacultySubjects(formik.values.facultySubjects)
    },[loading])

    const handleDeleteFacultySubject = (facultyId: string, superSubjectId: string | null) => {
        // const newFacultySubjects = formik.values.facultySubjects.filter(item => {
        //     return (item.facultyId !== facultyId) 
        // })
        // const newFacultySubjectsForTable = facultySubjects?.filter(item => {
        //     return (item.facultyId !== facultyId) 
        // })
        // formik.setValues({
        //     ...formik.values,
        //     facultySubjects: newFacultySubjects
        // })
        // setFacultySubjects(newFacultySubjectsForTable)
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
                value={formik.values.descriptionAr as string} 
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
                value={formik.values.descriptionEn as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback> 
        </Form.Group> 
        <Form.Group className="mb-3">
            <Form.Label htmlFor="type">
                Subject Type:
            </Form.Label>
            <Form.Select
                size="lg"
                required
                id="subjectTypeId"
                name="subjectTypeId"
                value={formik.values.subjectTypeId as string} 
                onChange={formik.handleChange}>
                    <option key="no-value" value=""></option>
                {
                    subjectTypes?.data.map((subjectType: {id: string, name: string}) => 
                        <option key={subjectType.id} value={subjectType.id}>{subjectType.name}</option>
                    )
                }
            </Form.Select>            
            <Feedback type="invalid">
                {formik.errors.subjectTypeId as string}
            </Feedback>
        </Form.Group> 

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
                            setSuperSubjectName(e.target.options[e.target.selectedIndex].textContent)
                        }}>
                            <option key="no-value" value=""></option>
                        {
                            subjects?.data.map((subject: {id: string, name: string}) => 
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
        <Table<SpecialitySubject>  columns={columns} 
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
