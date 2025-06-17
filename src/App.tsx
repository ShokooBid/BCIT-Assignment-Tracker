import { Header } from "./components/Header";
import { Assignments } from "./components/Assignments";
import NavBar from "./NavBar";
import { Outlet } from "react-router";


function App() {
  return (
    <>
    
      <Header />
      <Assignments />
    </>
  );
}

export default App;
