import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import FloorsList from "./FloorsList";
import { dummyFaculties, floors } from "../../data/mockData";
import { useDispatch, useSelector } from "react-redux";
import { deleteFaculty, editFaculty, getFaculties } from "../../APIS/adminAPI";
import { setColleges, setFloors } from "../../slice/admin";
import { setError } from "../../slice/user";

const FacultyList = () => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const colleges = useSelector((state) => state.admin.colleges);
  const id = useSelector((state) => state.user.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  async function handleEdit(faculty) {
    const res = await editFaculty(id, faculty.facultyNumber);
    console.log(res);
  }
  async function handleDelete(facultyNumber) {
    console.log(facultyNumber);
    const res = await deleteFaculty(id, facultyNumber);
    console.log(res);
    let { status } = res;
    if (status === 204) {
      const newColleges = colleges.filter(
        (item) => item.facultyNumber !== facultyNumber
      );
      dispatch(setColleges(newColleges));
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
  useEffect(() => {
    async function fetchData() {
      const res = await getFaculties(id);
      console.log("res:", res);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        console.log("data:", data);
        dispatch(setColleges(data));
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
    fetchData();
  }, []);
  const handleViewFloors = (faculty) => {
    setSelectedFaculty(faculty);
    navigate(`/admin/floors/${faculty.facultyNumber}`);
    console.log(faculty);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#8F00FF" }}>Faculty Name</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>Faculty Number</TableCell>
              <TableCell sx={{ color: "#8F00FF" }}>Coordinates</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {colleges.map((faculty, index) => (
              <TableRow key={index}>
                <TableCell>{faculty.facultyName}</TableCell>
                <TableCell>{faculty.facultyNumber}</TableCell>
                <TableCell>
                  {faculty.locations.map((coord, coordIndex) => (
                    <div key={coordIndex}>
                      Longitude: {coord.lon}, Latitude: {coord.lat}
                    </div>
                  ))}
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
                    onClick={() => handleEdit(faculty)}
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
                    onClick={() => handleDelete(faculty.facultyNumber)}
                  >
                    Remove
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    onClick={() => handleViewFloors(faculty)}
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
                    View Floors
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedFaculty && <FloorsList faculty={selectedFaculty} />}
    </div>
  );
};

export default FacultyList;
