import { Box, Typography } from "@mui/material";
import ReviewsList from "../../Components/Restaurant/ReviewsList";
import { useEffect } from "react";
import { setReviews } from "../../slice/restaurant";
import { useDispatch, useSelector } from "react-redux";
import { getReviwer } from "../../APIS/restaurantAPI";
import { setError } from "../../slice/user";

const reviewsData = [
  {
    id: 1,
    reviewer: "User 1",
    date: "2023-01-01",
    content: "Great product!",
    rating: 5,
  },
  {
    id: 2,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 3,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 4,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content:
      "Could be betterCould be betterCould be betterCould be betterCould be betterCould be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3,
  },
  {
    id: 5,
    reviewer: "User 2",
    date: "2023-01-02",
    content: "Could be better",
    rating: 3.5,
  },
  // Add more reviews as needed
];
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
      <Typography variant="h4" sx={{ m: 2 }}>
        Customers Ratings
      </Typography>
      <ReviewsList reviews={reviews} />
    </Box>
  );
}
export default ReviewPage;
