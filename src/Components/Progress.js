import { Box, useTheme } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "37" }) => {
  const theme = useTheme();

  const angle = progress * 360;

  return (
    <Box
      sx={{
        background: `radial-gradient(#f1eef0 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg,white ${angle}deg 360deg),
            #8F00FF`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
