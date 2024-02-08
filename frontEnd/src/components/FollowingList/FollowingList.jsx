import { useEffect, useState } from "react"
import { Modal } from "react-bootstrap"
import SearchBar from "../SearchBar/SearchBar"
import FollowCard from "../FollowCard/FollowCard"
import { Button, Row, Col } from "react-bootstrap"
import userServices from "../../services/user.services"

const FollowingList = () => {

    const [userSearch, setUserSearch] = useState('')
    const [following, setFollowing] = useState([])
    const [show, setShow] = useState(false)
    const [state, setState] = useState(false)

    function handleClose() {
        setUserSearch('')
        setShow(false)
    }

    function handleShow() {
        setUserSearch('')
        setShow(true)
        setState(!state)
    }

    function searchHandler(event) {
        setUserSearch(event.target.value)
    }

    function getFollowsList() {

        userServices
            .getFollowsList()
            .then(res => {
                console.log("ESTAMOS DE BUSQUEDA -- ", res)
                setFollowing(res.data)
            })
            .catch(err => console.log(err))
    }


    function handlerUnfollow(event) {

        const followId = event.target.value

        userServices
            .unfollow(followId)
            .then({ getFollowsList })
            .catch(err => console.log(err))

        setState(!state)
    }

    useEffect(() => { getFollowsList() }, [state])

    return (
        <div>
            <div className="d-flex justify-content-center mt-5">
                <Button onClick={handleShow}>
                    Follow
                </Button>
            </div>

            {
                following.map((elm, i) => {
                    return (
                        <div className="FollowingList my-5" key={i}>
                            <Row >
                                <Col md={{ span: 6, offset: 2 }}>
                                    <FollowCard follow={elm} key={i} />
                                </Col>
                                <Col>
                                    <Button className="unfollow mt-3" variant="danger" value={elm._id} onClick={handlerUnfollow}>Unfollow</Button>
                                </Col>
                            </Row>
                        </div>
                    )
                })
            }


            <Modal size='lg' show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Follow</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="inputField">
                        <label className="mx-5">Username: </label>
                        <input type="text" value={userSearch} onChange={searchHandler} placeholder="Username" />
                    </div>
                    <SearchBar userToFind={userSearch} following={following} handler={{ setState, state, }} closeModal={handleClose} refresh={getFollowsList} unfollow={handlerUnfollow} />
                </Modal.Body>
                <Modal.Footer className="d-flex justify-content-around">
                    <Button onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default FollowingList