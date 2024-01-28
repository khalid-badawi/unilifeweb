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
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user"; // Assuming you have appropriate Redux slice actions
import { setMajors } from "../../slice/admin"; // Assuming you have appropriate Redux slice actions
import { addMajor, getMajor, removeMajor } from "../../APIS/adminAPI";
import Topbar from "../../Components/Restaurant/Topbar";
const dummyMajors = [
  { id: 1, majorName: "Computer Science" },
  { id: 2, majorName: "Mathematics" },
];
const MajorsList = () => {
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const dispatch = useDispatch();
  const majors = useSelector((state) => state.admin.majors); // Assuming you have majors in the Redux state
  const [isAddingMajor, setIsAddingMajor] = useState(false);
  const [newMajor, setNewMajor] = useState("");
  const handleRemove = async (majorId) => {
    try {
      const res = await removeMajor(id, majorId);
      const { status } = res;
      if (status === 204) {
        const newMajors = majors.filter((item) => item.id !== majorId);
        dispatch(setMajors(newMajors));
      } else {
        const { message } = res.response.data;
        dispatch(setError(message));
      }
    } catch (error) {
      console.error("Error fetching majors:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMajor(id);
        const { status } = res;
        if (status === 200) {
          const { data } = res;
          dispatch(setMajors(data));
        } else {
          const { message } = res.response.data;
          dispatch(setError(message));
        }
      } catch (error) {
        console.error("Error fetching majors:", error);
      }
    }

    fetchData();
  }, []);

  const handleAddMajorClick = () => {
    setIsAddingMajor(true);
  };

  const handleAddMajor = async (e) => {
    e.preventDefault();
    if (newMajor.trim() !== "") {
      try {
        const res = await addMajor(id, { name: newMajor });

        const { status } = res;
        if (status === 201) {
          const { id } = res.data;
          console.log(res.data);
          const newMajors = [...majors, { id, name: newMajor }];
          setNewMajor("");
          setIsAddingMajor(false);
          dispatch(setMajors(newMajors));
        } else {
          const { message } = res.response.data;
          dispatch(setError(message));
        }
      } catch (error) {
        console.error("Error adding major:", error);
      }
    }
  };

  const handleCancelAddMajor = () => {
    setNewMajor("");
    setIsAddingMajor(false);
  };

  return (
    <Box ml={1} mr={1} height={500}>
      <Topbar></Topbar>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: 750, overflowY: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#8F00FF" }}>id</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>Major Name</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          {majors && (
            <TableBody>
              {majors.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.name}</TableCell>

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
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </Button>
                  </TableCell>
                  {/* You can add additional actions for each major if needed */}
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {isAddingMajor ? (
        <Box mt={2}>
          <TextField
            label="New Major"
            variant="outlined"
            value={newMajor}
            onChange={(e) => setNewMajor(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => handleAddMajor(e)}
            sx={{
              backgroundColor: "#8F00FF",
              paddingX: 5,
              mr: 2,
              ml: 2,
              paddingY: 1,
              height: 40,
              ":hover": {
                backgroundColor: "#6A00CC",
                cursor: "pointer",
              },
            }}
          >
            Add Major
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancelAddMajor}
            sx={{
              backgroundColor: "#8F00FF",
              color: "white",
              paddingX: 5,
              paddingY: 1,
              height: 40,
              ":hover": {
                backgroundColor: "#6A00CC",
                cursor: "pointer",
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
          onClick={handleAddMajorClick}
          sx={{
            backgroundColor: "#8F00FF",
            color: "white",
            mt: 2,
            paddingX: 5,
            paddingY: 1,
            height: 40,
            ":hover": {
              backgroundColor: "#6A00CC",
              cursor: "pointer",
            },
          }}
        >
          Add Major
        </Button>
      )}
    </Box>
  );
};

export default MajorsList;
