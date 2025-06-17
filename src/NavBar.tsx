import { NavLink } from "react-router";

const NavBar = () => {
  return (
    <div>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/AboutUs">About Us</NavLink>
      </nav>
    </div>
  );
};

export default NavBar;
