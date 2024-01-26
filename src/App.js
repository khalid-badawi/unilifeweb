import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuIcon from "@mui/icons-material/RestaurantMenu";
import OrdersIcon from "@mui/icons-material/TableRestaurant";
import ReviewsIcon from "@mui/icons-material/StarHalf";
import MajorIcon from "@mui/icons-material/School";
import DormIcon from "@mui/icons-material/Apartment";
import FacultyIcon from "@mui/icons-material/CorporateFare";
import ADIcon from "@mui/icons-material/Campaign";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import PeopleIcon from "@mui/icons-material/Groups";
import PostIcon from "@mui/icons-material/DynamicFeed";
import Sidebar from "./Components/Restaurant/Sidebar";
import Topbar from "./Components/Restaurant/Topbar";
import Home from "./Pages/Restaurant/Home";
import Login from "./Pages/Login";
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
import ClassesList from "./Pages/MainAdmin/ClassesList";
import StudentsList from "./Pages/MainAdmin/StudentsList";
import RestaurantsList from "./Pages/MainAdmin/RestaurantsList";
import EditRestaurant from "./Pages/MainAdmin/EditRestaurant";
import Posts from "./Pages/MainAdmin/Posts";
import AddDormitory from "./Pages/MainAdmin/AddDormitory";
import { useSelector } from "react-redux";
import DormitoriesList from "./Pages/MainAdmin/DormitoriesList";
import AdminHome from "./Pages/MainAdmin/AdminHome";
import EditDormitory from "./Pages/MainAdmin/EditDormitory";
import Post from "./Pages/Dormitory/Post";
import AddDormitoryPost from "./Pages/Dormitory/AddDormitory";
import RoomInformation from "./Pages/Dormitory/RoomInformation";
import MajorsList from "./Pages/MainAdmin/Majors";
import AddADs from "./Pages/MainAdmin/CreateADs";
import ADsList from "./Pages/MainAdmin/ADsList";
import EditAd from "./Pages/MainAdmin/EditAd";
function App() {
  const location = useLocation();
  const role = useSelector((state) => state.user.role);

  const isSignInPage = location.pathname === "/signin";
  /* const restaurantSidebar = [
    { title: "Dashboard", to: "/restaurant/home", icon: <HomeOutlinedIcon /> },
    { title: "Menu", to: "/restaurant/menu", icon: <MenuIcon /> },
    { title: "Menu", to: "/restaurant/menu", icon: <MenuIcon /> },
    { title: "Orders", to: "/restaurant/orders", icon: <OrdersIcon /> },
    { title: "Ratings", to: "/restaurant/reviews", icon: <ReviewsIcon /> },
  ];*/
  const restaurantSidebar = [
    {
      section: "Dashboard",
      items: [
        {
          title: "Dashboard",
          to: "/restaurant/home",
          icon: <HomeOutlinedIcon />,
        },
      ],
    },
    {
      section: "Menu",
      items: [
        { title: "Menu", to: "/restaurant/menu", icon: <MenuIcon /> },
        { title: "Menu", to: "/restaurant/menuadd", icon: <AddIcon /> },
      ],
    },
    {
      section: "Orders",
      items: [
        { title: "Orders", to: "/restaurant/orders", icon: <OrdersIcon /> },
      ],
    },
    {
      section: "Ratings",
      items: [
        { title: "Ratings", to: "/restaurant/reviews", icon: <ReviewsIcon /> },
      ],
    },
  ];
  // const adminSidebar = [
  //   { title: "Dashboard", to: "/admin/home", icon: <HomeOutlinedIcon /> },
  //   { title: "Users", to: "/admin/users", icon: <MenuIcon /> },
  //   { title: "Add Restaurant", to: "/admin/restaurantadd", icon: <AddIcon /> },
  //   { title: "Add Dormitory", to: "/admin/dormitoryadd", icon: <AddIcon /> },
  //   { title: "Add Faculty", to: "/admin/facultyadd", icon: <AddIcon /> },
  //   { title: "Faculties", to: "/admin/faculties", icon: <OrdersIcon /> },
  //   { title: "Majors", to: "/admin/majors", icon: <OrdersIcon /> },
  //   { title: "Students", to: "/admin/students", icon: <OrdersIcon /> },
  //   { title: "Restaurants", to: "/admin/restaurants", icon: <OrdersIcon /> },
  //   { title: "Dormitories", to: "/admin/dormitories", icon: <OrdersIcon /> },
  //   { title: "Posts", to: "/admin/posts", icon: <OrdersIcon /> },
  //   { title: "Create AD", to: "/admin/adsadd", icon: <OrdersIcon /> },
  //   { title: "ADs", to: "/admin/ads", icon: <OrdersIcon /> },
  // ];
  const adminSidebar = [
    {
      section: "Dashboard",
      items: [
        { title: "Dashboard", to: "/admin/home", icon: <HomeOutlinedIcon /> },
      ],
    },
    {
      section: "University Information",
      items: [
        { title: "Faculties", to: "/admin/faculties", icon: <FacultyIcon /> },
        { title: "Add Faculty", to: "/admin/facultyadd", icon: <AddIcon /> },
        { title: "Majors", to: "/admin/majors", icon: <MajorIcon /> },
      ],
    },
    {
      section: "Students",
      items: [
        { title: "Students", to: "/admin/students", icon: <PeopleIcon /> },

        { title: "Posts", to: "/admin/posts", icon: <PostIcon /> },
      ],
    },
    {
      section: "Restaurants",
      items: [
        {
          title: "Restaurants",
          to: "/admin/restaurants",
          icon: <OrdersIcon />,
        },
        {
          title: "Add Restaurant",
          to: "/admin/restaurantadd",
          icon: <AddIcon />,
        },
      ],
    },
    {
      section: "Dormitories",
      items: [
        {
          title: "Dormitory Owners",
          to: "/admin/dormitories",
          icon: <DormIcon />,
        },
        {
          title: "Add an Owner",
          to: "/admin/dormitoryadd",
          icon: <AddIcon />,
        },
      ],
    },
    {
      section: "ADs",
      items: [
        { title: "ADs", to: "/admin/ads", icon: <ADIcon /> },
        { title: "Create AD", to: "/admin/adsadd", icon: <OrdersIcon /> },
      ],
    },
  ];

  const dormitorySidebar = [];
  const sidebar =
    role === "admin"
      ? adminSidebar
      : role === "restaurant"
      ? restaurantSidebar
      : dormitorySidebar;
  const renderSidebar = () => {
    if (isSignInPage) {
      return null;
    }

    return (
      <>
        <Sidebar menuItems={sidebar} />
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
        <Routes>
          <Route path="/signin" element={<Login />} index />
          {/*restaurant route */}
          <Route path="/restaurant/home" element={<Home />} />
          <Route path="/restaurant/orders" element={<Orders />} />
          <Route path="/restaurant/menu" element={<Menu />} />
          <Route path="/restaurant/menuadd" element={<AddItem />} />
          <Route path="/restaurant/menuedit/:foodId" element={<EditItem />} />
          <Route path="/restaurant/reviews" element={<ReviewPage />} />
          {/*restaurant route end*/}
          {/*Admin route*/}
          <Route path="/admin/restaurantadd" element={<AddRestaurant />} />
          <Route
            path="/admin/restaurantedit/:restaurantId"
            element={<EditRestaurant />}
          />
          <Route path="/admin/facultyadd" element={<AddFaculty />} />
          <Route
            path="/admin/facultyedit/:facultyId"
            element={<EditFaculty />}
          />
          <Route path="/admin/faculties" element={<FacultyList />} />
          <Route path="/admin/floors" element={<FloorsList />} />
          <Route
            path="/admin/classes/:facultyId/:floorId"
            element={<ClassesList />}
          />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/students" element={<StudentsList />} />
          <Route path="/admin/restaurants" element={<RestaurantsList />} />
          <Route path="/admin/dormitories" element={<DormitoriesList />} />
          <Route path="/admin/posts" element={<Posts />} />
          <Route path="/admin/floors/:facultyId" element={<FloorsList />} />

          <Route path="/admin/dormitoryadd" element={<AddDormitory />} />
          <Route path="/admin/majors" element={<MajorsList />} />
          <Route path="/admin/adsadd" element={<AddADs />} />
          <Route path="/admin/ads" element={<ADsList />} />
          <Route path="/admin/adsedit/:adId" element={<EditAd />} />
          <Route
            path="/admin/dormitoryedit/:dormitoryId"
            element={<EditDormitory />}
          />
          {/*Admin route End*/}
          {/*dormitory route */}
          <Route
            path="/dormitory/dormitoryaddpost"
            element={<AddDormitoryPost />}
          />
          <Route path="/dormitory/roomsinfo" element={<RoomInformation />} />
          {/*dormitory route End*/}
        </Routes>
      </main>
    </div>
  );
}

export default App;
