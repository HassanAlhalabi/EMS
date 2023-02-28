import { useEffect, useMemo, useState } from 'react';

import { useQuery } from "react-query";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import SwitchInput from "../../components/switch-input/index.";

import Table from "../../components/table"
import {  usePut } from "../../hooks";
import { useScreenLoader } from "../../hooks/useScreenLoader";
import { get } from "../../http";
import { Faculty } from "../../types/faculties";
import {  getAxiosError } from "../../util";


const FacultiesPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [searchKey, setSearchKey] = useState<string>('');
  const [facultyId, setFacultyId] = useState(null);
  const { toggleScreenLoader } = useScreenLoader();

  const { data, 
          status,
          isLoading, 
          isFetching, 
          refetch } = useQuery(
                                ['/Faculty/GetAllFaculties', page, pageSize, searchKey], 
                                () => get(`/Faculty/GetAllFaculties?page=${page}&pageSize=${pageSize}&key=${searchKey}`),
                                {
                                  keepPreviousData: true,
                                  enabled: false
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

  const columns = useMemo(
		() => [
      {
        Header: 'Faculty Name',
        accessor: 'facultyName',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Options',
        accessor: 'options',
      }
		],
		[]
	 )

  const facultys = useMemo(
    () => (isLoading || status === 'idle') ? [] : (data?.data.facultyResponses),
    [data, isFetching, isLoading]
  );

  const reset = () => setFacultyId(null)

  const { mutateAsync , 
          isLoading: postLoading
        } = usePut(`/Faculty/ToggleActivation/${facultyId}`);

  const handleFacultyToggle = async () => {
      try {
        toggleScreenLoader();
        await mutateAsync();
        refetch();
        toast.success(`Activate Faculty Done Successfully`)
        reset();
      } catch(error) {
        toast.error(getAxiosError(error))
      }

  }


  return  <>
            <Table<Faculty>  
              columns={columns} 
              data={facultys} 
              isBulk
              hasSort
              hasSearch
              loading={isLoading} 
              pageNumber={page}
              pageSize={pageSize}
              setPage={setPage}
              setPageSize={setPageSize}
              pagination={data?.data.paginationInfo}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              fetchData={refetch} 
              renderTableOptions={() => {
                                    return  <Link to="/faculty-form" className="btn btn-falcon-success btn-sm" 
                                              type="button">        
                                                <span className="fas fa-plus"></span>
                                                <span className="ms-1">New</span>
                                            </Link>
                                           
                                    }} 
              renderRowActions={(faculty) => {
                  return  <div className="d-flex align-items-center">
                            <button className="btn btn-falcon-info btn-sm m-1" 
                                    type="button" 
                                    onClick={() => {}}>        
                                <span className="fas fa-edit" data-fa-transform="shrink-3 down-2"></span>
                            </button>
                            <SwitchInput 
                              checked={faculty.isActive} 
                              value={faculty.id} 
                              onChange={handleFacultyToggle} />
                          </div>
              }}/>

              </>
}

export default FacultiesPage
