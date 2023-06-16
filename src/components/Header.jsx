import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import "./Header.scss";

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [cookies, setCookies, removeCookie] = useCookies();
  return (
    <>
      <header>
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
      </header>
    </>
  );
};
