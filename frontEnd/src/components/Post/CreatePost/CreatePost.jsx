import { useState } from "react"
import { Button, Modal, Form } from "react-bootstrap"
import postServices from "../../../services/post.services"

const CreatePost = () => {

    const [show, setShow] = useState(false)
    const [post, setPost] = useState('')


    function handleShow() {
        setShow(true)
    }

    function handleClose() {
        setPost('')
        setShow(false)
    }

    function addPost() {

        postServices
            .addPost(post)
            .then(() => {
                handleClose()
            })
            .catch(err => console.log(err))

    }

    function handleInputOnChange(event) {
        const { value, post } = event.target
        addExpenseInfo({ ...post, [post]: value })
    }

    return (
        <>
            <Button onClick={handleShow}>
                Add Post
            </Button>


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
                            <Form.Label>Post Text</Form.Label>
                            <Form.Control as="textarea" onChange={handleInputOnChange} rows={3} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={addPost}>
                        Add Post
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}

export default CreatePost