import { useMemo, useState } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../../components/popup";
import Table from "../../../../components/table"
import { ACTION_TYPES } from "../../../../constants";
import { useDelete, useGet, usePostFormData, usePutFormData } from "../../../../hooks";
import { bookCategoryValidation } from "../schema/book-category";
import { capitalize, getAxiosError } from "../../../../util";
import { useScreenLoader } from "../../../../hooks/useScreenLoader";
import { BookCategory, BookFullCategory, NewBookCategory } from "../types";
import CategoryForm from "./category-form";
import { useGetTableData } from '../../../../hooks/useGetTableData';
import { useGetDataById } from '../../../../hooks/useGetDataById';

const INITIAL_VALUES = {
    nameAr: '',
    nameEn: '',
    image: null,
    superCategoryId: ''
}

const CategoriesPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [action, setAction] = useState<string | null>(null);
    const [categoryId, setCategoryId] = useState<string | null>(null);
    const { toggleScreenLoader } = useScreenLoader();
    const get = useGet();

    const formik = useFormik<NewBookCategory>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleCategoryAction(),
		validationSchema: bookCategoryValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData('/Category/GetAllCategories', page, pageSize, searchKey)

    useGetDataById<BookFullCategory>('/Category/GetFullCategory', categoryId, {
        onRefetch: data => {
            data && formik.setValues({
                        ...data.data,
                        superCategoryId: data.data.superCategoryId ? data.data.superCategoryId : '',
                        updateImage: true
                    })
        }
    })
    
    const columns = useMemo(
        () => [
            {
                Header: 'Image',
                accessor: 'thumbnail',
            },
            {
                Header: 'Category Name',
                accessor: 'name',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const categories = useMemo(
        () => {
            if(data && data.data.categories) {
                return  data.data.categories
            }
            return [];
        },
        [data, isFetching, isLoading, page]
    );

    const { mutateAsync , 
            isLoading: postLoading } = action === ACTION_TYPES.add ? usePostFormData('/Category',formik.values) :
                                                        action === ACTION_TYPES.update ? 
                                                        usePutFormData('/Category', 
                                        {
                                            id: categoryId,
                                            ...formik.values
                                        }) : useDelete('/Category',categoryId as string);

    
      const handleCategoryAction = async () => {

        // Not Valid ... Do Nothing
        if(!formik.isValid && action !== ACTION_TYPES.delete) {
            formik.validateForm();
            return;
        }
    
        // If All Is Ok ... Do It
        if(formik.isValid) {
          try {
            toggleScreenLoader();
            await mutateAsync();
            refetch();
            toast.success(`${capitalize(action as string)} Category Done Successfully`)
            setAction(null);
			setCategoryId(null);
            formik.resetForm();
          } catch(error) {
            toast.error(getAxiosError(error))
          }
          toggleScreenLoader();
        }
    }

    return  <>
                <Table<BookCategory>  
                    columns={columns} 
                    hasSearch
                    data={categories} 
                    loading={isLoading || isFetching}
                    isBulk={false}
                    hasSort={false}
                    pageNumber={page}
                    pageSize={pageSize}
                    setPage={setPage}
                    setPageSize={setPageSize}
                    searchKey={searchKey}
                    setSearchKey={setSearchKey}
                    pagination={data?.data.paginationInfo}
                    renderTableOptions={() => {
                    return  <>
                                <button 	className="btn btn-falcon-success btn-sm" 
                                                        type="button" 
                                                        onClick={() => setAction(ACTION_TYPES.add)}>        
                                    <span className="fas fa-plus"></span>
                                    <span className="ms-1">New</span>
                                </button>
                            </>
                    }} 
                    renderRowActions={(data) => {
                        return  <>
                                    <button className="btn btn-falcon-info btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                    setAction(ACTION_TYPES.update)
                                                    setCategoryId(data.id);
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                    setAction(ACTION_TYPES.delete);
                                                    setCategoryId(data.id);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </>
                    }}
                />

                <PopUp  title={`${action && capitalize(action as string)} Category`}
								show={action !== null}
								onHide={() => { setAction(null), formik.resetForm(), setCategoryId(null) } }
								confirmText={`${action} Category`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleCategoryAction}
                                confirmButtonIsDisabled={action !== ACTION_TYPES.delete && (!formik.isValid || !formik.dirty)}
								actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <CategoryForm formik={formik} />
                                }
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Category</>
                        }
                </PopUp>

            </>

}

export default CategoriesPage
