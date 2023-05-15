import { useFormik } from "formik";
import { Form, Row, Spinner, Col } from "react-bootstrap"
import Feedback from "../../../components/feedback";
import { usePost } from "../../../hooks"
import { signInValidation } from "../../../schema/sign-in";
import { useContext } from 'react';
import { AuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { getAxiosError, setCookie } from "../../../util";
import { toast } from "react-toastify";

const INITIAL_VALUES = {
  name: '',
  password: '',
  rememberMe: true
}

const SignIn = () => {

  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: () => handleSignIn(),
    validationSchema: signInValidation
  })

  const { mutateAsync , isLoading } = usePost('/Authenticate', 
                                      {
                                        name: formik.values.name,
                                        password: formik.values.password
                                      });

  const handleSignIn = async () => {

    // Not Valid ... Do Nothing
    if(!formik.isValid) return;

    // If All Is Ok ... Do It
    if(formik.isValid) {
      try {
        const mutationReq = await mutateAsync();
        const user = mutationReq.data;
        const cookieTime = formik.values.rememberMe ? 9 : null
        if(cookieTime) {
          setCookie('EMSUser', user, cookieTime);
        } else {
          setCookie('EMSUser', user);
        }
        setAuthUser(true);
        navigate('/');
      } catch(error) {
        toast.error(getAxiosError(error));
      }
    }
 
  }

  return (
    <div className="row flex-center min-vh-100 py-6">
      <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">

        <div className="d-flex flex-center mb-4">
          <span className="font-sans-serif fw-bolder fs-5 d-inline-block">EMS</span>
        </div>
        
        <div className="card">
          <div className="card-body p-4 p-sm-5">

            <div className="row flex-between-center mb-2">
              <div className="col-auto">
                <h5>Log in</h5>
              </div>
            </div>

            <Form noValidate onSubmit={formik.handleSubmit} validated={formik.dirty}>
                <Form.Group className="mb-3">
                  <Form.Control
                    required
                    type="text" 
                    placeholder="User Name"
                    name="name"
                    value={formik.values.name} 
                    onChange={formik.handleChange} />
                  <Feedback type="invalid">
                    {formik.errors.name}
                  </Feedback>
                </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  required
                  type="password" 
                  placeholder="Password"
                  name="password"
                  value={formik.values.password} 
                  onChange={formik.handleChange} />
                <Feedback type="invalid">
                  {formik.errors.password}
                </Feedback>
              </Form.Group>  
              <Row className="mb-3">
                <Col>
                  <Form.Group>
                    <Form.Check
                      className="d-inline-block"
                      id="rememberMe"
                      type="checkbox"
                      name="rememberMe" 
                      checked={formik.values.rememberMe} 
                      onChange={formik.handleChange} />
                    <Form.Label htmlFor="rememberMe" className="m-1">Remember me</Form.Label>
                  </Form.Group>
                </Col>
                <Col className="d-flex justify-content-end">
                  <a className="fs--1" href="forgot-password.html">Forgot Password?</a>
                </Col>
              </Row>
                  
              <div className="mb-3">
                <button className="btn btn-primary d-block w-100 mt-3 p-2" 
                        type="submit" 
                        name="submit"
                        disabled={!formik.isValid || !formik.dirty}>
                  {
                    isLoading ? <Spinner size="sm" animation="grow" /> : 'Log in'
                  }
                </button>
              </div>
            </Form>

          </div>
        </div>
      </div>
    </div>
  )
}
  
export default SignIn
  