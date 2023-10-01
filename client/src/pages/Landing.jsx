import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import { useContext } from "react";
import { AuthContext } from "../context/authContext.jsx";

const Homepage = () => {
  const { duration } = useContext(AuthContext);
  return (
    <div>
      <Link to="/h/needtoknow">
        <Card duration={duration} />
      </Link>
    </div>
  );
};

export default Homepage;
