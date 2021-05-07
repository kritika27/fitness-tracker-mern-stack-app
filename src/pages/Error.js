import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./Error.css";

const Error = () => {
  return (
    <div className="err">
      <img
        style={{ height: "60vh", width: "35vw" }}
        src="../images/undraw_page_not_found_su7k.svg"
        alt="404 error"
      />
      <h2>This Page Is Not On The Map.</h2>
      <Link to="/">
        <Button variant="contained" color="secondary">
          Back To Home
        </Button>
      </Link>
    </div>
  );
};

export default Error;
