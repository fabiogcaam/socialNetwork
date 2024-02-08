import { useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import postServices from "../../services/post.services"
import userServices from "../../services/user.services"
import { AuthContext } from "../../context/auth.context"

//TODO: los datos del autor del post y contenido

const Post = ({ text, idUser, likes }) => {

    const [user, setUser] = useState({})
    const [isLiked, setIsLiked] = useState(false)

    const { loggedUser } = useContext(AuthContext)

    const handleLike = () => {
        if (likes.includes(loggedUser._id)) {
            setIsLiked(false)
        } else {
            setIsLiked(true)
        }
    }



    useEffect(() => { getUser() }, [])

    function getPost() {
        postServices
            .getPost(id)
            .then(res => setPost(res))
            .catch(err => console.log(err))
    }

    function getUser() {

        userServices
            .getById(idUser)
            .then(res => setUser(res))
            .catch(err => console.log(err))
    }


    return (
        <Container>
            <Row>
                <Col>
                    <img src={user.avatar} alt={username} />
                </Col>
                <Col>
                    <h2>{user.username}</h2>
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