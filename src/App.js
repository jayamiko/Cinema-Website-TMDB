import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Favorite from "./pages/Favorite";
import CinemaDetail from "./pages/CinemaDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema/:name" element={<CinemaDetail />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/favorite" element={<Favorite />} />
      </Routes>
    </Router>
  );
}

export default App;
