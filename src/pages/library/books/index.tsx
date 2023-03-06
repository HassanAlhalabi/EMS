import { useFormik } from "formik";
import { useMemo, useState, useEffect } from 'react';
import { useQuery } from "react-query";
import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, usePost, usePut } from "../../../hooks";
import { get } from "../../../http";
import { toast } from "react-toastify";
import { capitalize, getAxiosError } from "../../../util";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { Book } from "../../../types/books";
import { bookValidation } from "../../../schema/book";
import BookForm from "./book-form";

const INITIAL_VALUES = {
    nameAr: '',
    nameEn: '',
    authorNameAr: '',
    authorNameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    cover: '',
    categories: []
}

const BooksPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [action, setAction] = useState<string | null>(null);
    const [bookId, setBookId] = useState<string | null>(null);
    const { toggleScreenLoader } = useScreenLoader();

    const formik = useFormik({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleBookAction(),
		validationSchema: bookValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useQuery(
                            ['/Book/GetAllBooks', page, pageSize], 
                            () => get(`/Book/GetAllBooks?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                            {
                                // @ts-ignore
                                keepPreviousData: true,
                            });

    const { data: book, 
				isLoading: loadingBook, 
				isFetching: fetchingBook,
				refetch: refetchBook,
			 } = useQuery(
                        ['/Book/GetBook', bookId], 
                        () => get(`/Book/GetBook/${bookId}`),
                        {
                            // @ts-ignore
                            enabled: false,   
                            onSuccess: data => {}              
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
		if(bookId && action === ACTION_TYPES.update) {
			refetchBook();
		}
		() => setBookId(null);
	},[bookId])
    
    const columns = useMemo(
        () => [
            {
                Header: 'Book Title',
                accessor: 'name',
            },
            {
                Header: 'Author',
                accessor: 'authorName',
            },
            {
                Header: 'Options',
                accessor: 'options',
            }
        ],
        []
    )

    const books = useMemo(
        () => {
            if(data && data.data.books) {
                return  data.data.books
            }
            return [];
        },
        [data, isFetching, isLoading, page]
    );

    const { mutateAsync , 
            isLoading: postLoading, 
            isError, error } = action === ACTION_TYPES.add ? usePost('/Book', 
                                        formik.values) :
                                                        action === ACTION_TYPES.update ? 
                                                        usePut('/Book', 
                                        {
                                            id: bookId,
                                            ...formik.values
                                        }) : useDelete('/Book',bookId as string);

    
      const handleBookAction = async () => {

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
            toast.success(`${capitalize(action as string)} Book Done Successfully`)
            setAction(null);
			setBookId(null);
            formik.resetForm();
          } catch(error) {
            toast.error(getAxiosError(error))
          }
          toggleScreenLoader();
        }
    }

    return  <>
                <Table<Book>  
                    columns={columns} 
                    hasSearch
                    data={books} 
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
                                                    setBookId(data.id);
                                            }}>        
                                        <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                    <button className="btn btn-falcon-danger btn-sm m-1" 
                                            type="button" 
                                            onClick={() => {
                                                    setAction(ACTION_TYPES.delete);
                                                    setBookId(data.id);
                                            }}>        
                                        <span className="fas fa-trash" data-fa-transform="shrink-3 down-2"></span>
                                    </button>
                                </>
                    }}
                />

                <PopUp  title={`${action && capitalize(action as string)} Book`}
								show={action !== null}
								onHide={() => { setAction(null), formik.resetForm(), setBookId(null) } }
								confirmText={`${action} Book`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleBookAction}
								actionLoading={postLoading}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <BookForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>Are you Sure You Want to Delete This Book</>
                        }
                </PopUp>

            </>

}

export default BooksPage
