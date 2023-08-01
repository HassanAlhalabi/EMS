
import { FormikProps } from "formik";
import { Col, Form, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";

import { LoginUser } from "../../types";
import Feedback from "../../../../components/feedback";
import useTranslate from "../../../../hooks/useTranslate";

const LoginForm = ({formik, isLoading}:{formik: FormikProps<LoginUser>, isLoading: boolean}) => {

    const t = useTranslate();

    return <Form noValidate onSubmit={formik.handleSubmit} validated={formik.dirty}>
                <Form.Group className="mb-3">
                    <Form.Control
                    required
                    type="text" 
                    placeholder={t('user_name')}
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
                    placeholder={t('password')}
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
                        <Form.Label htmlFor="rememberMe" className="m-1">{t('remember_me')}</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col className="d-flex justify-content-end">
                        <Link className="fs--1" to="/forget-password">{t('forget_password')}?</Link>
                    </Col>
                </Row>
                    
                <div className="mb-3">
                <button className="btn btn-primary d-block w-100 mt-3 p-2" 
                        type="submit" 
                        name="submit"
                        disabled={!formik.isValid || !formik.dirty}>
                    {
                    isLoading ? <Spinner size="sm" animation="grow" /> : t('login')
                    }
                </button>
                </div>
            </Form>
}

export default LoginForm;