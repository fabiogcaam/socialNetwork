import { Routes, Route } from "react-router-dom"

import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import HomePage from "./pages/Home/HomePage"
import Profile from "./pages/Profile/Profile"
import Main from "./pages/Main/Main"
import Search from "./pages/Search/Search"

const AppRoutes = () => {

    return (
        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/main" element={<Main />} />
            <Route path="/Search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}

export default AppRoutes