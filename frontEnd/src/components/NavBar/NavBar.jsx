import { Navbar, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"


//TODO: añadir src de las imagenes

const NavBar = () => {

    const navigate = useNavigate()

    const { loggedUser, logout } = useContext(AuthContext)

    function closeSession() {
        logout()
        navigate('/')
    }


    return (
        <div>
            <Navbar bg="primary" data-bs-theme="dark" expand='md'>
                <Navbar.Brand>
                    <Link className='navButtons logo mx-4' to={'/'}> <img className='logoImg' src="" alt='logo' /></Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' style={{ backgroundColor: '#fff', borderBlockColor: '#fff' }} />

                {loggedUser && <>
                    <Navbar.Collapse id='basic-navbar-nav' >
                        <Nav className="me-auto">

                            <Link className='navButtons' to={'/main'}><img src="" alt='main' /> Main </Link>
                            <Link className='navButtons mx-4' to={'/search'}><img src="" alt='' />Search</Link>

                        </Nav>
                    </Navbar.Collapse>
                </>}
                <Navbar.Collapse className='justify-content-end' id='basic-navbar-nav' >
                    <Nav>
                        {
                            loggedUser ?
                                <>
                                    <Link className='navButtons mx-3' to={'/profile'}> My Profile</Link>
                                    <Link className='navButtons mx-3' to={'/'} onClick={closeSession}>Log Out</Link>
                                </>
                                :
                                <>
                                    <Link className='navButtons mx-3' to={'/login'}> Login </Link>
                                    <Link className='navButtons mx-3' to={'/signup'}> Sign Up </Link>
                                </>
                        }
                    </Nav>


                </Navbar.Collapse>
            </Navbar>
        </div >
    )

}

export default NavBar