import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetUser, RawGetBooks, useGetBooks } from "components/Api";
import { signOut } from "../authSlice";
import ReactPaginate from "react-paginate";
import "./Main.scss";
import { Header } from "components/Header";

const CardsLists = (props) => {
  console.log("this is cards lists");
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
  const perPage = 10;
  let start = 0;
  let [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);
  const [pageBooks, setPageBooks] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cookies, setCookies, removeCookie] = useCookies();
  const auth = useSelector((state) => state.auth.isSignIn);
  const getPageCount = async () => {
    let tempOffset = 0;
    let booksData = [];
    let books = [];
    let isFirst = true
  
    while (books.length === 10 | isFirst) {
      // console.log(`loop of ${loopCount}\noffset is ${tempOffset}`);
      const res = await RawGetBooks(cookies.token, tempOffset);
      books = res.data;
      booksData.push(books)
      if (books.length < 10) {
        break;
      }
      tempOffset += 10;
      if (isFirst) isFirst = false;
    }
    const flattened = Array.prototype.concat.apply([], booksData);
    setBooks(flattened);
    setPageBooks(flattened.slice(start, start+perPage));
    setIsLoaded(true);
  };
  const handlePageChange = (data) => {
    start = data['selected']*perPage;
    setPageBooks(books.slice(start, start+perPage));
    console.log(start);
  }
  const handleLogOut = (e) => {
    removeCookie("token");
    removeCookie("username");
    dispatch(signOut());
  }
  useEffect(() => {
    getPageCount();
  }, []);

  if (!auth) {
    return (
      <div>
        <h1>You are not LogIn.</h1>
        <button onClick={() => navigate("/login")}>to LogIn</button>
      </div>
    )
  }
  if (!isLoaded) {
    return (<><h1>Now loading...</h1></>);
  }
  
  return (
    <>
      <header><Header></Header></header>
      <h1>This is Main Page</h1>
      <p>content length: {books.length}</p>
      <button onClick={() => navigate("/profile")}>to profile</button>
      <button className="logout_button" onClick={(e) => handleLogOut(e)}>
        LogOut
      </button>
      <CardsLists cards={pageBooks}/>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={Math.ceil(books.length / perPage)}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};
