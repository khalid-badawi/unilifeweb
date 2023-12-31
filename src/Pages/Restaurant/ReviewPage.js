import { Box, Typography } from "@mui/material";
import ReviewsList from "../../Components/Restaurant/ReviewsList";
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
  return (
    <Box sx={{ height: "91%", overflowY: "auto" }}>
      <Typography variant="h4" sx={{ m: 2 }}>
        Customers Ratings
      </Typography>
      <ReviewsList reviews={reviewsData} />
    </Box>
  );
}
export default ReviewPage;
