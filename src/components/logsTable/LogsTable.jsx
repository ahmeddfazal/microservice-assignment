/* eslint-disable no-unused-vars */
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import { Toolbar } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getAllImages } from "../../commonServices";
import { imageDataFormatter } from "../../constants";

export default function LogsTable() {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);

  useEffect(() => {
    (async () => {
      const username = localStorage.getItem("username");
      if (!username) navigate("/");
      const { user_info } = await getAllImages(username);
      setData(user_info);
    })();
  }, []);

  const onHomeClick = () => {
    navigate("/imageUploader");
  };

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "5em" }}
    >
      <TableContainer component={Paper} sx={{ maxWidth: 650 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <h1>User Logs</h1>
          <Button variant="contained" onClick={onHomeClick}>
            Home
          </Button>
        </Toolbar>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Operation</b>
              </TableCell>
              <TableCell align="right">
                <b>Updated At</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => {
              const [id, updatedAt, , , imageSize, isDeleted] = row ?? [];
              return (
                <TableRow
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {isDeleted === "N" ? "Image Added" : "Image Deleted"}
                  </TableCell>
                  <TableCell align="right">{imageSize}</TableCell>
                  <TableCell align="right">{updatedAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
