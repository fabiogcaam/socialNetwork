import { useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"

const Profile = () => {

    const { loggedUser } = useContext(AuthContext)

    return (
        <Container>
            <Row>
                <Col>
                    <img src={loggedUser.avatar} alt={loggedUser.username} />
                    <h2>{loggedUser.email}</h2>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile