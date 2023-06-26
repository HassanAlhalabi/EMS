import { useFormik } from "formik";
import { Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Feedback from "../../../components/feedback";
import Button from "../../../components/button";
import { getCodeValidation } from "./schema";
import { httpClient } from "../../../hooks/useHTTP";
import { toast } from "react-toastify";
import { getAxiosError } from "../../../util";
import { useScreenLoader } from "../../../hooks/useScreenLoader";



const ForgetPassword = () => {

    const { toggleScreenLoader } = useScreenLoader();
    const navigate = useNavigate();

    const handleGetCode = async () => {

        try {
            toggleScreenLoader();
            await httpClient.put('/User/ForgetPassword', formik.values);  
            toast.success('An Email Has Been Sent With Your Code');
            navigate('/reset-password',{
                state: {
                    userName: formik.values.userName
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
        },
        onSubmit: () => handleGetCode(),
        validationSchema: getCodeValidation
    })

    return  <Container>
                <Link to="/login">
                    <Button scope={""} className="mt-3 mb-3 btn-falcon-primary">
                        <i className="fa fa-arrow-left"></i>
                    </Button>
                </Link>
                <div className="vh-75 d-flex">
                    <Card className="w-75 d-block p-4 m-auto" style={{height: 'fit-content'}}>
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
                            <Button disabled={!formik.isValid || !formik.dirty} 
                                    className="btn-falcon-primary" 
                                    type="submit"
                                    scope={""}>Get Your Code</Button>
                        </Form>    
                    </Card>
                </div>
            </Container>;
}
 
export default ForgetPassword;