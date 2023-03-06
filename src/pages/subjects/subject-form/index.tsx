import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { useQuery } from 'react-query';
import { get } from "../../../http";
import { FormikProps } from "formik";
import { NewSubject, SubjectType } from "../../../types/subjects";
import { Faculty } from "../../../types/faculties";
import { useState, ChangeEvent } from 'react';

const SubjectForm = ({formik}:{formik: FormikProps<NewSubject>}) => {

    const [facultyId, setFacultyId] = useState<string | null>(null);
    const [subjectId, setSubjectId] = useState<string | null>(null);

    const { data: faculties } = useQuery(
                            ['/Faculty/GetDropDownFaculties'], 
                        () => get(`/Faculty/GetDropDownFaculties`));

    const { data: subjects } = useQuery(
                            ['/Subject/GetDropDownSubjects', facultyId ], 
                        () => get(`/Subject/GetDropDownSubjects?FacultyId=${facultyId}`),{
                            enabled: false
                        });

    const { data: subjectTypes } = useQuery(
                            ['/SubjectType/GetDropDownSubjectTypes'], 
                        () => get(`/SubjectType/GetDropDownSubjectTypes`));

        const handleAddFacultySubject = () => {

        }

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
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="type">
                        Faculties:
                    </Form.Label>
                    <Form.Select
                        size="lg"
                        id=""
                        name="facultyId"
                        value={facultyId} 
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setFacultyId(e.target.value)}>
                            <option key="no-value" value=""></option>
                        {
                            faculties?.data.map((faculty: {id: string, name: string}) => 
                                <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                            )
                        }
                    </Form.Select>            
                    <Feedback type="invalid">
                        {formik.errors.facultiesIds}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="superSubjectId">
                        Pre-request Subject:             
                    </Form.Label>
                    <Form.Select
                        size="lg"
                        id="superSubjectId"
                        name="superSubjectId"
                        value={subjectId} 
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => setFacultyId(e.target.value)}>
                            <option key="no-value" value=""></option>
                        {
                            subjects?.data.map((subject: {id: string, name: string}) => 
                                <option key={subject.id} value={subject.id}>{subject.name}</option>
                            )
                        }
                    </Form.Select>            
                    <Feedback type="invalid">
                        {formik.errors.superSubjectId as string}
                    </Feedback>
                </Form.Group>
            </Col>
        </Row>
        <button className="btn btn-success">
                Add Faculty Pre-Requested Subject <i className="fa fa-plus"></i>
        </button>
    </Form>
  )
}

export default SubjectForm
