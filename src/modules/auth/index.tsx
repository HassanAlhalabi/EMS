import { useContext } from 'react';

import { useFormik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Row, Col } from 'react-bootstrap';

import { usePost } from "../../hooks"
import { signInValidation } from "./schema";
import { AuthContext } from "../../contexts/auth-context";
import { getAxiosError, setCookie } from "../../util";
import LoginForm from './components/login-form';
import useTranslate from '../../hooks/useTranslate';
import LoginFormTitle from './components/login-form-title';

const INITIAL_VALUES = {
  name: '',
  password: '',
  rememberMe: false
}

const SignIn = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const { setAccess } = useContext(AuthContext);
  const t = useTranslate();

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
        setAccess(user.token);
        delete user.token; 
        if(formik.values.rememberMe) {
          setCookie('EMSUser', user, 5);
        } else {
          setCookie('EMSUser', user);
        }
        const from = location.state?.from || '/';
        navigate(from, {replace: true});
      } catch(error) {
        toast.error(getAxiosError(error));
      }
    }
 
  }

  return (
    <Row className="flex-center min-vh-100 py-6">
      <Col sm={10} md={8} lg={6} xl={5} xxl={4} >
        <Card>
          <Card.Body className="p-4 p-sm-5">
            <LoginFormTitle title={t('login')} />
            <LoginForm formik={formik} isLoading={isLoading} />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}
  
export default SignIn
  