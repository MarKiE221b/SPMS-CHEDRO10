import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
      <div className="max-h-full overflow-y-auto w-full max-w-sm p-4 bg-white border border-gray-300 rounded-lg shadow-md sm:p-6 md:p-8">
        <form className="space-y-6" action="#">
          <h5 className="text-center text-2xl font-bold text-gray-600">
            SIGN IN
          </h5>
          <div>
            <label
              for="user_id"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Login ID
            </label>
            <input
              type="text"
              name="user_id"
              id="user_id"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label
              for="password"
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
              required
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  required
                />
              </div>
              <label
                for="remember"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Remember me
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <div className="text-center">
            <Link
              className="text-sm text-red-700 hover:underline"
              to="/forget"
            >
              Lost Password?
            </Link>
          </div>
        </form>
      </div>
  );
};

export default Login;
