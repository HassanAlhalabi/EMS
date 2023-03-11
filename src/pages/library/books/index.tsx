import { useFormik } from "formik";
import { useMemo, useState, useEffect, ChangeEvent } from 'react';
import { useQuery } from "react-query";
import PopUp from "../../../components/popup";
import Table from "../../../components/table"
import { ACTION_TYPES } from "../../../constants";
import { useDelete, usePostFormData, usePut, usePutFormData } from "../../../hooks";
import { get } from "../../../http";
import { toast } from "react-toastify";
import { capitalize, getAxiosError } from "../../../util";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { Book } from "../../../types/books";
import { bookValidation } from "../../../schema/book";
import BookForm from "./book-form";
import SwitchInput from "../../../components/switch-input/index.";

const INITIAL_VALUES = {
    NameAr: '',
    NameEn: '',
    AuthorNameAr: '',
    AuthorNameEn: '',
    DescriptionAr: '',
    DescriptionEn: '',
    Cover: '',
    CategoryId: []
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
                                keepPreviousData: true,
                            });

    const { data: book, 
            isLoading: loadingBook, 
            isFetching: fetchingBook,
            refetch: refetchBook,
			 } = useQuery<Book>(
                        ['/Book/GetFullBook', bookId], 
                        () => get(`/Book/GetFullBook/${bookId}`),
                        {
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
        if(bookId && action === ACTION_TYPES.toggle) {
            handleBookAction();
          }
		() => setBookId(null);
	},[bookId])
    
    const columns = useMemo(
        () => [
            {
                Header: 'Cover'    ,
                accessor: 'image',
            },
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
                return  data.data.books.map((book: Book) => ({
                    ...book,
                    image: book.cover
                }))
            }
            return [];
        },
        [data, isFetching, isLoading, page]
    );

    const { mutateAsync , 
            isLoading: postLoading, 
            isError, error } = action === ACTION_TYPES.add ? usePostFormData('/Book', 
                                        formik.values) :
                                                        action === ACTION_TYPES.update ? 
                                                        usePutFormData('/Book', 
                                        {
                                            id: bookId,
                                            ...formik.values
                                        }) : action === ACTION_TYPES.delete ? 
                                                useDelete('/Book',bookId as string) :
                                                usePut(`/Book/ToggleActivation/${bookId}`);

    
    const handleToggleBook= async (e: ChangeEvent<HTMLInputElement>) => {
        setAction(ACTION_TYPES.toggle);
        setBookId(e.target.value);
    }

    console.log(formik.values.Cover)

      const handleBookAction = async () => {

        // Not Valid ... Do Nothing
        if((!formik.isValid) && action !== ACTION_TYPES.delete) {
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
                        return  <div className="d-flex justify-content-center align-items-center">
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
                                    <SwitchInput 
                                        checked={data?.isActive} 
                                        value={data?.id} 
                                        onChange={handleToggleBook} />
                                </div>
                    }}
                />

                <PopUp  title={`${action && capitalize(action as string)} Book`}
								show={action !== null && action !== ACTION_TYPES.toggle}
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
