import { useFormik } from "formik";
import { useMemo, useState } from "react";
import { Row, Form, Col } from "react-bootstrap";
import { useQuery } from "react-query";
import Feedback from "../../components/feedback";
import PopUp from "../../components/popup";
import Table from "../../components/table"
import { PAGINATION_INFO } from "../../constants";
import { usePost } from "../../hooks";
import { get } from "../../http";
import { addUserValidation } from "../../schema/user";

const USERS_INITIAL_STATE = {
  data: {
      users: [],
      paginationInfo: PAGINATION_INFO
  }
}

const INITIAL_VALUES = {
    roleId: '',
    userName: '',
    firstName: '',
    lastName: '',
    email: '',
    password: "",
    phoneNumber: "",
    type: ""
  }

const UsersPage = () => {

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const { data, isLoading, isFetching, refetch } = useQuery(
                                            ['/User/GetAllUsers', page, pageSize], 
                                            () => get(`/User/GetAllUsers?page=${page}&pageSize=${pageSize}`),
                                            {
                                              // @ts-ignore
                                              initialData: USERS_INITIAL_STATE,
                                              keepPreviousData: true,
                                            });

  const columns = useMemo(
		() => [
      {
        Header: 'User Name',
        accessor: 'userName',
      },
      {
        Header: 'First Name',
        accessor: 'firstName',
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Phone Number',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Type',
        accessor: 'type',
      },
      {
        Header: 'Options',
        accessor: 'options',
      }
		],
		[]
	 )

  const users = useMemo(
    () => (data?.data.users),
    [data, isFetching, isLoading]
  );

  const [modalShow, setModalShow] = useState(false);

  const formik = useFormik({
      initialValues: INITIAL_VALUES,
      onSubmit: () => handleAddUser(),
      validationSchema: addUserValidation
  })
  
  const { mutateAsync , 
          isLoading: postLoaading, 
          isError, 
          error } = usePost('/User/PostUser', 
                                          formik.values);
  
    const handleAddUser = async () => {
  
      // Not Valid ... Do Nothing
      if(!formik.isValid) return;
  
      // If All Is Ok ... Do It
      if(formik.isValid) {
        try {
          const mutationReq = await mutateAsync();
        } catch(error) {
          return;
        }
      }
  }

  return  <>
          <Table  columns={columns} 
                  data={users} 
                  isBulk={true}
                  hasSort={true}
                  loading={isLoading || isFetching} 
                  pageNumber={page}
                  pageSize={pageSize}
                  setPage={setPage}
                  setPageSize={setPageSize}
                  pagination={data?.data.paginationInfo}
                  fetchData={refetch} 
                  renderTableOptions={() => {
                    return  <>
                                <button className="btn btn-falcon-success btn-sm" type="button" onClick={() => setModalShow(true)}>        
                                    <span className="fas fa-plus" data-fa-transform="shrink-3 down-2"></span>
                                    <span className="ms-1">New</span>
                                </button>
                            </>
                    }} />

                  <PopUp  title={'Add Role'}
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    confirmText="Add Role"
                    handleConfirm={formik.handleSubmit}>
                    <Form noValidate validated={formik.dirty}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                size="lg"
                                required
                                type="text" 
                                placeholder="User Name"
                                name="userName"
                                value={formik.values.userName} 
                                onChange={formik.handleChange} />
                            <Feedback type="invalid">
                                {formik.errors.userName}
                            </Feedback>
                        </Form.Group> 
                        <Row>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Control
                                  size="lg"
                                  required
                                  type="text" 
                                  placeholder="First Name"
                                  name="firstName"
                                  value={formik.values.firstName} 
                                  onChange={formik.handleChange} />
                              <Feedback type="invalid">
                                  {formik.errors.firstName}
                              </Feedback>
                            </Form.Group>
                          </Col>
                          <Col>
                            <Form.Group className="mb-3">
                              <Form.Control
                                  size="lg"
                                  required
                                  type="text" 
                                  placeholder="First Name"
                                  name="firstName"
                                  value={formik.values.firstName} 
                                  onChange={formik.handleChange} />
                              <Feedback type="invalid">
                                  {formik.errors.firstName}
                              </Feedback>
                            </Form.Group>
                          </Col>
                        </Row>  
                  </Form>
              </PopUp>
              </>
}

export default UsersPage
