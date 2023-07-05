import { ReactNode } from 'react';

const TableOptions = ({children}:{children: ReactNode}) => {
  return (
    <div className="d-flex align-items-center justify-content-end my-3 gap-2">
        {children}
    </div>
  )
}

export default TableOptions
