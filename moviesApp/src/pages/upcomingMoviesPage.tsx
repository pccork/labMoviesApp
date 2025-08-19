import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from "react-query";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { getUpcomingMovies } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
  titleFilter,
  genreFilter,
} from "../components/movieFilterUI";

import Spinner from "../components/spinner";
//import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import AddToPlaylistIcon from "../components/cardIcons/addToPlaylist";

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



const UpcomingMoivesPage: React.FC = () => {
  //const [movies, setMovies] = useState<BaseMovieProps[]>([]); 
  //const favourites = movies.filter(m => m.favourite)


  const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
      "upcoming",
      getUpcomingMovies,
    );
  const { filterValues, setFilterValues, filterFunction } = useFiltering(
    [titleFiltering, genreFiltering]);

  const changeFilterValues = (type: string, value: string) => {
    const changedFilter = { name: type, value: value };
    const updatedFilterSet =
      type === "title"
        ? [changedFilter, filterValues[1]]
        : [filterValues[0], changedFilter];
    setFilterValues(updatedFilterSet);
  };
  
  if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    

    const movies = data ? data.results : [];
    const displayedMovies = filterFunction(movies);
  return (
    <>
    <PageTemplate
      title='Upcoming Movies'
      movies={displayedMovies}
      action={(movie: BaseMovieProps) => {
                    return <AddToPlaylistIcon {...movie} />
                }}
     
    />
    <MovieFilterUI
     onFilterValuesChange={changeFilterValues}
     titleFilter={filterValues[0].value}
    genreFilter={filterValues[1].value}           
    />
  </>

  )
};




export default UpcomingMoivesPage;
