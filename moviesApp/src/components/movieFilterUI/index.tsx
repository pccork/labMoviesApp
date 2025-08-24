import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BaseMovieProps } from "../../types/interfaces";
import { sortMovies } from "../../util";

export const titleFilter = (movie: BaseMovieProps, value: string): boolean => {
    return movie.title.toLowerCase().search(value.toLowerCase())!== -1;
};

export const genreFilter = (movie: BaseMovieProps, value: string) => {
    const genreId = Number(value);
    const genreIds = movie.genre_ids;
    return genreId > 0 && genreIds ? genreIds.includes(genreId) : true;
};

export const castFilter = (movie: BaseMovieProps, value: string) : boolean => {
  if (!movie.cast || value.trim() === "") return true;
    return movie.cast.some((member) =>
    member.name.toLowerCase().includes(value.toLowerCase())
  );
};


const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface MovieFilterUIProps {
    onFilterValuesChange: (f: string, s: string) => void;
    titleFilter: string;
    genreFilter: string;
    castFilter: string;
    sortOption: string;
    movies: BaseMovieProps[]; 
}


const MovieFilterUI: React.FC<MovieFilterUIProps> = ({ 
    onFilterValuesChange,
    titleFilter,
    genreFilter,
    castFilter,
    sortOption,
   
     }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

   

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    titleFilter={titleFilter}
                    genreFilter={genreFilter}
                    castFilter={castFilter}
                    sortOption={sortOption} 
                />
            </Drawer>
            
        </>
    );
};

export default MovieFilterUI;
