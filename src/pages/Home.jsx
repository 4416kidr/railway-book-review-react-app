import { Link } from "react-router-dom";
import { Header } from "components/Header";
import "./Home.scss";

export const Home = () => {
  return (
    <>
    <header><Header></Header></header>
      <h1>This is Home Page</h1>
      <div className="link-buttons">
        <Link to="/signup">SignUp</Link>
        <Link to="/login">LogIn</Link>
        <Link to="/main">Main</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </>
  );
};
