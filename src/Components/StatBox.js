import React from "react";
import { Box, Typography } from "@mui/material";
import ProgressCircle from "./Progress";
export default function StatBox({
  title,
  subtitle,
  icon,
  day,
  perc,
  withPercentage = false,
  total,
}) {
  return (
    <Box
      flexDirection="row"
      flex={1}
      height="150px"
      backgroundColor="#f1eef0"
      p={3}
      pl={2}
      sx={{ borderRadius: 2 }}
      display="flex"
      justifyContent="space-between"
    >
      <Box>
        <Box display="flex" justifyContent="space-between">
          {icon}
        </Box>
        <Box>
          <Typography variant="h5" fontWeight="bold" sx={{ color: "black" }}>
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#8F00FF",
              fontSize: 14,
              fontWeight: "500",
              mt: "1px",
            }}
          >
            {subtitle}
          </Typography>
        </Box>
        {total && (
          <Box flexDirection="row" display="flex">
            <Typography
              sx={{
                color: "black",
                fontSize: 15,
                fontWeight: "500",
                mt: "1px",
              }}
            >
              {"("}
              {total} Total{")"}
            </Typography>
          </Box>
        )}
      </Box>
      {withPercentage && (
        <Box mt="10px">
          <ProgressCircle />
          <Typography
            sx={{
              color: "#8F00FF",
              fontSize: 15,
              mt: "10px",
              ml: "6px",
              fontWeight: "500",
            }}
          >
            {perc}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
