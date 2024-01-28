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
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user"; // Assuming you have appropriate Redux slice actions
import { setCategories } from "../../slice/admin"; // Assuming you have appropriate Redux slice actions
import { addCategory, getCategory, removeCategory } from "../../APIS/adminAPI";
import Topbar from "../../Components/Restaurant/Topbar";
import SuccessMessage from "../../Components/Success";

const Categories = () => {
  const [success, setSuccess] = useState("");
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const navigate = useNavigate();
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.admin.categories); // Assuming you have categories in the Redux state
  const [isAddingMajor, setIsAddingMajor] = useState(false);
  const [newCategory, setNewMajor] = useState("");
  const handleRemove = async (majorId) => {
    try {
      const res = await removeCategory(id, majorId);
      const { status } = res;
      if (status === 204) {
        const newMajors = categories.filter((item) => item.id !== majorId);
        dispatch(setCategories(newMajors));
        setSuccess("Data deleted successfully");
        setSuccessMessageOpen(true);
        setTimeout(() => {
          handleSuccessMessageClose();
        }, 3000);
      } else {
        const { message } = res.response.data;
        dispatch(setError(message));
        navigate("/error");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategory(id);
        const { status } = res;
        if (status === 200) {
          const { data } = res;
          dispatch(setCategories(data));
          setSuccess("Data Geted successfully");
          setSuccessMessageOpen(true);
          setTimeout(() => {
            handleSuccessMessageClose();
          }, 3000);
        } else {
          const { message } = res.response.data;
          dispatch(setError(message));
          navigate("/error");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
  }, []);

  const handleAddMajorClick = () => {
    setIsAddingMajor(true);
  };

  const handleAddMajor = async (e) => {
    e.preventDefault();
    if (newCategory.trim() !== "") {
      try {
        const res = await addCategory(id, { name: newCategory });

        const { status } = res;
        if (status === 201) {
          const { id } = res.data;
          console.log(res.data);
          const newMajors = [...categories, { id, name: newCategory }];
          setNewMajor("");
          setIsAddingMajor(false);
          dispatch(setCategories(newMajors));
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
              <TableCell sx={{ color: "#8F00FF" }}>Category</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories &&
              categories.map((item, index) => (
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
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isAddingMajor ? (
        <Box mt={2}>
          <TextField
            label="New Category"
            variant="outlined"
            value={newCategory}
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
            Add Category
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
          Add Category
        </Button>
      )}
      <SuccessMessage
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        message={success}
      />
    </Box>
  );
};

export default Categories;
