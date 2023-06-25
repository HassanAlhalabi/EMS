import { ChangeEvent, useState } from "react";

import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";
import { useQuery } from "react-query";

import Feedback from "../../../../../components/feedback";
import CategoryBox from "../../../../../components/category-box";
import ImageUpload from "../../../../../components/image-upload";
import { useGet } from "../../../../../hooks";
import { BookCategory, NewBook } from "../../types";

type SelectedCategory = {id: string, name: string}

const BookForm = ({formik}:{formik: FormikProps<NewBook>}) => {

    const [selectedCategories, setSelectedCategories] = useState<SelectedCategory[]>([]);
    const get = useGet();

    const handleCategorySelect = (event: ChangeEvent<HTMLSelectElement>) => {
        
        const { target: { value } }  = event  
        
        if(!value) return;

        const categoryExists = selectedCategories.find(cat => cat.id === value);
        if(categoryExists) return;

        formik.setFieldValue('categoryId',[...formik.values.categoryId, value])
        setSelectedCategories((prev) => {
            return [...prev, 
                    {   
                        id: value,
                        name: event.target.options[event.target.selectedIndex].textContent as string,
                    }]
        })

        event.target.value = ''

    }

    const handleRemoveCategory = (categoryId: string) => {
        setSelectedCategories(prev => {
            return [...prev.filter(cat => cat.id !== categoryId)]
        })
        formik.setFieldValue('categoryId',[...formik.values.categoryId.filter(cat => cat !== categoryId)])
    }

    const { data } = useQuery(
                        ['/Category/GetAllCategories', 1, 9999999], 
                        () => get(`/Category/GetAllCategories?page=1&pageSize=9999999`),
                        {
                            keepPreviousData: true,
                        });

    const handleBookAttachmentFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
        if(event?.target?.files) {
            formik.setFieldValue('attachment' , event.target.files[0])
        }
    }

    
    const handleSelectImage = (image: File | null) => {
        formik.setFieldValue('cover',image);
        formik.setFieldValue('updateImage',true);
        formik.setFieldValue('imagePath','');
    } 

    const handleDeletePreviewImage = () => {
        formik.setFieldValue('updateImage',true);
        formik.setFieldValue('imagePath','')
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
                        placeholder="Arabic Title"
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
                        placeholder="English Title"
                        name="nameEn"
                        value={formik.values.nameEn} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.nameEn as string}
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
                        type="text" 
                        placeholder="Arabic Author Name"
                        name="authorNameAr"
                        value={formik.values.authorNameAr} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.authorNameAr as string}
                    </Feedback>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder="English Author Name"
                        name="authorNameEn"
                        value={formik.values.authorNameEn} 
                        onChange={formik.handleChange} />
                    <Feedback type="invalid">
                        {formik.errors.authorNameEn as string}
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
            <Form.Label htmlFor="CategoryId">
                Select Book Categories
            </Form.Label>
            <Form.Select
                size="lg"
                id="categoryId"
                placeholder="Book Categories"
                name="categoryId"
                onChange={handleCategorySelect}>
                    <option key="no-value" value=""></option>
                        {
                            data?.data.categories.map((category: BookCategory) => 
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )
                        }
                </Form.Select>
            <Feedback type="invalid">
                {formik.errors.categoryId as string}
            </Feedback> 
        </Form.Group>
        <div className="mb-4">
            {
                selectedCategories.map((category: SelectedCategory) => {
                    return  <CategoryBox key={category.id} pill>
                                {category.name} 
                                <span className="fa fa-trash fa-sm text-danger cursor-pointer ms-2 ps-2" 
                                        onClick={() => handleRemoveCategory(category.id)}
                                ></span> 
                            </CategoryBox>
                })
            }
        </div>
        <Form.Group className="mb-3">
            <Form.Label htmlFor="attachment">
                File Attachment
            </Form.Label>
            <Form.Control
                size="lg"
                required
                type="file" 
                id="attachment"
                placeholder="Book File"
                name="attachment"
                onChange={handleBookAttachmentFieldChange} />
            <Feedback type="invalid">
                {formik.errors.attachment as string}
            </Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <ImageUpload    setSelectedImage={handleSelectImage} 
                            previewImage={formik.values?.imagePath}
                            handleDeletePreviewImage={handleDeletePreviewImage} />
            <Feedback type="invalid">
                {formik.errors.cover as string}
            </Feedback>
        </Form.Group>
    </Form>
  )
}

export default BookForm
