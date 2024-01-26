import { Box, Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";

export default function ReviewsList({ reviews }) {
  return (
    <Box sx={{ pl: 2 }} display="grid">
      <Grid container spacing={1} rowSpacing={3}>
        {reviews.map((review, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <ReviewCard
              reviewer={review.reviewer}
              date={review.date}
              content={review.content}
              rating={review.rating}
              phoneNum={review.phoneNum}
              id={review.id}
              image={review.image}
              orderId={review.orderId}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
