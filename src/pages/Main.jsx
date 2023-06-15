import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "const";
import "./Main.scss";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../authSlice";
import { useNavigate } from "react-router-dom";

export const Main = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const [booksList, setBooksList] = useState(null);
  const [viewOffset, setViewOffset] = useState(0);
  const [cookies, setCookies, removeCookie] = useCookies();
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    removeCookie("token");
    dispatch(signOut());
  };
  useEffect(() => {
    axios
      .get(`${url}/books`, {
        params: {
          offset: viewOffset,
        },
        headers: { Authorization: `Bearer ${cookies.token}` },
      })
      .then((res) => {
        const list = res.data;
        setBooksList(list);
        console.log(list);
        console.log("result ok");
      })
      .catch((err) => {
        console.log("result error");
      });
  }, [viewOffset]);

  if (!auth)
    return (
      <div>
        <h1>You are not LogIn.</h1>
        <button onClick={() => navigate("/login")}>to LogIn</button>
      </div>
    );

  if (booksList == null)
    return (
      <div>
        <h1>This is Main</h1>
        <p>now loading...</p>
      </div>
    );
  return (
    <div>
      <h1>This is Main</h1>
      <button className="logout_button" onClick={(e) => handleLogOut(e)}>
        LogOut
      </button>
      <div className="card_view">
        <p className="now_card_view">
          {viewOffset}~{viewOffset + 10}を表示中
        </p>
        {booksList.map((e, index) => {
          return (
            <div className="card" key={e.id}>
              <p className="card__title">{e.title}</p>
              <p className="card__detail">detail: {e.detail}</p>
              <p className="card__review">review: {e.review}</p>
              <p className="card__reviewer">reviewer: {e.reviewer}</p>
              <a className="card__url" href={e.url}>
                url
              </a>
            </div>
          );
        })}
      </div>
      <button
        className="next_view_offset"
        onClick={(offset) => {
          setViewOffset(viewOffset + 10);
        }}
      >
        next
      </button>
      <button
        className="reset_view_offset"
        onClick={(offset) => {
          setViewOffset(0);
        }}
      >
        reset
      </button>
    </div>
  );
};
