import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"

//TODO: los datos del autor del post y contenido

const Post = () => {

    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        setIsLiked(!isLiked)
    }


    return (
        <Container>
            <Row>
                <Col>
                    <img src="" alt="avatar" />
                </Col>
                <Col>
                    <h2>Usuario</h2>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>Texto</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div onClick={handleLike}>
                        {
                            isLiked ? <img src="corazonrelleno" alt="" /> : <img src="corazon vacio" alt="" />
                        }
                    </div>
                </Col>
                <Col>
                    <a><i>Comentar</i></a>
                </Col>
            </Row>

        </Container>
    )
}

export default Post