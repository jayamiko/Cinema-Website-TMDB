import api, { ACCOUNT_ID } from "..";

const lang = "en-US";
const page = "1";

export const getNowPlayingMovies = async (setData, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    const response = await api.get(
      `/movie/now_playing?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

export const getTopRatedMovies = async (setData, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    const response = await api.get(
      `/movie/top_rated?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

export const getMovieDetail = async (
  movieId,
  setData,
  setIsLoading,
  setError
) => {
  setIsLoading(true);
  try {
    const response = await api.get(`/movie/${movieId}`);
    setData(response.data);
  } catch (error) {
    console.error("error:", error);
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

export const getRecomendationMovies = async (
  movieId,
  setData,
  setIsLoading,
  setError
) => {
  setIsLoading(true);
  try {
    const response = await api.get(
      `/movie/${movieId}/recommendations?language=${lang}&page=${page}`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
    setError(error);
  } finally {
    setIsLoading(false);
  }
};

export const getRatedMovies = async (sessionId, setData, setIsLoading) => {
  setIsLoading(true);
  const sortBy = "asc";

  try {
    const response = await api.get(
      `/account/${ACCOUNT_ID}/rated/movies?language=${lang}&page=${page}&session_id=${sessionId}&sort_by=created_at.${sortBy}'`
    );
    setData(response.data.results);
  } catch (error) {
    console.error("error:", error);
  } finally {
    setIsLoading(false);
  }
};

export const addRateMovie = async (
  sessionId,
  movieId,
  value,
  setIsLoading,
  setError
) => {
  setIsLoading(true);

  const rate = value * 2;

  try {
    await api.post(`/movie/${movieId}/rating?session_id=${sessionId}`, {
      value: rate,
    });
  } catch (error) {
    console.error("error:", error);
    setError(error);
  } finally {
    setIsLoading(false);
  }
};
