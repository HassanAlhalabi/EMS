import { useMemo, useState } from "react";

import { FormikProps } from "formik";
import { useQuery } from "react-query";
import { Typeahead } from "react-bootstrap-typeahead";
import { Form, Row, Col } from "react-bootstrap"

import Feedback from "../../../../components/feedback"
import { mapToTyphead } from "../../../../util";
import SwitchInput from "../../../../components/switch-input/index.";
import Table from "../../../../components/table";
import { NewSubjectSuggestion } from "../../../../types/suggested-subjects";
import { SelectedOption } from "../../../../types";
import { useGet } from "../../../../hooks";

const SubjectSuggestionForm = ({formik}:{formik: FormikProps<NewSubjectSuggestion>}) => {

    const get = useGet();

    const { data: subjects } = useQuery(
        ['/Subject/GetDropDownSubjects'], 
    () => get(`/Subject/GetDropDownSubjects`));

    const [selectedSubjects, setSelectedSubjects] = useState<Record<string, any>[]>([]);

   const handleSelectSubject = (selectedSubject: Record<string, any>[]) => {
    
        if(selectedSubject.length === 0) return;

        // Check If Object Already Exists
        const objectExits = selectedSubjects.find((item) => item.id === selectedSubject[0].id);

        if(objectExits) return;      

        setSelectedSubjects(prev => ([
            ...prev,
            selectedSubject[0]
        ]))
        
        formik.setValues({
            ...formik.values,
            subjectIds: [
                ...formik.values.subjectIds,
                selectedSubject[0].id
            ]
        })

    }
    

    const handleDeleteSubject = (subjectId: string) => {
        const newSubjects = formik.values.subjectIds.filter(item => {
            return (item !== subjectId) 
        })
        const newSubjectsForTable = selectedSubjects?.filter(item => {
            return (item.id !== subjectId) 
        })
        formik.setValues({
            ...formik.values,
            subjectIds: newSubjects
        })
        setSelectedSubjects(newSubjectsForTable)
    }

   const columns = useMemo(
    () => [
        {
            Header: 'Subject Name',
            accessor: 'name',
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
                    <Form.Label>
                        Choose Subjects:
                    </Form.Label>
                    <Typeahead
                        id="subjectIds"
                        size="lg"
                        className={formik.values.subjectIds.length !== 0 && formik.dirty ? 'is-valid': 'is-invalid'}
                        placeholder='Search Subjects'
                        onChange={(options) => handleSelectSubject(options as Record<string, any>[])}
                        options={subjects ? mapToTyphead(subjects.data) : []}
                        isInvalid={formik.values.subjectIds.length === 0 && formik.dirty}
                        isValid={formik.values.subjectIds.length !== 0 && formik.dirty}
                    />
                    <Feedback type="invalid">
                        {formik.errors.subjectIds as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label>
                        Is Senior Student:
                    </Form.Label>
                    <SwitchInput onChange={formik.handleChange} name='isSeniorStudent' />
                </Form.Group>
            </Col>
        </Row>
        <Table<Record<string, any>>  
            columns={columns} 
            data={selectedSubjects}
            renderRowActions={data =>  <button className="btn btn-falcon-danger btn-sm m-1" 
            type="button" 
            onClick={() => handleDeleteSubject(data.id)}>        
                    <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                </button>}  />
    </Form>
  )
}

export default SubjectSuggestionForm
