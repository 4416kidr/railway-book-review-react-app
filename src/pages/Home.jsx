import { Link } from "react-router-dom"
import "./Home.scss"

export const Home = () => {
  return (
    <>
      <h1>This is Home Page</h1>
      <div className="link-buttons">
        <button>
          <Link to="/singup">SignUp</Link>
        </button>
        <button>
          <Link to="/login">LogIn</Link>
        </button>
        <button>
          <Link to="/dashboard">DashBoard</Link>
        </button>
      </div>
    </>
  )
}