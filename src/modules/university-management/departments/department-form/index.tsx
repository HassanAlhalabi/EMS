import { useState, useMemo } from 'react';

import { FormikProps } from "formik";
import { Form, Row, Col } from "react-bootstrap";
import Select from 'react-select';

import Feedback from "../../../../components/feedback";
import { NewDepartment } from "../types";
import useGetDropdownFaculties from '../../../../hooks/useGetDropdownFaculties';
import useGetDropdownUsers from '../../../../hooks/useGetDropdownUsers';
import { Typeahead } from 'react-bootstrap-typeahead';
import Table from '../../../../components/table';
import { mapToTyphead } from '../../../../util';

const DepartmentForm = ({formik}:{formik: FormikProps<NewDepartment>}) => {

    const { data: faculties } = useGetDropdownFaculties();

    const { data: usersRes } = useGetDropdownUsers('Employee');

    const [allSelectedUsers, setAllSelectedUsers] = useState<Record<string, any>[]>([]);

    const handleSelectUser = (selectedUser: Record<string, any>[]) => {
 
         if(selectedUser.length === 0) return;
         
         // Check If Object Already Exists
         const objectExits = allSelectedUsers.find(item => item.id === selectedUser[0].id);
 
         if(objectExits) return;  
         
         setAllSelectedUsers([
             ...allSelectedUsers,
             selectedUser[0]
         ])
         
         formik.setValues({
             ...formik.values,
             usersIds: [
                 ...formik.values.usersIds,
                 selectedUser[0].id
             ]
         })
     }
     
 
     const handleDeleteUser = (userId: string) => {
         const newSubjects = formik.values?.usersIds?.filter(item => {
             return (item !== userId) 
         });
         const newSubjectsForTable = allSelectedUsers?.filter(item => {
             return (item.id !== userId) 
         });
         formik.setValues({
             ...formik.values,
             usersIds: newSubjects
         });
         setAllSelectedUsers(newSubjectsForTable);
     }

     const columns = useMemo(
        () => [
            {
                Header: 'Full Name',
                accessor: 'fullName',
            },
            {
                Header: 'User Name',
                accessor: 'userName',
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
            <Form.Label htmlFor="facultiesIds">
                Faculties:
            </Form.Label>
            <Select 
                id="facultiesIds"
                isMulti
                name='facultiesIds'
                onChange={newOptions => formik.setFieldValue('facultiesIds', newOptions)}
                value={formik.values.facultiesIds}
                options={faculties?.data.map((faculty: {id: string, name: string}) => ({ 
                    id: faculty.id,
                    label: faculty.name,
                }))} />  
                <Feedback type="invalid">
                    {formik.errors?.facultiesIds}
                </Feedback>         
        </Form.Group>
        <Row>
            <Form.Group className="mb-3">
                <Form.Label htmlFor='usersIds'>
                    Add Users:
                </Form.Label>
                <Typeahead
                    id="usersIds"
                    size="lg"
                    placeholder='Search Users'
                    onChange={(options) => handleSelectUser(options as Record<string, any>[])}
                    options={usersRes?.data ? mapToTyphead(usersRes.data,'fullName', item => `${item.userName} - ${item.fullName}`) : []}
                />
                <Feedback type="invalid">
                    {formik.errors.usersIds as string}
                </Feedback>
            </Form.Group> 
        </Row> 
        <Table<Record<string, any>>  
            columns={columns} 
            data={allSelectedUsers}
            renderRowActions={data =>  <button className="btn btn-falcon-danger btn-sm m-1" 
            type="button" 
            onClick={() => handleDeleteUser(data.id)}>        
                    <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                </button>}  />
    </Form>
  )
}

export default DepartmentForm
