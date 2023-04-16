
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { Home } from "pages/Home"

export const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/login"></Route>
                <Route path="/singup"></Route>
                <Route path="/dashboard"></Route>
            </Routes>
        </BrowserRouter>
    )
}