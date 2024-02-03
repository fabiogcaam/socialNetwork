import { Container, Row, Col } from "react-bootstrap"
import LoginForm from "../../components/Forms/LoginForm/LoginForm"

const Login = () => {

    return (
        <Container>
            <Row className="mt-5" md={{ span: 6, offset: 3 }}>
                <Col className="mt-5" md={{ span: 6, offset: 3 }}>
                    <h2>Login</h2>
                    <LoginForm />
                </Col>
            </Row>
        </Container>
    )

}

export default Login