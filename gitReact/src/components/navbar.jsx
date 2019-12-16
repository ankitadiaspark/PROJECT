import React from "react";

//stateless functional Component
const NavBar = ({ totalCounters }) => {
  console.log("NavBar-Rendered");
  return (
    <nav className="navbar navbar-light bg-light">
      <a className="navbar-brand" style={{color: "white",backgroundColor: "#007bff"}} href="/#">
        Shopping Cart{""}
        <span className="badge badge-pill badge-info">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
