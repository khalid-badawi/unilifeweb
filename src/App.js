import Topbar from "./Components/Restaurant/Topbar";
import Home from "./Pages/Restaurant/Home";
import Login from "./Pages/Login";
import Orders from "./Pages/Restaurant/Orders";
import Sidebar from "./Components/Restaurant/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Menu from "./Pages/Restaurant/Menu";
import AddItem from "./Pages/Restaurant/AddItem";
function App() {
  return (
    <div className="app">
      <Sidebar />
      <CssBaseline />
      <main className="content">
        <Topbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menuadd" element={<AddItem />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
