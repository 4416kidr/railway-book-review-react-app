import { Route, Routes, Link } from "react-router-dom";
import { Home } from "pages/Home";
import { SignUp } from "pages/SignUp";
import { LogIn } from "pages/LogIn";
import { Main } from "pages/Main";
import { Profile } from "pages/Profile";
import { New } from "pages/New";

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<LogIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/main" element={<Main />}></Route>
      <Route path="/profile" element={<Profile />}></Route>
      <Route path="/new" element={<New />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
    </Routes>
  );
};

function NotFound() {
  return (
    <>
      <h1>Not Found</h1>
      <Link to="/">Homeに戻る</Link>
    </>
  );
}
