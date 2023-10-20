import "./NavBar.css";
import { NavLink } from "react-router-dom";
import Logo from "./Logo/Logo";

const SignUpNavbar = () => {
  return (
    <>
      <header>
        <nav
          className="navbar"
          style={{
            width: "200px",
          }}
        >
          <div
            className="navbar-container"
            style={{ justifyContent: "center" }}
          >
            <NavLink href="/" className="navbar-logo" to={"/"}>
              <Logo />
            </NavLink>
          </div>
        </nav>
      </header>
    </>
  );
};

export default SignUpNavbar;
