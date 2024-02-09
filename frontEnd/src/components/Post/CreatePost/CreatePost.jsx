import { useContext, useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import postServices from "../../../services/post.services"
import { AuthContext } from "./../../../context/auth.context"

const CreatePost = () => {

    const { authUser } = useContext(AuthContext)
    const userId = authUser._id

    const [show, setShow] = useState(false)
    const [post, setPost] = useState({ text: '', user: userId })


    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setPost({ text: '' })
        setShow(false)
    }

    function handleraddPost(event) {

        event.preventDefault()

        console.log(post)

        postServices
            .addPost(post)
            .then((res) => {
                console.log(res.data)
                handleClose()
            })
            .catch(err => console.log(err))

    }

    function handleInputOnChange(event) {
        const { value } = event.target
        setPost({ ...post, text: value })
    }


    return (
        <>
            <div className="d-flex justify-content-center my-5">
                <Button onClick={handleShow}>
                    Add Post
                </Button>
            </div>

            <hr />



            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Post</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>What are you thinking?</Form.Label>
                            <Form.Control as="textarea" rows={3} value={post.text} onChange={handleInputOnChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleraddPost}>
                        Add Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default CreatePost