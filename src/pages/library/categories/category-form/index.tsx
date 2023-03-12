import { Form, Row, Col, Image } from "react-bootstrap"
import { FormikProps } from "formik";
import { BookCategory, NewBookCategory } from "../../../../types/books";
import Feedback from "../../../../components/feedback";
import { useQuery } from "react-query";
import { get } from "../../../../http";
import ImageUpload from "../../../../components/image-upload";
const CategoryForm = ({formik}:{formik: FormikProps<NewBookCategory>}) => {

    const { data } = useQuery(
        ['/Category/GetAllCategories', 1, 9999999], 
        () => get(`/Category/GetAllCategories?page=1&pageSize=9999999`),
        {
            keepPreviousData: true,
    });

    const handleSelectImage = (image: File) => formik.setFieldValue('image',image)

    const handleDeletePreviewImage = () => formik.setFieldValue('imagePath','')

    console.log(formik.values.image)

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
        <Form.Group className="mb-3">
            <Form.Label htmlFor="CategoryId">
                Select Parent Category
            </Form.Label>
            <Form.Select
                size="lg"
                id="superCategoryId"
                placeholder="Parent Category"
                name="superCategoryId"
                value={formik.values.superCategoryId}
                onChange={formik.handleChange}>
                    <option key="no-value" value=""></option>
                    {
                        data?.data.categories.map((category: BookCategory) => 
                            <option key={category.id} value={category.id}>{category.name}</option>
                        )
                    }
                </Form.Select>
            <Feedback type="invalid">
                {formik.errors.superCategoryId as string}
            </Feedback> 
        </Form.Group>
        <Form.Group className="mb-3">
            <ImageUpload    setSelectedImage={handleSelectImage} 
                            previewImage={formik.values?.imagePath}
                            handleDeletePreviewImage={handleDeletePreviewImage} />
            <Feedback type="invalid">
                {formik.errors.image as string}
            </Feedback>
        </Form.Group>
    </Form>
  )
}

export default CategoryForm
