import CHED_logo from "../assets/CHED-LOGO_orig.png";
import { Login } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="h-20 w-full bg-blue-900 flex justify-between items-center p-4 top-0" >
      <div className="flex items-center">
        <NavLink to="/">
          <div className="h-16 w-16">
            <img src={CHED_logo} alt="CHED_LOGO" />
          </div>
        </NavLink>
       <div className="flex flex-col">
        <span className="text-base ml-3 font-bold text-white">CSP ONLINE APPLICATION SYSTEM</span>
        <span className="text-sm ml-3 font-bold text-white">CHED - REGION X</span>
       </div>
      </div>
      <div className="pt-7">
        <NavLink to="login" replace>
          <div className="text-white">
            <Login className="mr-1"/>
            <span className="text-xs font-bold hidden md:inline-block hover:underline">LOGIN</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
