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
import { useSelector } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OrderDetails({
  isModalOpen,
  handleCloseModal,
  id,
  handleUpdateClick,
  
}) {
  const orders = useSelector((state) => state.restaurant.orders);
  console.log("inside detailed:", id);

  const order = orders.filter((item) => item.id === id)[0];
  const userId = useSelector((state) => state.user.id);
  const { studentName, phoneNum, createdAt, items, notes } = order;
  /* const updateOrder = async (e) => {
    e.preventDefault();
    const res = await updateOrders(userId, id);
    console.log(res);
  };*/
  console.log("inside detailed order:", order);
  const formattedDate = new Date(createdAt);
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
            <Typography variant="body1">{id}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Name</Typography>
            <Typography variant="body1">{studentName}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Phone number</Typography>
            <Typography variant="body1">{phoneNum}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">Ordered at</Typography>
            <Typography variant="body1">
              {formattedDate.toLocaleString()}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ backgroundColor: "#8F00FF", mr: 2, ml: 2 }} />
        <Box sx={{ pr: 2, pl: 2, mt: 2 }}>
          <List
            sx={{
              height: 500,
              overflow: "auto",
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              mt: 1,
            }}
          >
            {items &&
              items.map((item, i) => {
                console.log(i);
                const style = i % 2 === 1 ? { color: "#8F00FF" } : {};
                return (
                  <>
                    <ListItem>
                      <ListItemText
                        primary={
                          <Typography variant="h6" sx={{}} style={style}>
                            {item.nameOfFood}
                          </Typography>
                        }
                        secondary={`${item.unitPrice}₪`}
                      />
                      <ListItemSecondaryAction>
                        <span style={{ color: "gray" }}>x{item.Qauntity}</span>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
          </List>
        </Box>
        <Divider sx={{ mt: 1 }} />
        {notes && (
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
              mb: 1,
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
              {notes}
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Box>
      </Dialog>
    </React.Fragment>
  );
}
