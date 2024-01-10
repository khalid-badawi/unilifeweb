import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./Components/Restaurant/Sidebar";
import Topbar from "./Components/Restaurant/Topbar";
import Home from "./Pages/Restaurant/Home";
import Login from "./Pages/Login";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/RestaurantMenu";
import OrdersIcon from "@mui/icons-material/TableRestaurant";
import ReviewsIcon from "@mui/icons-material/StarHalf";
import AddIcon from "@mui/icons-material/Add";
import Orders from "./Pages/Restaurant/Orders";
import Menu from "./Pages/Restaurant/Menu";
import AddItem from "./Pages/Restaurant/AddItem";
import ReviewPage from "./Pages/Restaurant/ReviewPage";
import EditItem from "./Pages/Restaurant/EidtItem";
import AddRestaurant from "./Pages/MainAdmin/AddRestaurant";
import AddFaculty from "./Pages/MainAdmin/AddFaculty";
import FacultyList from "./Pages/MainAdmin/FacultyList";
import FloorsList from "./Pages/MainAdmin/FloorsList";
import EditFaculty from "./Pages/MainAdmin/EditFaculty";
const restaurantSidebar = [
  { title: "Dashboard", to: "/restaurant/home", icon: <HomeOutlinedIcon /> },
  { title: "Menu", to: "/restaurant/menu", icon: <MenuIcon /> },
  { title: "Add to menu", to: "/restaurant/menuadd", icon: <AddIcon /> },
  { title: "Orders", to: "/restaurant/orders", icon: <OrdersIcon /> },
  { title: "Ratings", to: "/restaurant/reviews", icon: <ReviewsIcon /> },
];
const adminSidebar = [
  { title: "Dashboard", to: "/admin/home", icon: <HomeOutlinedIcon /> },
  { title: "Users", to: "/admin/users", icon: <MenuIcon /> },
  { title: "Add Restaurant", to: "/admin/restaurantadd", icon: <AddIcon /> },
  { title: "Add Faculty", to: "/admin/facultyadd", icon: <AddIcon /> },
  { title: "Faculties", to: "/admin/faculties", icon: <OrdersIcon /> },
];

function App() {
  const location = useLocation();

  const isSignInPage = location.pathname === "/signin";

  const renderSidebar = () => {
    if (isSignInPage) {
      return null;
    }

    return (
      <>
        <Sidebar menuItems={adminSidebar} />
      </>
    );
  };
  const renderTopbar = () => {
    if (isSignInPage) {
      return null;
    }

    return (
      <>
        <Topbar />
      </>
    );
  };

  return (
    <div className="app">
      {renderSidebar()}

      <CssBaseline />
      <main className="content">
        {renderTopbar()}
        <Routes>
          <Route path="/restaurant/home" element={<Home />} />
          <Route path="/signin" element={<Login />} index />
          <Route path="/restaurant/orders" element={<Orders />} />
          <Route path="/restaurant/menu" element={<Menu />} />
          <Route path="/restaurant/menuadd" element={<AddItem />} />
          <Route path="/restaurant/menuedit/:foodId" element={<EditItem />} />
          <Route path="/restaurant/reviews" elemen={<ReviewPage />} />
          <Route path="/admin/addMenu" element={<ReviewPage />} />
          <Route path="/admin/addMenu" element={<ReviewPage />} />
          <Route path="/restaurant/reviews" element={<ReviewPage />} />

          <Route path="/admin/restaurantadd" element={<AddRestaurant />} />
          <Route path="/admin/facultyadd" element={<AddFaculty />} />
          <Route
            path="/admin/facultyedit/:facultyId"
            element={<EditFaculty />}
          />
          <Route path="/admin/faculties" element={<FacultyList />} />
          <Route path="/admin/floors/:facultyId" element={<FloorsList />} />
          {/*edit to be like /admin/(facultyId)/floors*/}
        </Routes>
      </main>
    </div>
  );
}

export default App;
