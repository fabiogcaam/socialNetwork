import { Container, Row, Col } from "react-bootstrap"
import SignupForm from "../../components/Forms/SignupForm/SignupForm"

const SignUp = () => {

    return (
        <Container>
            <Row className="mt-5">
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>Sign Up</h2>
                    <SignupForm />
                </Col>
            </Row>
        </Container>
    )

}

export default SignUp