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
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user"; // Assuming you have appropriate Redux slice actions
import { setAds } from "../../slice/admin"; // Assuming you have appropriate Redux slice actions
import { deleteAd, getAdds } from "../../APIS/adminAPI";
const ADsList = () => {
  const navigate = useNavigate();
  const id =
    useSelector((state) => state.user.id) || localStorage.getItem("id");
  const adds = useSelector((state) => state.admin.ads);
  const dispatch = useDispatch();
  const [isAddingAdd, setIsAddingAdd] = useState(false);
  const handleEdit = async (id) => {
    console.log(id);
    navigate(`/admin/adsedit/${id}`);
  };
  const handleRemove = async (adId) => {
    const res = await deleteAd(id, adId);
    let { status } = res;
    if (status === 204) {
      const newAds = adds.filter((ad) => ad.id !== adId);
      dispatch(setAds(newAds));
    } else {
      status = res.response.status;
      if (
        status === 401 ||
        status === 409 ||
        status === 403 ||
        status === 500
      ) {
        const {
          response: {
            data: { message },
          },
        } = res;
        dispatch(setError(message));
      }
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(id);
        const res = await getAdds(id);
        console.log(res);
        const { status } = res;
        if (status === 200) {
          const { data } = res;
          dispatch(setAds(data));
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
    setIsAddingAdd(true);
  };

  const handleAddMajor = async (e) => {
    /* e.preventDefault();
    if (newMajor.trim() !== "") {
      try {
        // Replace the following line with your API call to add a major
        // const res = await addMajor({ majorName: newMajor }, id);
        // For demonstration purposes, using mock data
        const res = { data: { id: 3 } };

        const { status } = res;
        if (status === 201) {
          const { id } = res.data;
          const newMajors = [...majors, { id, majorName: newMajor }];
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
    }*/
  };

  return (
    <Box ml={1} mr={1} height={500}>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: 750, overflowY: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#8F00FF" }}>id</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>image</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>title</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>description</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adds.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {" "}
                  <Avatar
                    alt="AD image"
                    src={item.image}
                    sx={{ borderRadius: "5px" }}
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.description}</TableCell>

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
                    onClick={() => handleEdit(item.id)}
                  >
                    Edit
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
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
                {/* You can add additional actions for each major if needed */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ADsList;
