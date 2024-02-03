import { Container, Row, Col } from "react-bootstrap"
import logo from "../../assets/Multicultural-Cooperation-Circle.svg"

//TODO: Meter una imagen que van a ver si no están logeados que sería un svg de la red social

const HomePage = () => {

    return (
        <Container>
            <Row className="mt-5">
                <Col className="mt-3" md={{ span: 6, offset: 3 }}>
                    <figure>
                        <img src={logo} alt="logo" />
                    </figure>
                </Col>
            </Row>
        </Container>
    )
}

export default HomePage