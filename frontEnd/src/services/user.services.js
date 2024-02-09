import axios from "axios"

class UserServices {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/user`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })

    }

    getById(userId) {
        return this.api.get(`/find/${userId}`)
    }

    getByUsername(userUsername) {
        return this.api.get(`/find/${userUsername}`)
    }

    addFollow(userId) {
        return this.api.get(`/follow/${userId}`)
    }

    unfollow(userId) {
        return this.api.get(`/unfollow/${userId}`)
    }

    getFollowersList() {
        return this.api.get('/followers')
    }

    getFollowsList() {
        return this.api.get('/following')
    }

    getAllPostsFromFollows(userId) {
        return this.api.get(`/posts/${userId}`)
    }
}

const userServices = new UserServices()
export default userServices