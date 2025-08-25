import React from "react"; // replace existing react import
import { useParams } from "react-router-dom";
//import MovieDetails from "../components/movieDetails";
import PageTemplate from "../components/templateMoviePage";
import useMovie from "../hooks/useMovie";
import { getMovieCast } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner';
//import { MovieDetailsProps } from "../types/interfaces";
import { CastMember, MovieCastProps } from "../types/interfaces";
import MovieCast from "../components/movieCast";


const MovieCastPage: React.FC= () => {
  const { id } = useParams();
  const [movieDetails] = useMovie(id || "");

  const { data: castData, error, isLoading, isError } = useQuery<{cast: CastMember[]}, Error>(
    ["movie", id],
    ()=> getMovieCast(id||"")
  );

  if (!movieDetails || isLoading) {
    return <Spinner />;
  }


  /*
  const { data: movie, error, isLoading, isError } = useQuery<MovieCastProps, Error>(
    ["movie", id],
    ()=> getMovieCast(id||"")
  );

  if (isLoading) {
    return <Spinner />;
  }
  */

  if (isError) {
    return <h1>{(error as Error).message}</h1>;
  }
  
  const movie : MovieCastProps = {
    ...movieDetails,
    cast: castData?.cast ||[]

  };
  

  return (
    <>
      {movie ? (
        <>
        <PageTemplate movie={movie}> 
          <MovieCast {...movie} />
        </PageTemplate>
      </>
    ) : (
      <p>Waiting for movie details</p>
    )}
    </>
  );
};

export default MovieCastPage;
