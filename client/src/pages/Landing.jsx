
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "../components/Card.jsx";

const Homepage = () => {
  return (
    <div className="flex flex-col items-center max-h-full overflow-y-auto">
      <Link to="/needtoknow">
        <Card />
      </Link>
    </div>
  );
};

export default Homepage;
