
import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMovies } from "../api/tmdb-api";
import { BaseMovieProps } from "../types/interfaces"; 
import useFiltering from "../hooks/useFiltering";//update useFiltering with sorting
import MovieFilterUI, {
  titleFilter,
  genreFilter,castFilter,
} from "../components/movieFilterUI";
import { DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import LoginForm from "../components/loginForm";

const titleFiltering = {
  name: "title",
  value: "",
  condition: titleFilter,
};
const genreFiltering = {
  name: "genre",
  value: "0",
  condition: genreFilter,
};
const castFiltering = {
  name: "cast",
  value: "",
  condition: castFilter,
};


const HomePage: React.FC = () => {
  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>("discover", getMovies);
  const { filterValues, setFilterValues, sortOption, setSortOption, sortAndFilter } 
  = useFiltering<BaseMovieProps>([
  titleFiltering,
  genreFiltering,
  castFiltering // useFiltering keep the filter and sort state updated
]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }



  const changeFilterValues = (type: string, value: string) => {
  if (type === "sort") {
    setSortOption(value);
    return;
  }

  
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
      ? [changedFilter, filterValues[1], filterValues[2]]
      : type === "genre"
      ? [filterValues[0], changedFilter, filterValues[2]]// cast added
      : [filterValues[0], filterValues[1], changedFilter]; 
    setFilterValues(updatedFilterSet);
  };

  const movies = data ? data.results : [];
  //const displayedMovies = filterFunction(movies);
  const displayedMovies = sortAndFilter(movies);
  


  // Redundant, but necessary to avoid app crashing.
  //const favourites = movies.filter(m => m.favourite)
  //localStorage.setItem("favourites", JSON.stringify(favourites));
  //const addToFavourites = (movieId: number) => true;

  return (
    <>
      <LoginForm /> 
      <PageTemplate
        title="Discover Movies"
        movies={displayedMovies}
        action={(movie: BaseMovieProps) => {
          return <AddToFavouritesIcon {...movie} />
        }}
      />
      <MovieFilterUI
        onFilterValuesChange={changeFilterValues}
        titleFilter={filterValues[0].value}
        genreFilter={filterValues[1].value}
        castFilter={filterValues[2].value}
        sortOption={sortOption}
        movies={movies}
      />
    </>
  );
};
export default HomePage;
