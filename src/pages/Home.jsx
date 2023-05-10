import { Link } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
  return (
    <>
      <h1>This is Home Page</h1>
      <div className="link-buttons">
        <Link to="/signup">SignUp</Link>
        <Link to="/login">LogIn</Link>
        <Link to="/dashboard">DashBoard</Link>
      </div>
    </>
  );
};
