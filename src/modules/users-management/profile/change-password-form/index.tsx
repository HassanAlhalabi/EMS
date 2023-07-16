
import { Form, Button, Stack } from "react-bootstrap";
import { FormikProps } from "formik";

import Feedback from "../../../../components/feedback"
import { NewPassword } from "../../users/types";
import { useTranslation } from "react-i18next";

const ChangePsswordForm = ({formik}:{formik: FormikProps<NewPassword>}) => {

    const { t } = useTranslation();

    return (
        <Form noValidate validated={formik.dirty} autoComplete="off">
            <h4 className="mb-3">
                {t('update_password')}:
            </h4>
            <Stack className="d-block d-sm-flex gap-2">
                <div  className="mb-3 flex-1">
                    <Form.Group>
                        <Form.Control   name="newPassword" 
                                        placeholder={`${t('new_password')}...`}
                                        onChange={formik.handleChange}
                                        value={formik.values.newPassword} 
                                        required
                                        type="password" />
                    </Form.Group>
                    <Feedback type="invalid">
                            {formik.errors.newPassword as string}
                        </Feedback>
                </div>
                <div className="mb-3 flex-1">
                    <Form.Group>
                        <Form.Control   required
                                        type="password"
                                        name="confirmPassword" 
                                        placeholder={`${t('confirm_password')}...`}
                                        onChange={formik.handleChange}
                                        value={formik.values.confirmPassword} />
                        <Feedback type="invalid">
                            {formik.errors.confirmPassword as string}
                        </Feedback>
                    </Form.Group>
                </div>
                <div className="mb-3">
                    <Button className="btn-falcon-primary" 
                            disabled={!formik.dirty || !formik.isValid }
                            onClick={() => formik.handleSubmit()}
                            >{t('change_password')}</Button>
                </div>
            </Stack>
        </Form>
    )
}

export default ChangePsswordForm
