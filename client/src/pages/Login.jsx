import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";

const Login = () => {
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [err, setErr] = useState(null);
  const [inputs, setInputs] = useState({
    scholar_id: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate(`/auth/users/${currentUser.scholar_id}`);
    } catch (err) {setErr(err.response.data)}
  };

  useEffect(() => {
    if (currentUser) {
      navigate(`/auth/users/${currentUser.scholar_id}`);
    }
  }, [currentUser]);

  return (
    <div className="max-h-full overflow-y-auto w-full max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow-md sm:p-6 md:p-8">
      <form className="space-y-6" onSubmit={handleLogin}>
        <h5 className="text-center text-2xl font-bold text-gray-600">
          SIGN IN
        </h5>
        <div>
          <label
            htmlFor="scholar_id"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Login ID
          </label>
          <input
            type="text"
            name="scholar_id"
            id="scholar_id"
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
        <p className="text-red-700 font-semibold text-center">
          {err && err}
        </p>
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
