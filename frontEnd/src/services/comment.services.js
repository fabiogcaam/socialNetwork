import axios from "axios"

class CommentServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/comment`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    addComment(id, userId, postId) {
        return this.api.post('/add', id, userId, postId)
    }
}

const commentServices = new CommentServices()
export default commentServices