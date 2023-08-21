import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserName } from "./Api";
import "./Header.scss";
import { signOut } from "authSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookies, removeCookie] = useCookies();
  useEffect(() => {
    console.log(cookies);
    if (auth) {
      if (cookies.token === null) {
        dispatch(signOut());
      }
    } else {
      console.log("you are not login");
    }
  }, [auth]);
  return (
    <>
      <h1>
        <Link to="/" className="app-title">
          書籍レビューアプリ
        </Link>
      </h1>
      {auth ? (
        <p className="login_status">Welcome {cookies.username}</p>
      ) : (
        <Link to="/login" className="to_login_button">
          LogIn
        </Link>
      )}
      <Link to="/">Topに戻る</Link>
    </>
  );
};
