import "./App.css";
import { Header } from "./components/Header";
import { Router } from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
