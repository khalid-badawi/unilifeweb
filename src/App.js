import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes, useLocation } from "react-router-dom";

import Sidebar from "./Components/Restaurant/Sidebar";
import Topbar from "./Components/Restaurant/Topbar";
import Home from "./Pages/Restaurant/Home";
import Login from "./Pages/Login";
import Orders from "./Pages/Restaurant/Orders";
import Menu from "./Pages/Restaurant/Menu";
import AddItem from "./Pages/Restaurant/AddItem";
import ReviewPage from "./Pages/Restaurant/ReviewPage";

function App() {
  const location = useLocation();

  const isSignInPage = location.pathname === "/signin";

  const renderSidebar = () => {
    if (isSignInPage) {
      return null;
    }

    return (
      <>
        <Sidebar />
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
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menuadd" element={<AddItem />} />
          <Route path="/reviews" element={<ReviewPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
