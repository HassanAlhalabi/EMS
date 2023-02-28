import { Form } from "react-bootstrap"
import { ChangeEvent } from 'react';

interface ITableSearch {
    searchKey: string,
    handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const TableSearch = ({
    searchKey,
    handleSearchChange
}: ITableSearch) => {
  return (
    <div>
      <Form.Control 
        type="search" 
        name="search" 
        className="ms-1 me-1" 
        placeholder="Search..."
        value={searchKey}
        onChange={handleSearchChange} />
    </div>
  )
}

export default TableSearch
