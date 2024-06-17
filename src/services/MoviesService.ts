import axios from "axios";
import SelectedMovieModel from "../models/SelectedMovieModel";

class MoviesService {
  private apiKey: string = "7e073e2f";
  private apiURL = "https://www.omdbapi.com/";

  public async getMoviesBySearch(query: string, controller?: AbortController) {
    if (query.length) {
      const response = await axios.get(this.apiURL, {
        params: {
          apiKey: this.apiKey,
          s: query,
        },
        signal: controller.signal,
      });
      const movies = response.data.Search;
      return movies;
    } else return [];
  }

  public async getMovieDetails(id: string): Promise<SelectedMovieModel> {
    const response = await axios.get(this.apiURL, {
      params: {
        apiKey: this.apiKey,
        i: id,
      },
    });
    const movie = response.data;
    return movie;
  }
}

const moviesService = new MoviesService();

export default moviesService;
