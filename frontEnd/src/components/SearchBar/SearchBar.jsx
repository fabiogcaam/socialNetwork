import { useEffect, useState } from "react"
import { Container } from "react-bootstrap"
import userServices from "../../services/user.services"

const SearchBar = ({ userToFind, following, refresh }) => {

    const [followingList, setFollowingList] = useState(following)
    const [foundUsers, setFoundUsers] = useState([])


    useEffect(() => { getUser() }, [userToFind])

    function getUser() {

        userServices
            .getUserData(userToFind)
            .then(result => setFoundUsers(result.data))
            .catch(err => console.log(err))
    }

    function handlerAddFollow(event) {

        const followId = event.target.value

        userServices
            .addFollow(followId)
            .then(res => {
                setFollowingList(...following, res)
                refresh()
            })
            .catch(err => console.log(err))
    }


    return (
        <div>
            <Container>
                <h5>Listado de usuarios</h5>
                {
                    foundUsers.map(elm => {
                        return (
                            <Row md={{ span: 6, offset: 3 }} className="mb-3" key={e.username}>
                                <Col className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <img src={elm.avatar} alt="" />
                                        <div>
                                            <p>{elm.username}</p>
                                            <p>{elm.email}</p>
                                        </div>
                                    </div>
                                    {
                                        followingList.includes(elm) ?
                                            <button className="addButton" value={e._id} onClick={handlerAddFollow}>Follow</button>
                                            :
                                            <button className="deleteButton" value={e._id} onClick={handlerUnfollow}>Unfollow</button>
                                    }
                                </Col>
                            </Row>
                        )
                    })
                }
            </Container>
        </div>
    )

}

export default SearchBar