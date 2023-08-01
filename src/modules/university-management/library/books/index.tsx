import { useMemo, useState, useEffect, ChangeEvent } from 'react';

import { useFormik } from "formik";
import { toast } from "react-toastify";

import PopUp from "../../../../components/popup";
import Table from "../../../../components/table"
import { ACTION_TYPES } from "../../../../constants";
import { capitalize, getAxiosError } from "../../../../util";
import { useScreenLoader } from "../../../../hooks/useScreenLoader";
import { Book, FullBook, NewBook } from "../types";
import { bookValidation } from "../schema";
import BookForm from "./book-form";
import SwitchInput from "../../../../components/switch-input/index.";
import { useDelete, usePostFormData, usePut, usePutFormData } from "../../../../hooks";
import { useGetTableData } from '../../../../hooks/useGetTableData';
import { useGetDataById } from '../../../../hooks/useGetDataById';
import useTranslate, { TranslateKey } from '../../../../hooks/useTranslate';

const INITIAL_VALUES = {
    nameAr: '',
    nameEn: '',
    authorNameAr: '',
    authorNameEn: '',
    descriptionAr: '',
    descriptionEn: '',
    cover: null,
    categoryIds: [],
    attachment: null,
    imagePath: ''
}

const BooksPage = () => {

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(15);
    const [searchKey, setSearchKey] = useState('');
    const [action, setAction] = useState<string | null>(null);
    const [bookId, setBookId] = useState<string | null>(null);
    const { toggleScreenLoader } = useScreenLoader();
    const t = useTranslate();

    const formik = useFormik<NewBook>({
		initialValues: INITIAL_VALUES,
		onSubmit: () => handleBookAction(),
		validationSchema: bookValidation
	})

    const { data, 
            isLoading, 
            isFetching,
            refetch } = useGetTableData<{books: Book[]}>('/Book/GetAllBooks', page, pageSize, searchKey)

    const { refetch: refetchBook } = useGetDataById<FullBook>('/Book/GetFullBook', bookId, {
        onRefetch: data => {
            data && formik.setValues({
                ...data.data,
                updateImage: true,
                imagePath: data.data.thumbnail || '',
                categoryIds: data.data.categories.map(category => ({
                    label: category.name,
                    value: category.id
                })),
            })
        }
    })        
				
	useEffect(() => {
        if(bookId && action === ACTION_TYPES.toggle) {
            handleBookAction();
        }
	},[bookId]);
    
    const columns = useMemo(
        () => [
            {
                Header: t('cover')    ,
                accessor: 'thumbnail',
            },
            {
                Header: t('book_title'),
                accessor: 'name',
            },
            {
                Header: t('author'),
                accessor: 'authorName',
            },
            {
                Header: t('options'),
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
                                            {
                                                ...formik.values,
                                                categoryIds: formik.values.categoryIds.map((category) => (category as unknown as {value: string}).value)
                                            }) :
                                                action === ACTION_TYPES.update ? 
                                                usePutFormData('/Book', 
                                        {
                                            id: bookId,
                                            ...formik.values,
                                            categoryIds: formik.values.categoryIds.map((category) => (category as unknown as {value: string}).value)
                                        }) : action === ACTION_TYPES.delete ? 
                                                useDelete('/Book',bookId as string) :
                                                usePut(`/Book/ToggleActivation/${bookId}`);

    
    const handleToggleBook= async (e: ChangeEvent<HTMLInputElement>) => {
        setAction(ACTION_TYPES.toggle);
        setBookId(e.target.value);
    }

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
            refetchBook();
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
                                    <span className="ms-1">{t('new')}</span>
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

                <PopUp  title={`${t(action as TranslateKey)} ${t('book')}`}
								show={action !== null && action !== ACTION_TYPES.toggle}
								onHide={() => { setAction(null), formik.resetForm(), setBookId(null) } }
								confirmText={`${t(action as TranslateKey)} ${t('book')}`}
								confirmButtonVariant={
									action === ACTION_TYPES.delete ? 'danger' : "primary"
								}
								handleConfirm={handleBookAction}
								actionLoading={postLoading}
                                confirmButtonIsDisabled={(!formik.isValid || !formik.dirty) && action !== ACTION_TYPES.delete}
                    >
                        {(  action === ACTION_TYPES.add || 
                            action === ACTION_TYPES.update)
                                && <BookForm formik={formik} />}
                        {action === ACTION_TYPES.delete && 
                                    <>{t('delete_confirmation')}</>
                        }
                </PopUp>

            </>

}

export default BooksPage
