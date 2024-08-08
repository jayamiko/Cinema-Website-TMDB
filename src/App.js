import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Favorite from "./pages/Favorite";
import Layout from "./components/Layout/Layout";
import Path from "./constants/Page";
import MovieDetail from "./pages/MovieDetail";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route exact path={Paths.HOME} element={<Home />} />
          <Route path="/cinema/:id" element={<MovieDetail />} />
          <Route path={Paths.WATCHLIST} element={<Watchlist />} />
          <Route path={Paths.FAVORITE} element={<Favorite />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
