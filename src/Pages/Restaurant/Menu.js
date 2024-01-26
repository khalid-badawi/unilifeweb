import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import MenuCard from "../../Components/Restaurant/MenuCard";
import { getMyMenu } from "../../APIS/restaurantAPI";
import { useDispatch, useSelector } from "react-redux";
import { setMenu } from "../../slice/restaurant";
import { setError, setId } from "../../slice/user";
//import { Buffer } from "buffer";
export default function Menu() {
  const id = useSelector((state) => state.user.id);
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.restaurant.menu);
  useEffect(() => {
    const fetchMenu = async () => {
      const res = await getMyMenu(id);

      let { status } = res;
      if (status === 200) {
        console.log(status);
        const { data } = res;
        console.log(data);
        dispatch(setMenu(data));
      } else {
        console.log("message", res.response.data);
        status = res.response.status;
        console.log("status", status);
        console.log(status);
        if (status === 403 || status === 404 || status === 401) {
          const message = res.response.data.message;
          dispatch(setError(message));
        }
      }
    };
    fetchMenu();
  }, []);

  return (
    <Box sx={{ pl: 2 }} display="grid">
      <Grid container spacing={1} rowSpacing={3}>
        {menu.map((menuItem) => {
          const { nameOfFood, price, description, image, foodId } = menuItem;

          return (
            <Grid item xs={3}>
              <MenuCard
                title={nameOfFood}
                img={image}
                price={price}
                desc={description}
                key={foodId}
                foodId={foodId}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
