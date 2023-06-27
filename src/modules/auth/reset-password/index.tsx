import { useFormik } from "formik";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Feedback from "../../../components/feedback";
import Button from "../../../components/button";
import { resetPasswordValidation } from "./schema";
import { httpClient } from "../../../hooks/useHTTP";
import { getAxiosError } from "../../../util";
import { useScreenLoader } from "../../../hooks/useScreenLoader";
import { useEffect } from "react";



const ResetPassword = () => {
    
    const navigate = useNavigate();
    const location = useLocation();

    // useEffect(() => {
    //     if(!location?.state?.userName) {
    //         return navigate('/sign-in',{
    //             replace: true
    //         })
    //     }    
    // },[])

    const { toggleScreenLoader } = useScreenLoader();

    const handleResetPassword = async () => {

        try {
            toggleScreenLoader();
            await httpClient.put('/User/ResetPassword', formik.values);  
            toast.success('An Email Has Been Sent With Your New Password');
            navigate('/sign-in',{
                state: {
                    userName: ''
                },
                replace: true
            })
            
        } catch(error) {
            toast.error(getAxiosError(error))
        }

        toggleScreenLoader();

    }

    const formik = useFormik({
        initialValues: {
            userName: '',
            code: '',
        },
        onSubmit: () => handleResetPassword(),
        validationSchema: resetPasswordValidation
    })

    return  <Container>

                <div className="vh-75 d-flex">
                    <Card className="w-75 d-block p-4 m-auto" style={{height: 'fit-content'}}>
                        <Row>
                            <Col xs={1}>
                                <Link to="/forget-password">
                                    <Button scope={""} className="mt-3 mb-3 btn-falcon-primary">
                                        <i className="fa fa-arrow-left"></i>
                                    </Button>
                                </Link>
                            </Col>
                            <Col>
                                <Form   noValidate 
                                    validated={formik.dirty} 
                                    autoComplete="off" 
                                    className="m-auto"
                                    onSubmit={e => {e.preventDefault(); formik.handleSubmit()}}>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="userName">
                                        Enter Your User Name:
                                    </Form.Label>
                                    <Form.Control
                                        size="lg"
                                        required
                                        type="text" 
                                        placeholder="User Name"
                                        name="userName"
                                        value={formik.values.userName} 
                                        onChange={formik.handleChange} />
                                    <Feedback type="invalid">
                                        {formik.errors.userName as string}
                                    </Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label htmlFor="userName">
                                        Enter Your Code:
                                    </Form.Label>
                                    <Form.Control
                                        size="lg"
                                        required
                                        type="text" 
                                        placeholder="User Name"
                                        name="code"
                                        value={formik.values.code} 
                                        onChange={formik.handleChange} />
                                    <Feedback type="invalid">
                                        {formik.errors.code as string}
                                    </Feedback>
                                </Form.Group>
                                <Button disabled={!formik.isValid || !formik.dirty} 
                                        className="btn-falcon-primary" 
                                        type="submit"
                                        scope={""}>Reset Password</Button>
                                </Form>
                            </Col>
                        </Row>    
                    </Card>
                </div>
            </Container>;
}
 
export default ResetPassword;