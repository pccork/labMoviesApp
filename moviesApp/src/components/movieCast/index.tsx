import React, { useState } from "react";
import Chip from "@mui/material/Chip";
//import { useQuery } from "react-query";
//import { getActor } from "../api/tmdb-api";
import Paper from "@mui/material/Paper";
//import AccessTimeIcon from "@mui/icons-material/AccessTime";
//import MonetizationIcon from "@mui/icons-material/MonetizationOn";
//import StarRate from "@mui/icons-material/StarRate";
import Typography from "@mui/material/Typography";
import { MovieCastProps } from "../../types/interfaces";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
//import { Reviews } from "@mui/icons-material";
//import MovieReviews from '../movieReviews'
import Bios from '../Bios'
const styles = {
    chipSet: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        listStyle: "none",
        padding: 1.5,
        margin: 0,
    },
    chipLabel: {
        margin: 0.5,
    },
    fab: {
        position: "fixed",
        top: 50,
        right: 2,
    },
};



const MovieCast: React.FC<MovieCastProps> = (movie) => {

    const [drawerOpen, setDrawerOpen] = useState(false); // New

    return (
        <>
            <Typography variant="h5" component="h3">
                Cast of {movie.title}
            </Typography>

            <Typography variant="h6" component="p">
                {movie.overview}
            </Typography>

            <Paper component="ul" sx={styles.chipSet}>
                <li>
                    <Chip label="Genres" sx={styles.chipLabel} color="primary" />
                </li>
                {movie?.cast?.length ? (
                    movie.cast.map((member) => (
                    <li key={member.id}>
                        <Chip label={`${member.name} as ${member.character}`} />
                    </li>
                   ))
                ) : (
                   <p>No cast data available.</p>
                )}
            </Paper>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                <NavigationIcon />
                Bios
            </Fab>
            <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
               <Bios {...movie} />
            </Drawer>
        </>
    );
};
export default MovieCast;

