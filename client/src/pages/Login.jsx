import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useSelector } from "react-redux";
import { selectAuth } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const auth = useSelector(selectAuth);
  const [err, setErr] = useState(null);
  const [inputs, setInputs] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      login(inputs);
      if (auth.others.type_id === 0) {
        navigate("/auth/admin");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-4 w-full max-w-sm bg-white border border-gray-300 rounded-lg shadow-md sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={handleLogin}>
        <h5 className="text-center text-2xl font-bold text-gray-600">
          SIGN IN
        </h5>
        <div>
          <label
            htmlFor="id"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Login ID
          </label>
          <input
            type="text"
            name="id"
            id="id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={handleChange}
            required
          />
        </div>
        <p className="text-red-700 font-semibold text-center">{err && err}</p>
        <button
          type="submit"
          className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Sign in
        </button>
        <div className="text-center">
          <Link className="text-sm text-red-700 hover:underline" to="/forget">
            Lost Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
