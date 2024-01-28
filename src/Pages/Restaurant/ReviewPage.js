import { Box, Typography } from "@mui/material";
import ReviewsList from "../../Components/Restaurant/ReviewsList";
import { useEffect } from "react";
import { setReviews } from "../../slice/restaurant";
import { useDispatch, useSelector } from "react-redux";
import { getReviwer } from "../../APIS/restaurantAPI";
import { setError } from "../../slice/user";
import SwitchButton from "../../Components/Restaurant/SwitchButton";
import Topbar from "../../Components/Restaurant/Topbar";

function ReviewPage() {
  const id = useSelector((state) => state.user.id);

  const reviews = useSelector((state) => state.restaurant.reviews);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const res = await getReviwer(id);
      let { status } = res;
      if (status === 200) {
        const { data } = res;
        console.log(data);
        dispatch(setReviews(data));
      } else {
        status = res.response.status;
        const {
          response: {
            data: { message },
          },
        } = res;
        if (status === 401 || status === 403 || status === 500) {
          dispatch(setError(message));
        }
      }
    }

    fetchData();
  }, []);
  return (
    <Box sx={{ height: "91%", overflowY: "auto" }}>
      <Topbar>
        <SwitchButton />
      </Topbar>

      <ReviewsList reviews={reviews} />
    </Box>
  );
}
export default ReviewPage;
