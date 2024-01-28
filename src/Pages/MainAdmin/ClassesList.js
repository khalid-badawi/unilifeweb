import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import { classes as mockClasses } from "../../data/mockData";
import { useParams } from "react-router";
import { addCalss, deleteCalss, getCalsses } from "../../APIS/adminAPI";
import { useDispatch, useSelector } from "react-redux";
import { setClasses } from "../../slice/admin";
import { setError } from "../../slice/user";
import Topbar from "../../Components/Restaurant/Topbar";
const FloorList = () => {
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const dispatch = useDispatch();
  const classes = useSelector((state) => state.admin.classes);
  async function handleDelete(classId) {
    console.log("removed clicked");
    const res = await deleteCalss(id, classId);
    console.log(res);
    let { status } = res;
    if (status === 204) {
      const newClasses = classes.filter((item) => item.id !== classId);
      dispatch(setClasses(newClasses));
    } else {
      status = res.response.status;
      if (status === 401 || status === 403 || status === 404) {
        const {
          response: {
            data: { message },
          },
        } = res;
        dispatch(setError(message));
      }
    }
  }
  return (
    <Box  pl={2} pr={2}>
      <Topbar></Topbar>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 750, overflowY: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#8F00FF" }}>Class</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {classes.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.number}</TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    sx={{
                      color: "#8F00FF",
                      paddingY: 1,
                      height: 40,
                      ":hover": {
                        backgroundColor: "rgba(0,0,0,0.05)",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Remove
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    sx={{
                      color: "#8F00FF",
                      paddingY: 1,
                      height: 40,
                      ":hover": {
                        backgroundColor: "rgba(0,0,0,0.05)",
                        cursor: "pointer",
                      },
                    }}
                  >
                    Set QR Reference
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const ClassesList = () => {
  const [isAddingClass, setIsAddingClass] = useState(false);
  const [facultyName, setFacultyName] = useState("");
  const [newClass, setNewClass] = useState("");
  const classes = useSelector((state) => state.admin.classes);
  const { floorId, facultyId } = useParams();
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetcData() {
      const res = await getCalsses(id, facultyId, floorId);
      console.log("classes:", res);
      let { status } = res;
      if (status === 200) {
        const {
          data: { classrooms, facultyName },
        } = res;
        console.log("data:", classrooms);
        dispatch(setClasses(classrooms));
        setFacultyName(facultyName);
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403) {
          dispatch(setError(message));
        }
      }
    }
    fetcData();
  }, []);
  const handleAddFloorClick = () => {
    setIsAddingClass(true);
  };

  const handleAddCalss = async (e) => {
    e.preventDefault();
    if (newClass.trim() !== "") {
      console.log(newClass);
      const res = await addCalss({ number: newClass }, id, facultyId, floorId);
      console.log("classes:", res);
      let { status } = res;
      if (status === 201) {
        const {
          data: { id },
        } = res;
        const newClasses = [...classes, { number: newClass, id }];
        setNewClass("");
        setIsAddingClass(false);
        dispatch(setClasses(newClasses));
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403) {
          dispatch(setError(message));
        }
      }
    }
  };

  const handleCancelAddFloor = () => {
    setNewClass("");
    setIsAddingClass(false);
  };

  return (
    <Box ml={1} mr={1} height={500}>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {facultyName}
      </Typography>
      <FloorList />
      {isAddingClass ? (
        <Box mt={2}>
          <TextField
            label="New Class"
            variant="outlined"
            value={newClass}
            onChange={(e) => setNewClass(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleAddCalss(e)}
            sx={{
              backgroundColor: "#8F00FF",
              paddingX: 5,
              mr: 2,
              ml: 2,
              paddingY: 1,
              height: 40,

              ":hover": {
                backgroundColor: "#6A00CC", // Change this color for hover effect
                cursor: "pointer", // Optional: Change cursor on hover
              },
            }}
          >
            Add Class
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelAddFloor}
            sx={{
              backgroundColor: "#8F00FF",
              color: "white",
              paddingX: 5,
              paddingY: 1,
              height: 40,

              ":hover": {
                backgroundColor: "#6A00CC", // Change this color for hover effect
                cursor: "pointer", // Optional: Change cursor on hover
              },
            }}
          >
            Cancel
          </Button>
        </Box>
      ) : (
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddFloorClick}
          sx={{
            backgroundColor: "#8F00FF",
            color: "white",
            mt: 2,
            paddingX: 5,
            paddingY: 1,
            height: 40,

            ":hover": {
              backgroundColor: "#6A00CC", // Change this color for hover effect
              cursor: "pointer", // Optional: Change cursor on hover
            },
          }}
        >
          Add
        </Button>
      )}
    </Box>
  );
};

export default ClassesList;
