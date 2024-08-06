import api from "..";

const getNowPlayingMovies = async (setData) => {
  try {
    const response = await api.get(`/movie/now_playing?language=en-US&page=1`);
    setData(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getNowPlayingMovies;
