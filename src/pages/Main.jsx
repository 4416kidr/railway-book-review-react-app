import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "const";
import "./Main.scss";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../authSlice";
import { useNavigate } from "react-router-dom";

const CardsLists = (props) => {
  console.log(props);
  return (
    <div className="cards_lists">
      {props.cards.map((e, index) => {
        return (
          <div className="card" key={e.id}>
            <h2 className="card__title">{e.title}</h2>
            <div className="url_and_reviewer">
              <p className="card__reviewer">by {e.reviewer}</p>
              <a className="card__url" href={e.url}>
                url
              </a>
            </div>
            <p className="card__detail">
              detail <br />
              {e.detail}
            </p>
            <p className="card__review">
              review <br /> {e.review}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export const Main = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const [booksList, setBooksList] = useState(null);
  const [viewOffset, setViewOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [noContents, setNoContents] = useState(false);
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
        if (list.length === 0) {
          setNoContents(true);
        } else {
          setNoContents(false);
        }
        console.log(list);
        console.log("result ok");
      })
      .catch((err) => {
        console.log("result error");
      });
  }, [viewOffset]);

  const handleViewOffset = (diff) => {
    if (diff === 0) {
      setViewOffset(0);
    } else if (viewOffset + diff <= 0) {
      setViewOffset(0);
    } else {
      setViewOffset(viewOffset + diff);
    }
  };

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
      {noContents ? <h2>This page have no contents!</h2> : <></>}
      <div className="card_view">
        <p className="now_card_view">
          {viewOffset}~{viewOffset + 10}を表示中
        </p>
        <CardsLists cards={booksList} />
      </div>
      <div className="paginator">
        {viewOffset / 10 <= 2 ? (
          <></>
        ) : (
          <button className="to_first_page" onClick={() => handleViewOffset(0)}>
            1
          </button>
        )}
        {viewOffset / 10 <= 3 ? <></> : <span>...</span>}
        {viewOffset / 10 <= 1 ? (
          <></>
        ) : (
          <button
            className="prev_prev_page"
            onClick={() => handleViewOffset(-20)}
          >
            {viewOffset / 10 - 1}
          </button>
        )}
        {viewOffset / 10 <= 0 ? (
          <></>
        ) : (
          <button className="prev_page" onClick={() => handleViewOffset(-10)}>
            {viewOffset / 10}
          </button>
        )}
        <span className="current_page">{viewOffset / 10 + 1}</span>
        <button className="next_page" onClick={() => handleViewOffset(10)}>
          {viewOffset / 10 + 2}
        </button>
        <button className="next_next_page" onClick={() => handleViewOffset(20)}>
          {viewOffset / 10 + 3}
        </button>
        <span>...</span>
      </div>
    </div>
  );
};
