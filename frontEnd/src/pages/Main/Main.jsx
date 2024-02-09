import { useEffect, useState } from "react"
import CreatePost from "../../components/Post/CreatePost/CreatePost"
import Post from "../../components/Post/Post"
import userServices from "../../services/user.services"
import postServices from "../../services/post.services"

const Main = () => {

    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => { getAllPosts() }, [])

    function getAllPosts() {

        setLoading(true)

        userServices
            .getAllPostsFromFollows()
            .then(({ data }) => {
                setAllPosts(...allPosts, data)
                setLoading(false)
            })
            .catch(err => console.log(err))

    }

    return (
        <>
            <CreatePost />
            {
                !loading ?
                    allPosts.map(elm => {
                        return (
                            <Post _id={elm._id} text={elm.text} idUser={elm.user._id} avatar={elm.user.avatar} username={elm.user.username} likes={elm.likes} />
                        )
                    })
                    :
                    <h1>Loading...</h1>
            }
        </>
    )
}

export default Main