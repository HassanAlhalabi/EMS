import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import ProfileImage from '../../../assets/img/team/3.jpg';
import { getCookie } from "../../../util";
import { useGetDataById } from "../../../hooks/useGetDataById";
import { NewPassword, User } from "../users/types";
import ChangePsswordForm from "./change-password-form";
import { useFormik } from "formik";
import { newPasswordValidation } from "./schema";
import { ACTION_TYPES } from "../../../constants";
import { toast } from "react-toastify";
import { ActionItem, useActions } from "../../../hooks/useActions";


const ProfilePage = () => {
    
    const { data } = useGetDataById<User>(`/User/GetUser`, getCookie('EMSUser')?.id);
    const { setAction } = useActions()

    const handleSuccess = async (message: string) => {
        toast.success(message)
        formik.resetForm();
    }
    
    const handleUserAction = () => {
        if(formik.isValid) {
            setAction(actionsMap[ACTION_TYPES.update] as ActionItem)
        }
}
    

    const formik = useFormik<NewPassword>({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        onSubmit: () => { handleUserAction() },
        validationSchema: newPasswordValidation
    })

    const actionsMap = {
        [ACTION_TYPES.update]: {
          type: ACTION_TYPES.update,
          path: '/User/ChangePassword',
          payload: {userName: data?.data.userName, ...formik.values},
          onSuccess: () => handleSuccess('Password Updated Successfully')
        }
    }

    return  <>
                <Row className="mb-3">
                    <Col md={4}>
                        <Card className="p-4 bg-dark-blue h-100">
                            <Stack direction="vertical" className="text-center">
                                <Image className="w-100 p-4" src={ProfileImage} roundedCircle/>
                                <h3>{data?.data.firstName} {data?.data.lastName}</h3>
                                <p></p>
                            </Stack>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-4 bg-dark-blue h-100">
                            <Stack>
                                <Row>
                                    <Col><b>Full Name</b></Col>
                                    <Col>{data?.data.firstName} {data?.data.lastName}</Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col><b>User Name</b></Col>
                                    <Col>{data?.data.userName}</Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col><b>Email</b></Col>
                                    <Col>{data?.data.email}</Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col><b>Phone Number</b></Col>
                                    <Col>{data?.data.phoneNumber}</Col>
                                </Row>
                                <hr/>
                                <Row>
                                    <Col><b>Role</b></Col>
                                    <Col>{data?.data.role.name}</Col>
                                </Row>
                                <hr/>
                            </Stack>
                        </Card>
                    </Col>
                </Row>
                <Card className="p-4 bg-dark-blue">
                    <ChangePsswordForm formik={formik} />
                </Card>
            </>
}
 
export default ProfilePage;