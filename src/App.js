import "./App.css";
import { Header } from "./components/Header";
import { Router } from "./routes/Router"

function App() {
  return (
    <div className="App">
      <Header />
      <Router />
    </div>
  );
}

export default App;
