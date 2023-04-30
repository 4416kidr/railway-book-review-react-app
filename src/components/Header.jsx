import { Link } from "react-router-dom";
import "./Header.scss";

export const Header = () => {
  return (
    <>
      <header>
        <h1 className="app-title">書籍レビューアプリ</h1>
        <Link to="/">Topに戻る</Link>
      </header>
    </>
  );
};
