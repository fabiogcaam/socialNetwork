import axios from "axios";

class AuthService {

    constructor() {
        this.api = axios.create({
            baseURL: `${import.meta.env.VITE_APP_API_URL}/auth`
        })

        this.api.interceptors.request.use((config) => {
            const storedToken = localStorage.getItem("authToken")

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    signup(user) {
        return this.api.post('/signup', user)
    }

    login(user) {
        return this.api.post('/login', user)
    }

    verify(authToken) {
        return this.api.get('/verify',
            { headers: { Authorization: `Bearer ${authToken}` } })
    }

}

const authService = new AuthService()
export default authService