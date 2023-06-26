import { Card, Col, Image, Row, Stack } from "react-bootstrap";
import ProfileImage from '../../../assets/img/team/3.jpg';
import { getCookie } from "../../../util";
import { useGetDataById } from "../../../hooks/useGetDataById";
import { User } from "../users/types";


const ProfilePage = () => {
    
    const { data } = useGetDataById<User>(`/User/GetUser`, getCookie('EMSUser').id);

    return  <>
                <Row>
                    <Col md={4}>
                        <Card className="p-4 bg-dark-blue">
                            <Stack direction="vertical" className="text-center">
                                <Image className="w-100 p-4" src={ProfileImage} roundedCircle/>
                                <h3>{data?.data.firstName} {data?.data.lastName}</h3>
                                <p></p>
                            </Stack>
                        </Card>
                    </Col>
                    <Col>
                        <Card className="p-4 bg-dark-blue">
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
            </>
}
 
export default ProfilePage;