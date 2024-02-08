import { useContext, useEffect, useState } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { AuthContext } from "../../context/auth.context"
import userServices from "../../services/user.services"

const Profile = () => {

    const { loggedUser } = useContext(AuthContext)

    const [followers, setFollowers] = useState(0)
    const [follows, setFollows] = useState(0)


    useEffect(() => {
        getNumberFollowers()
        getNumberFollows()
    }, [])

    function getNumberFollowers() {

        userServices
            .getFollowersList()
            .then(result => {
                setFollowers(result.data.length)
            })
            .catch(err => console.log(err))
    }

    function getNumberFollows() {

        userServices
            .getFollowsList()
            .then(result => setFollows(result.data.length))
            .catch(err => console.log(err))

    }

    return (
        <Container>
            <Row>
                <Col className="align-center">
                    <img src={loggedUser.avatar} alt={loggedUser.username} />
                    <h2>{loggedUser.username}</h2>
                    <h4>{loggedUser.email}</h4>
                    <Row md={{ span: 10, offset: 1 }}>
                        <Col md={{ span: 4, offset: 1 }}>
                            <div>
                                <h5>
                                    Followers: {followers}
                                </h5>
                            </div>
                        </Col>
                        <Col md={{ span: 4, offset: 1 }}>
                            <div>
                                <h5>
                                    Following: {follows}
                                </h5>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Profile