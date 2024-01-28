import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../../slice/user";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { addPost, addRoom, editRoom } from "../../APIS/dormitoryAPI";
import OneRoomForm from "../../Components/Dormitory/OneRoomForm";
import SuccessMessage from "../../Components/Success";

const EditRoom = () => {
  const navigate = useNavigate();
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  console.log("addRoom");
  const { dormitoryId, roomId } = useParams();
  console.log("dormitoryId", dormitoryId, "roomId", roomId);
  const [successMessageOpen, setSuccessMessageOpen] = useState(false);
  const handleSuccessMessageClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSuccessMessageOpen(false);
  };
  const posts = useSelector((state) => state.dormitory.posts);
  const post = posts.filter((post) => post.id === parseInt(dormitoryId))[0];
  const { rooms } = post;
  const room = rooms.filter((room) => room.id === parseInt(roomId))[0];
  const { numberOfPerson, avilableSeat, type, rent, image } = room;
  console.log("room", room);
  const formik = useFormik({
    initialValues: {
      roomImage: "",
      numberOfPerson,
      avilableSeat,
      type,
      rent,
      URL: image,
    },
    validationSchema: Yup.object({
      roomImage: Yup.mixed(),
      numberOfPerson: Yup.number()
        .required("Required")
        .min(1, "Should be at least 1 person"),
      avilableSeat: Yup.number()
        .required("Required")
        .min(0, "Should be at least 0 place"),
      type: Yup.string().required("Required"),
      rent: Yup.number().required("Required").min(0, "Should be at least 0"),
    }),
    onSubmit: async (values) => {
      console.log("Submitting single room111:", values);

      console.log("dormitoryId", dormitoryId);
      console.log("id", id);
      const res = await editRoom(id, dormitoryId, roomId, values);
      console.log("API Response:", res);
      let status = res.status;
      console.log(res);
      if (status === 200) {
        formik.setFieldValue("numberOfPerson", "");
        formik.setFieldValue("avilableSeat", "");
        formik.setFieldValue("type", "");
        formik.setFieldValue("rent", "");
        formik.setFieldValue("image", "");
        setSuccessMessageOpen(true);
        setTimeout(() => {
          handleSuccessMessageClose();
        }, 3000);
      } else {
        status = res.response.status;
        if (
          status === 401 ||
          status === 409 ||
          status === 403 ||
          status === 500
        ) {
          const {
            response: { message },
          } = res;
          dispatch(setError(message));
        } else {
          dispatch(setError("An error occured please try again"));
        }
        navigate("/error");
      }
    },
  });

  return (
    <Box pl={2} pr={2}>
      <form onSubmit={formik.handleSubmit}>
        <OneRoomForm formik={formik} />

        <Box mt={2}>
          <Button
            variant="contained"
            type="submit"
            sx={{
              backgroundColor: "#8F00FF",
              paddingX: 15,
              paddingY: 1,
              height: 40,
              ":hover": {
                backgroundColor: "#6A00CC",
                cursor: "pointer",
              },
              mb: 1,
            }}
          >
            Edit Room
          </Button>
        </Box>
      </form>
      <SuccessMessage
        open={successMessageOpen}
        onClose={handleSuccessMessageClose}
        message="Data edited successfully!" // Customize the success message
      />
    </Box>
  );
};
export default EditRoom;
