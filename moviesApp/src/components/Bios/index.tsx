import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getActor } from "../../api/tmdb-api";
//import { excerpt } from "../../util";

import type { MovieBioProps, ActorBio } from "../../types/interfaces"; // Import the MovieT type from the appropriate location

const styles = {
    table: {
        minWidth: 550,
    },
};

const Bios: React.FC<MovieBioProps> = ({cast} ) => { 
    const [bios, setBios] = useState<ActorBio[]>([]);

    useEffect(() => {
           const fetchAllBios = async () => {
            const results: ActorBio[] =[];
            for (const member of cast) {
                try{const bio = await getActor(String(member.id));
                    results.push(bio);
                } catch (error) {
                    console.error(`Failed to fetch Biofor ${member.name}`,error);
                }
                }setBios(results);

            };
             fetchAllBios();
           }, [cast]);
           // eslint-disable-next-line react-hooks/exhaustive-deps
       


  return (
    <TableContainer component={Paper}>
      <Table sx={styles.table} aria-label="actor bio table">
        <TableHead>
          <TableRow>
            <TableCell>Actor</TableCell>
            <TableCell align="center">Place of Birth</TableCell>
            <TableCell align="center">Biography</TableCell>
            <TableCell align="right">More</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bios.map((actor) => (
            <TableRow key={actor.id}>
              <TableCell component="th" scope="row">
                {actor.name}
              </TableCell>
              <TableCell align="center">{actor.place_of_birth || "—"}</TableCell>
              <TableCell align="center">
                {actor.biography.length > 150
                  ? `${actor.biography.slice(0, 150)}...`
                  : actor.biography || "No bio available"}
              </TableCell>
              <TableCell align="right">
                <Link to={`/actors/${actor.id}`} state={{ actor }}>
                  Full Bio
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Bios;