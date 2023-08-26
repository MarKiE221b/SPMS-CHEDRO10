import React from "react";
import { Link } from "react-router-dom";

const Forget = () => {
  return (
      <div className="w-full max-w-md p-4 bg-white border border-gray-300 rounded-lg shadow-md sm:p-6 md:p-8">
        <Link to="/login">
          <svg
            className="w-7 mr-2 hover:bg-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>

        </Link>
        <form className="space-y-6" action="#">
          <h5 className="text-center text-2xl font-bold text-red-600">
            FORGET PASSWORD?
          </h5>
          <p className="text-center">
            Enter the email address associated with your account
          </p>
          <div>
            <label
              for="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="name@gmail.com"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            NEXT
          </button>
        </form>
      </div>
  );
};

export default Forget;
