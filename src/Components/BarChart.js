import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
//import { mockBarData as data } from "../data/mockData";
import { useSelector } from "react-redux";

const customTooltip = (bar) => {
  return (
    <Box>
      {" "}
      <Typography variant="body1">count:{bar.data.orderCount}</Typography>
    </Box>
  );
};

const BarChart = ({ isDashboard = false }) => {
  // const theme = useTheme();
  const foodDashBoard = useSelector((state) => state.restaurant.dashBoardFood);
  const colors = ["green", "yellow", "orange", "red", "purple"];

  const data = foodDashBoard.map((item, i) => ({ ...item, color: colors[i] }));
  return (
    <ResponsiveBar
      data={data}
      theme={{
        // added
        axis: {
          domain: {
            line: {
              stroke: "black",
            },
          },
          legend: {
            text: {
              fill: "black",
            },
          },
          ticks: {
            line: {
              stroke: "black",
              strokeWidth: 1,
            },
            text: {
              fill: "black",
            },
          },
        },
        legends: {
          text: {
            fill: "black",
          },
        },
      }}
      keys={["orderCount"]}
      indexBy="nameOfFood"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      width={700}
      padding={0.5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={(bar) => bar.data.color} // Assign color dynamically from the data
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Food Type",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Quantity",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={false}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      role="application"
      tooltip={customTooltip}
    />
  );
};

export default BarChart;
