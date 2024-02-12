import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import userServices from "../../services/user.services"
import { Row, Col, Button } from "react-bootstrap"

const SearchBar = ({ userToFind, following, handler, closeModal, refresh }) => {

    const [followingList, setFollowingList] = useState(following)
    const [foundUsers, setFoundUsers] = useState([])
    const { state, setState } = handler

    useEffect(() => {
        getUser()
        console.log(following)
    }, [userToFind])

    function getUser() {

        userServices
            .getByUsername(userToFind)
            .then(result => {
                console.log("ESTAMOOOOS AQUIII--", result.data)
                setFoundUsers(result.data)
            })
            .catch(err => console.log(err))
    }

    function handlerAddFollow(event) {

        const followId = event.target.value

        userServices
            .addFollow(followId)
            .then(res => {
                setFollowingList(...following, res)
                closeModal()
                refresh()
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Container>
                {
                    foundUsers.map(elm => {
                        if (!following.filter(e => e.username === elm.username).length > 0) {
                            return (
                                <Row md={{ span: 6, offset: 3 }} className="my-5" key={elm.username}>
                                    <Col className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <img src={elm.avatar} alt="" />
                                        </div>
                                        <div>
                                            <p>{elm.username}</p>
                                            <p>{elm.email}</p>
                                        </div>
                                        <div>
                                            <Button className="addButton primary" value={elm._id} onClick={handlerAddFollow}>Follow</Button>
                                        </div>
                                    </Col>
                                </Row>
                            )
                        }
                    })
                }
            </Container>
        </div >
    )

}

export default SearchBar