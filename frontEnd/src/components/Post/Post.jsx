import { useState } from "react"
import { Container, Row, Col } from "react-bootstrap"

//TODO: los datos del autor del post y contenido

const Post = ({ text, username, avatar }) => {

    const [isLiked, setIsLiked] = useState(false)

    const handleLike = () => {
        setIsLiked(!isLiked)
    }


    return (
        <Container>
            <Row>
                <Col>
                    <img src={avatar} alt={username} />
                </Col>
                <Col>
                    <h2>{username}</h2>
                </Col>
                <Col>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h5>{text}</h5>
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