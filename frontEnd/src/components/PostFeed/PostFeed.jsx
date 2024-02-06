import { useEffect } from "react"
import User from "../../../../backEnd/models/User.model"
import { post } from "../../../../backEnd/routes/auth.routes"

const PostFeed = () => {

    const [posts, setPosts] = useState([])
    const [follows, setFollows] = useState([])
    const [like, setLike] = useState(false)

    useEffect(() => {
        getPostFromFollows()
    }, [])

    function getPostFromFollows() {

        User
            .getFollowsList()
            .then((res) => {
                setFollows(...follows, res)
            })
            .catch(err => console.log(err))

        follows.map(elm => {
            User
                .getPostsFeed(elm._id)
                .then((res) => {
                    setPosts(...post, res)
                })
                .catch(err => console.log(err))
        })

    }

    return (

        <div>
            {
                follows.map(elm => {
                    return (
                        elm.posts.map(elmPost => {
                            return (
                                <Post text={elmPost.text} username={elm.username} avatar={elm.avatar} />
                            )
                        })
                    )
                })
            }
        </div>
    )

}

export default PostFeed