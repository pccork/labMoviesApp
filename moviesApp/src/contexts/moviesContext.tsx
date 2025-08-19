import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    mustWatch: number[]; 
    addToFavourites: ((movie: BaseMovieProps) => void);
    addToMustWatch:((movie: BaseMovieProps) => void);
    removeFromMustWatch: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    //addToPlaylist: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);
    
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    mustWatch: [], 
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addToMustWatch: () => {},
    removeFromMustWatch: () => {},
    addReview: (movie, review) => { movie.id, review},
    
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] )  // NEW
    const [favourites, setFavourites] = useState<number[]>([]);
    const [mustWatch, setMustWatch] = useState<number[]>([]);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
      };

    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

    const addToMustWatch = useCallback((movie: BaseMovieProps) => {
        setMustWatch((prevMustWatch) => {
            if (!prevMustWatch.includes(movie.id)) {
                console.log("Added to mustWatch:", prevMustWatch); //Exercise 4 must watch array
                return [...prevMustWatch, movie.id];
            }
            return prevMustWatch;
        });
    }, []); 
    

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const removeFromMustWatch = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevMustWatch) => prevMustWatch.filter((mId) => mId !== movie.id));
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                mustWatch,
                addToFavourites,
                removeFromFavourites,
                removeFromMustWatch,
                addReview,// NEW
                addToMustWatch,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
