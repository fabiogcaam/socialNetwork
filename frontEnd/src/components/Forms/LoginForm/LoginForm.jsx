import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import authService from "../../../services/auth.services"
import { AuthContext } from "./../../../context/auth.context"


const LoginForm = () => {

    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()

    const { authUser } = useContext(AuthContext)

    function handleInputOnChange(event) {
        const { value, name } = event.target
        setLoginInfo({ ...loginInfo, [name]: value })
    }

    function handleLoginSubmit(event) {

        event.preventDefault()

        authService
            .login(loginInfo)
            .then(({ data }) => {
                localStorage.setItem('authToken', data.authToken)
                authUser()
                navigate('/main')
            })
            .catch(err => console.log(err))
    }

    return (
        <Form className="mt-5" onClick={handleLoginSubmit}>
            <Form.Group>
                <Form.Label className='user-label mt-3'>Email</Form.Label>
                <Form.Control md={{ span: 6, offset: 3 }} className='user-input' type="email" placeholder="Insert your email" name="email" value={loginInfo.username} onChange={handleInputOnChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label className='user-label mt-3'>Password</Form.Label>
                <Form.Control className='user-input' type="password" placeholder="Insert your password" name="password" value={loginInfo.password} onChange={handleInputOnChange} />
            </Form.Group>

            <div className="d-grid gap-2 mt-5 d-flex justify-content-center">
                <Button className='primary-button shadow' type="submit" style={{ width: "20%" }}>
                    Iniciar Sesion
                </Button>
            </div>
        </Form>
    )

}

export default LoginForm