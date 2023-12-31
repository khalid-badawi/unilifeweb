import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Box, ListItemSecondaryAction } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderDetails({ isModalOpen, handleCloseModal }) {
  return (
    <React.Fragment>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        fullWidth
        maxWidth="xl" // Set the desired maxWidth (xs, sm, md, lg, xl)
      >
        <AppBar
          sx={{
            position: "relative",
            backgroundColor: "#8F00FF",
          }}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Order Details
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            m: 2,
            mr: 15,
            ml: 2,
            pt: 1,
          }}
        >
          <Box sx={{ ml: 2, mr: 3 }}>
            <Typography variant="subtitle2">Order ID</Typography>
            <Typography variant="body1">3</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Name</Typography>
            <Typography variant="body1">Khalid Badawi</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Phone number</Typography>
            <Typography variant="body1">0597401453</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Ordered at</Typography>
            <Typography variant="body1">0597401453</Typography>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "#8F00FF", mr: 2, ml: 2 }} />
        <Box sx={{ pr: 2, pl: 2, mt: 2 }}>
          <List
            sx={{
              height: 400,
              overflow: "auto",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              mt: 1,
            }}
          >
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{}}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ color: "#8F00FF" }}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{}}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ color: "#8F00FF" }}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{}}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ color: "#8F00FF" }}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{}}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" style={{ color: "#8F00FF" }}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText
                primary={
                  <Typography variant="h6" sx={{}}>
                    Cheese Burger{" "}
                  </Typography>
                }
                secondary="100₪"
              />
              <ListItemSecondaryAction>
                <span style={{ color: "gray" }}>x1</span>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </Box>
        <Divider sx={{ mt: 1 }} />
        <Box
          sx={{
            mr: 2,
            ml: 2,
            mt: 3,
            pb: 5,
            pl: 1,
            pr: 2,
            pt: 1,
            backgroundColor: "rgba(0, 0, 0, 0.05)", // Adjust the opacity and color as needed
          }}
        >
          <Typography
            variant="h6"
            component="div"
            sx={{
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          >
            Notes:
          </Typography>
          <Typography
            variant="body1"
            component="div"
            sx={{
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          >
            No hot sausage, no union
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            sx={{
              color: "white",
              backgroundColor: "#8F00FF",
              width: 150,
              borderColor: "#8F00FF",
              padding: 1,
              borderRadius: 5,
              mt: 3,
              ":hover": {
                color: "#8F00FF",
                backgroundColor: "white",
                borderColor: "#8F00FF",
              },
            }}
            variant="outlined"
            color="primary"
          >
            Update to
          </Button>
          <Button
            sx={{
              color: "white",
              backgroundColor: "#8F00FF",
              width: 150,
              borderColor: "#8F00FF",
              padding: 1,
              borderRadius: 5,
              m: 1,
              mb: 3,
              ":hover": {
                color: "#8F00FF",
                backgroundColor: "white",
                borderColor: "#8F00FF",
              },
            }}
            variant="outlined"
            color="primary"
          >
            Cancel Order
          </Button>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
