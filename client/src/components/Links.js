import React from "react";
import { Link } from "react-router-dom";
import "../styles/Links.css";

class Links extends React.Component {
  render() {
    if (!localStorage.getItem("Token")) {
      return (
        <div className="links">
          <Link to={"/register"} className="nav-link">
            Register
          </Link>
          <Link to={"/"} className="nav-link">
            Log In
          </Link>
        </div>
      );
    } else {
      return (
        <div className="links">
          <Link to={"/logout"} className="nav-link">
            Log Out
          </Link>
        </div>
      );
    }
  }
}

export default Links;
