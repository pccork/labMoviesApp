import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review } from "../types/interfaces";


interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addToPlaylist: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);
    playlist: number[]; 
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    playlist: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addToPlaylist: () => {},
    addReview: (movie, review) => { movie.id, review},
    
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [myReviews, setMyReviews] = useState<Review[]>( [] )  // NEW
    const [favourites, setFavourites] = useState<number[]>([]);
    const [playlist, setPlaylist] = useState<number[]>([]);
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

    const addToPlaylist = useCallback((movie: BaseMovieProps) => {
        setPlaylist((prevPlaylist) => {
            if (!prevPlaylist.includes(movie.id)) {
                return [...prevPlaylist, movie.id];
            }
            return prevPlaylist;
        });
    }, []); 
    



    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                playlist,
                addToFavourites,
                removeFromFavourites,
                addReview,// NEW
                addToPlaylist,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;
