
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card.jsx";

const Homepage = () => {
  return (
    <div>
      <Link to="/needtoknow">
        <Card />
      </Link>
    </div>
  );
};

export default Homepage;
