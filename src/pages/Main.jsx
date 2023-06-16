import axios from "axios";
import { useEffect, useState } from "react";
import { url } from "const";
import "./Main.scss";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../authSlice";
import { useNavigate } from "react-router-dom";

const CardsLists = (props) => {
  console.log(props)
  return (
    <div className="cards_lists">
      {
        props.cards.map((e, index) => {
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
        })
      }
    </div>
  )
}

export const Main = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const navigate = useNavigate();
  const [booksList, setBooksList] = useState(null);
  const [viewOffset, setViewOffset] = useState(0);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [underHundredPage, setUnderHundredPage] = useState(true);
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
      setIsFirstPage(true);
      setUnderHundredPage(true);
    }
    else if (viewOffset+diff <= 0) {
      setViewOffset(0);
      setIsFirstPage(true);
      setUnderHundredPage(true)
    }
    else if (viewOffset+diff <= 100) {
      setViewOffset(viewOffset+diff);
      setIsFirstPage(false);
      setUnderHundredPage(true);
    }
    else {
      setViewOffset(viewOffset+diff);
      setIsFirstPage(false);
      setUnderHundredPage(false);
    }

  }

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
      {noContents ? (<h2>This page have no contents!</h2>) : (<></>)}
      <div className="card_view">
        <p className="now_card_view">
          {viewOffset}~{viewOffset + 10}を表示中
        </p>
        <CardsLists cards={booksList}/>
      </div>
      <div className="page_control_buttons">
        {isFirstPage ? (<></>): (
          <button
            className="prev_view_offset_button"
            onClick={() => handleViewOffset(-10)}
          >
            prev
          </button>
        )}
        <button
          className="next_view_offset_button"
          onClick={() => handleViewOffset(10)}
        >
          next
        </button>
        <button
          className="reset_view_offset_button"
          onClick={() => handleViewOffset(0)}
        >
          reset
        </button>
        <button
          className="next_hundred_view_offset_button"
          onClick={() => handleViewOffset(100)}
        >
          next 100
        </button>
        {underHundredPage ? (<></>): (
          <button
            className="prev_hundred_view_offset_button"
            onClick={() => handleViewOffset(-100)}
          >
            prev 100
          </button>
        )}
      </div>
    </div>
  );
};
