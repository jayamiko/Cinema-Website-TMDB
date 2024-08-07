import api from "..";

export const getNowPlayingMovies = async (setData) => {
  try {
    const response = await api.get(`/movie/now_playing?language=en-US&page=1`);
    setData(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getTopRatedMovies = async (setData) => {
  try {
    const response = await api.get(`/movie/top_rated?language=en-US&page=1`);
    setData(response.data.results);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
