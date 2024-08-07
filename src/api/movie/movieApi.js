import api from "..";

const lang = "en-US";
const page = "1";

export const getNowPlayingMovies = async (setData) => {
  try {
    const response = await api.get(
      `/movie/now_playing?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTopRatedMovies = async (setData) => {
  try {
    const response = await api.get(
      `/movie/top_rated?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMovieDetail = async (movieId, setData) => {
  try {
    const response = await api.get(`/movie/${movieId}`);
    setData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getRecomendationMovies = async (movieId, setData) => {
  try {
    const response = await api.get(
      `/movie/${movieId}/recommendations?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
