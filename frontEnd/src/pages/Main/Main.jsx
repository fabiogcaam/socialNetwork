import { useEffect, useState } from "react"
import CreatePost from "../../components/Post/CreatePost/CreatePost"
import Post from "../../components/Post/Post"
import userServices from "../../services/user.services"
import postServices from "../../services/post.services"

const Main = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => { getAllPosts }, [])

    function getAllPosts() {

        userServices
            .getAllPostsFromFollows()
            .then(res => { setPosts(...posts, res) })
            .catch(err => console.log(err))

    }

    return (
        <>
            <CreatePost />
            {
                posts.map(elm => {
                    return (
                        <Post text={elm.text} idUser={elm.user} likes={elm.likes} />
                    )
                })
            }
        </>
    )
}

export default Main