import { useEffect, useState } from "react";
import { getUpcomingMovies } from '../api/tmdb-api'
//import { UpcomingMovie } from '../types/interfaces';
import { MovieDetailsProps } from '../types/interfaces';


  const useUpcomingMovies = (id: string) => {
      const [movie, setMovie] = useState<MovieDetailsProps>();
      useEffect(() => {
          getUpcomingMovies().then(movie => {
              console.log("Fetched upcoming movie by ID:", movie);
              setMovie(movie);
          });
      }, [id]);
      return [movie, setMovie] as const;
  };


  


export default useUpcomingMovies
