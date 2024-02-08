import axios from 'axios'

class PostServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/post`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    addPost(text) {
        return this.api.post('/post/add', text)
    }

    getPost(id) {
        return this.api.get(`/find/${id}`)
    }

    likePost(postId) {
        return this.api.get(`/likePost/${postId}`)
    }

    deleteLike(postId) {
        return this.api.get(`/deleteLike/${postId}`)
    }
}

const postServices = new PostServices()
export default postServices