import { useFormik } from "formik";
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from "react-query";
import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, usePost, usePostFormData, usePut } from "../../../hooks";
import { get } from "../../../http";
import { bookCategoryValidation } from "../../../schema/book/book-category";
import { toast } from "react-toastify";
import { capitalize, getAxiosError } from "../../../util";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { BookCategory, NewBookCategory } from "../../../types/books";
import CategoryForm from "./category-form";

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

    const formik = useFormik<NewBookCategory>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleCategoryAction(),
		validationSchema: bookCategoryValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useQuery(
                            ['/Category/GetAllCategories', page, pageSize], 
                            () => get(`/Category/GetAllCategories?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                            {
                                keepPreviousData: true,
                            });

    const { data: category, 
				isLoading: loadingCategory, 
				isFetching: fetchingCategory,
				refetch: refetchCategory,
			 } = useQuery(
                        ['/Category/GetFullCategory', categoryId], 
                        () => get(`/Category/GetFullCategory/${categoryId}`),
                        {
                            enabled: false,   
                            onSuccess: data => {
                                formik.setValues(data.data)
                            }             
			            });

    useEffect(() => {
        let searchTimeout: number; 
        if(searchKey) {
            searchTimeout = setTimeout(() => {
            refetch();
            },600);
            return () => clearTimeout(searchTimeout);;
        }
        refetch();
        return () => clearTimeout(searchTimeout);
        },[page,pageSize,searchKey])
				
	useEffect(() => {
		if(categoryId && action === ACTION_TYPES.update) {
			refetchCategory();
		}
		() => setCategoryId(null);
	},[categoryId])
    
    const columns = useMemo(
        () => [
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
            isLoading: postLoading, 
            isError, error } = action === ACTION_TYPES.add ? usePostFormData('/Category',formik.values) :
                                                        action === ACTION_TYPES.update ? 
                                                        usePut('/Category', 
                                        {
                                            id: categoryId,
                                            ...formik.values
                                        }) : useDelete('/Category',categoryId as string);

    
      const handleCategoryAction = async () => {

        // Not Valid ... Do Nothing
        if(!formik.isValid && action !== ACTION_TYPES.delete) {
            formik.validateForm();
            return;
        };
    
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
