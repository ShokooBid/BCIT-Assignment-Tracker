import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import AboutUs from "./components/AboutUs";
import NavBar from "./NavBar";

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<App />} />
        <Route path="/AboutUs" element={<AboutUs />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
