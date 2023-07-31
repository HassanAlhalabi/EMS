import { ChangeEvent, useState } from "react";

import { Form, Row, Col } from "react-bootstrap"
import { FormikProps } from "formik";
import { useQuery } from "react-query";
import Select from 'react-select';

import Feedback from "../../../../../components/feedback";
import CategoryBox from "../../../../../components/category-box";
import { useGet } from "../../../../../hooks";
import { BookCategory, NewBook } from "../../types";
import useTranslate from "../../../../../hooks/useTranslate";
import useFilesUpload from "../../../../../hooks/useFilesUpload";

type SelectedCategory = {id: string, name: string}

const BookForm = ({formik}:{formik: FormikProps<NewBook>}) => {

    const [selectedCategories, setSelectedCategories] = useState<SelectedCategory[]>([]);
    const get = useGet();
    const t = useTranslate();
    const {renderPreview: renderAttachmentPreview } = useFilesUpload({
        onUpload(files) {
            formik.setFieldValue('attachment' , files[0])
        },
        onFileRemove: () => {
            formik.setFieldValue('attachment' , null);
        }
    });
    const {renderPreview: renderCoverPreview } = useFilesUpload({
        onUpload(files) {
            formik.setFieldValue('cover', files[0]);
            formik.setFieldValue('updateImage',true);
            formik.setFieldValue('imagePath','');
        },
        onFileRemove: () => {
            formik.setFieldValue('cover' , null);
            formik.setFieldValue('updateImage',true);
            formik.setFieldValue('imagePath','')        }
    });

    const { data } = useQuery(
                        ['/Category/GetAllCategories', 1, 9999999], 
                        () => get(`/Category/GetAllCategories?page=1&pageSize=9999999`),
                        {
                            keepPreviousData: true,
                        });

  return (
    <Form noValidate validated={formik.dirty} autoComplete="off">
        <Row>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Control
                        size="lg"
                        required
                        type="text" 
                        placeholder={t('arabic_title')}
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
                        placeholder={t('english_title')}
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
                        placeholder={t('arabic_author_name')}
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
                        placeholder={t('english_author_name')}
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
                placeholder={t('arabic_description')}
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
                placeholder={t('english_description')}
                name="descriptionEn"
                value={formik.values.descriptionEn as string} 
                onChange={formik.handleChange} />
            <Feedback type="invalid">
                {formik.errors.descriptionEn as string}
            </Feedback> 
        </Form.Group> 
        <Form.Group className="mb-3">
            <Form.Label htmlFor="categoryIds">
                {t('select_book_categories')}
            </Form.Label>
            <Select 
                isMulti
                id="categoryIds"
                name='categoryIds'
                onChange={newOptions => formik.setFieldValue('categoryIds', newOptions)}
                value={formik.values.categoryIds}
                options={data?.data.categories.map((category: BookCategory) => ({
                    label: category.name,
                    value: category.id,
                }))}
                />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label htmlFor="attachment">
                {t('file_attachment')}:
            </Form.Label>
            { renderAttachmentPreview() }
            <Feedback type="invalid">
                {formik.errors.attachment as string}
            </Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label htmlFor="attachment">
                {t('cover')}:
            </Form.Label>
            { renderCoverPreview() }
            <Feedback type="invalid">
                {formik.errors.cover as string}
            </Feedback>
        </Form.Group>
    </Form>
  )
}

export default BookForm
