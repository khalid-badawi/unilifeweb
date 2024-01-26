import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@mui/material"; // Import Material-UI components
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen } from "../../slice/restaurant";
import { setError } from "../../slice/user";
import { setOpened } from "../../APIS/restaurantAPI";
export default function SwitchButton() {
  const id = useSelector((state) => state.user.id);
  const isOpen = useSelector((state) => state.restaurant.isOpen);
  const dispatch = useDispatch();
  async function handleSwitch() {
    const res = await setOpened(id);
    let { status } = res;
    console.log(res);
    if (status === 200) {
      dispatch(setIsOpen(!isOpen));
    } else {
      status = res.response.status;
      console.log(status);
      if (
        status === 500 ||
        status === 401 ||
        status === 403 ||
        status === 404
      ) {
        const message = res.response.data.message;
        dispatch(setError(message));
      }
    }
  }
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch defaultChecked={isOpen} onChange={handleSwitch} />}
        label={isOpen ? "open" : "closed"}
      />
    </FormGroup>
  );
}
