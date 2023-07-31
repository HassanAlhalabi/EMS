import { Form } from "react-bootstrap"
import { ChangeEvent } from 'react';
import useTranslate from "../../../hooks/useTranslate";

interface ITableSearch {
    searchKey: string,
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TableSearch = ({
    searchKey,
    handleSearchChange
}: ITableSearch) => {
  
  const t = useTranslate();

  return (
    <div>
      <Form.Control 
        type="search" 
        name="search" 
        className="ms-1 me-1 fit-content" 
        placeholder={`${t('search')}...`}
        value={searchKey}
        onChange={handleSearchChange}
        style={{maxWidth: 'fit-content'}} />
    </div>
  )
}

export default TableSearch
