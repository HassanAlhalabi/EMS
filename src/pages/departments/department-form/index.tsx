import { Form, Row, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback"
import { useQuery } from 'react-query';
import { get } from "../../../http";
import { FormikProps } from "formik";
import { NewDepartment } from "../../../types/departments";
import { ChangeEvent, useState, SetStateAction, useEffect } from 'react';
import CategoryBox from "../../../components/category-box";

type selectedDepartment = {
    id: string,
    name: string
}

const DepartmentForm = ({formik}:{formik: FormikProps<NewDepartment>}) => {

    const [selectedFaculties, setSelectedFaculties] = useState<selectedDepartment[]>([]);

    useEffect(() => {
        setSelectedFaculties((prev) =>   
            formik.values.faculties ? 
            formik.values.faculties.map(faculty =>( {
                id: faculty.id,
                name: faculty.name
            })) : [])
        
    },[formik.values.faculties])

    const { data: faculties } = useQuery(
        ['/Faculty/GetDropDownFaculties'], 
    () => get(`/Faculty/GetDropDownFaculties`));

    const handleAddFaculty = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSelectedFaculties = [
            ...selectedFaculties,
            {
                id: event.target.value,
                name: event.target.options[event.target.selectedIndex].textContent as string
            }
        ]
        setSelectedFaculties(newSelectedFaculties)
        formik.setFieldValue('facultiesIds',[...(formik.values.facultiesIds as string[]), event.target.value])
    }

    const handleRemoveCategory = (facultyId: string) => {
        setSelectedFaculties(prev => {
            return [...prev.filter(faculty => faculty.id !== facultyId)]
        })
        formik.setFieldValue('facultiesIds',[...(formik.values.facultiesIds as string[]).filter(faculty => faculty !== facultyId)])
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
                Faculties:
            </Form.Label>
            <Form.Select
                size="lg"
                id=""
                name="facultiesIds" 
                onChange={handleAddFaculty}>
                    <option key="no-value" value=""></option>
                {
                    faculties?.data.map((faculty: {id: string, name: string}) => 
                        <option key={faculty.id} value={faculty.id}>{faculty.name}</option>
                    )
                }
            </Form.Select>            
        </Form.Group>
        <div className="mb-4">
            {
                selectedFaculties.map((faculty: selectedDepartment) => {
                    return  <CategoryBox key={faculty.id} pill>
                                {faculty.name} 
                                <span className="fa fa-trash fa-sm text-danger cursor-pointer ms-2 ps-2" 
                                        onClick={() => handleRemoveCategory(faculty.id)}
                                ></span> 
                            </CategoryBox>
                })
            }
        </div>
    </Form>
  )
}

export default DepartmentForm
