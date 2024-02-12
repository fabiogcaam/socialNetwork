import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Modal, Form } from "react-bootstrap"
import postServices from "../../services/post.services"
import { AuthContext } from "../../context/auth.context"
import corazonLLeno from "../../assets/corazonLLeno.webp"
import corazonVacio from "../../assets/corazonVacio.png"
import comentar from "../../assets/comentar.png"

//TODO: los datos del autor del post y contenido

const Post = ({ _id, text, username, avatar, likes }) => {

    const [isLiked, setIsLiked] = useState(false)
    const [likesList, setLikesList] = useState(likes)
    const { loggedUser } = useContext(AuthContext)

    const [show, setShow] = useState(false)
    const [comment, setComment] = useState({ text: '', user: loggedUser._id, post: '' })

    useEffect(() => {
        checkIfILiked()
    }, [])


    function checkIfILiked() {

        if (Array.isArray(likesList)) {
            if (likesList.includes(loggedUser._id)) {
                setIsLiked(true)
            } else {
                setIsLiked(false)
            }

        }
    }

    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setComment({ text: '' })
        setShow(false)
    }

    function handleraddPost(event) {

        event.preventDefault()

        commentServices
            .addComment(comment)
            .then(() => {
                handleClose()
            })
            .catch(err => console.log(err))

    }

    function handleInputOnChange(event) {
        const { value } = event.target
        setComment({ ...comment, text: value })
    }

    function handleLike() {
        if (Array.isArray(likesList)) {
            !likesList.includes(loggedUser._id) ?
                postServices
                    .likePost(_id)
                    .then(() => {
                        setLikesList(...likesList, loggedUser._id)
                        setIsLiked(true)
                    })
                    .catch(err => console.log(err))

                :
                postServices
                    .deleteLike(_id)
                    .then(() => {
                        postServices.getLikes(_id)
                    })
                    .then(result => setLikesList(result))
                    .catch(err => console.log(err))

        }
    }


    return (
        <>

            <Container className="my-3" style={{ border: "1px solid lightgrey", borderRadius: "10px" }}>
                <Row className="my-3">
                    <Col md={{ span: 1, offset: 1 }}>
                        <figure style={{ width: "50px", height: "50px" }}>
                            <img style={{ width: "100%" }} src={avatar} alt="" />
                        </figure>
                    </Col>
                    <Col className="mt-3" md={{ span: 3, offset: 2 }}>
                        <h5 style={{ color: "#B9B1AF" }}>{username}</h5>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 8, offset: 2 }}>
                        <p style={{ fontSize: "18px" }}>{text}</p>
                    </Col>
                </Row>
                <Row md={{ span: 6, offset: 3 }}>
                    <Col md={{ span: 1, offset: 9 }}>
                        <div>
                            <figure style={{ width: "30px", height: "30px" }} onClick={handleLike}>
                                <img src={isLiked ? corazonLLeno : corazonVacio} alt="" style={{ width: "100%" }} />
                            </figure>
                        </div>
                    </Col>
                    <Col className="mb-3" md={{ span: 1, }}>
                        <div onClick={handleShow} value={_id}>
                            <figure style={{ width: "30px", height: "30px" }}>
                                <img src={comentar} alt="" style={{ width: "100%" }} />
                            </figure>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>What do you think about this post?</Form.Label>
                            <Form.Control as="textarea" rows={3} value={post.text} onChange={handleInputOnChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleraddPost}>
                        Add Comment
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default Post