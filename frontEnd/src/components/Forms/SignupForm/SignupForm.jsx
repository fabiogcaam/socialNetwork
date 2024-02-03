import { useState } from "react"
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import uploadServices from "../../../services/upload.services"
import authServices from "../../../services/auth.services"


const SignupForm = () => {

    const [signupInfo, setSignupInfo] = useState({
        username: '',
        email: '',
        password: '',
        avatar: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    function handleInputOnChange(event) {
        const { value, name } = event.target
        setSignupInfo({ ...signupInfo, [name]: value })
    }

    function handleSignupSubmit(event) {
        event.preventDefault()

        authServices
            .signup(signupInfo)
            .then(() => navigate('/main'))
            .catch(err => console.log(err))
    }

    function handleFileUpload(event) {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('imageData', event.target.files[0])

        uploadServices
            .uploadImage(formData)
            .then(({ data }) => {
                setSignupInfo({ ...signupInfo, avatar: data.cloudinary_url })
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }

    return (
        <Form className="mt-4" onSubmit={handleSignupSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUserName">
                <Form.Label className='user-label'>Username</Form.Label>
                <Form.Control className='user-input' type="text" placeholder="Insert your username" name="username" value={signupInfo.username} onChange={handleInputOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className='user-label'>E-mail</Form.Label>
                <Form.Control className='user-input' type="email" placeholder="Insert your e-mail" name="email" value={signupInfo.email} onChange={handleInputOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control className='user-input' type="password" placeholder="Insert your password" name="password" value={signupInfo.password} onChange={handleInputOnChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAvatar">
                <Form.Label className='user-label'>Profile picture</Form.Label>
                <Form.Control className='user-input' type="file" placeholder="Insert your profile picture" name="avatar" onChange={handleFileUpload} />
            </Form.Group>

            <div className="d-grid gap-2 mt-5 d-flex justify-content-center">
                <Button className='primary-button shadow' type="submit" style={{ width: "20%" }} disabled={isLoading}>
                    {isLoading ? 'Cargando...' : 'Registrarse'}
                </Button>
            </div>
        </Form>
    )
}

export default SignupForm