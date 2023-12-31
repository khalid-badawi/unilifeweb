import { Box, Grid } from "@mui/material";
import ReviewCard from "./ReviewCard";

export default function ReviewsList({ reviews }) {
  return (
    <Box sx={{ pl: 2 }} display="grid">
      <Grid container spacing={1} rowSpacing={3}>
        {reviews.map((review, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <ReviewCard {...review} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
