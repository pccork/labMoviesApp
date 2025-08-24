import truncate from "lodash/truncate";
import { BaseMovieProps } from "./types/interfaces";

export const excerpt = (string: string) => {
    return truncate(string, {
        length: 400, // maximum 400 characters
        separator: /,?\.* +/, // separate by spaces, including preceding commas and periods
    });
}

export const sortMovies = (
  movies: BaseMovieProps[],// the movie array BaseMovieProps[]
  sortOption: string  //which field to sort title, release_date, or vote_average
): BaseMovieProps[] => {
  return [...movies].sort((a, b) => {   // use the sort() method of array sorting element of array
    switch (sortOption) {
      case "title":
        return a.title.localeCompare(b.title);// Sorting tile in alphabetical order 
      case "release_date":
        return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();//convert date to a number and compare
      case "rating":
        return b.vote_average - a.vote_average;
      default:
        return 0;
    }
  });
};
