import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Logo from "./Logo/Logo";
import DropdownMenu from "./Dropdown";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { isAuth } = useSelector((state) => state.auth);

  console.log(isOpen, isAuth);
  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header>
        <nav className="navbar">
          <div className="navbar-container">
            <NavLink href="/" className="navbar-logo" to={"/"}>
              <Logo />
              {/* <img src={logo} alt="Logo" /> */}
              {/* Algoz */}
            </NavLink>
            <div
              id="toggle"
              className={isOpen ? "menu open" : "menu"}
              onClick={toggleNav}
            >
              <span className="menu-top"></span>
              <span className="menu-middle"></span>
              <span className="menu-botton"></span>
            </div>
            <ul className={`navbar-menu ${isOpen && "active"}`}>
              <li className="navbar-item">
                <NavLink
                  to="/"
                  className={({ isActive, isPending }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink
                  to="/about"
                  className={({ isActive, isPending }) => {
                    return isActive ? "navbar-link active" : "navbar-link";
                  }}
                >
                  About Us
                </NavLink>
              </li>
              {/* <li className="navbar-item">
                <NavLink
                  to="/contact"
                  className={({ isActive, isPending }) =>
                    isActive ? "navbar-link active" : "navbar-link"
                  }
                >
                  Contact Us
                </NavLink>
              </li> */}

              {isAuth ? (
                <li className="navbar-item">
                  <DropdownMenu />
                </li>
              ) : (
                // <li className="navbar-item">
                //   <NavLink
                //     to="/dashboard"
                //     className={({ isActive, isPending }) =>
                //       isActive ? "navbar-link active" : "navbar-link"
                //     }
                //   >
                //     Dashboard
                //   </NavLink>
                // </li>
                <>
                  <li className="navbar-item">
                    <NavLink
                      to="/signin"
                      className={({ isActive, isPending }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                      }
                    >
                      Sign In
                    </NavLink>
                  </li>
                  {/* <li className="navbar-item">
                    <NavLink
                      to="/signup"
                      className={({ isActive, isPending }) =>
                        isActive ? "navbar-link active" : "navbar-link"
                      }
                    >
                      Sign Up
                    </NavLink>
                  </li> */}
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <div>{/* <Outlet /> */}</div>
    </>
  );
};

export default Navbar;
