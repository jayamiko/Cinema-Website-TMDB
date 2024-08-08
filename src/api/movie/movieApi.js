import api from "..";

const lang = "en-US";
const page = "1";

export const getNowPlayingMovies = async (setData, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await api.get(
      `/movie/now_playing?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const getTopRatedMovies = async (setData, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await api.get(
      `/movie/top_rated?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const getMovieDetail = async (movieId, setData, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await api.get(`/movie/${movieId}`);
    setData(response.data);
  } catch (error) {
    console.error("error:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const getSearchMovies = async (query, setData, setIsLoading) => {
  setIsLoading(true);
  try {
    const response = await api.get(
      `/search/movie?query=${query}&include_adult=false&language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const getRecomendationMovies = async (
  movieId,
  setData,
  setIsLoading
) => {
  setIsLoading(true);
  try {
    const response = await api.get(
      `/movie/${movieId}/recommendations?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};

export const addRateMovie = async (sessionId, movieId, value, setIsLoading) => {
  setIsLoading(true);
  try {
    await api.post(`/movie/${movieId}/rating?session_id=${sessionId}`, {
      value,
    });
  } catch (error) {
    console.error("error:", error);
    throw error;
  } finally {
    setIsLoading(false);
  }
};
