import { Link } from "react-router-dom";
import Card from "../components/Card.jsx";
import { useSelector } from "react-redux";
import { selectDuration } from "../redux/durationSlice.js";

const Homepage = () => {
  const duration = useSelector(selectDuration);
  
  return (
    <div>
      <Link to="/h/needtoknow">
        <Card duration={duration} />
      </Link>
    </div>
  );
};

export default Homepage;
