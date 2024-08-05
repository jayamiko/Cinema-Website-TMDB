import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Favorite from "./pages/Favorite";
import CinemaDetail from "./pages/CinemaDetail";
import Layout from "./components/Layout/Layout";
import Paths from "./constants/Page";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path={Paths.HOME} element={<Home />} />
          <Route path="/cinema/:name" element={<CinemaDetail />} />
          <Route path={Paths.WATCHLIST} element={<Watchlist />} />
          <Route path={Paths.FAVORITE} element={<Favorite />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
