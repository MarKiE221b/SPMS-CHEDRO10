import { Link } from "react-router-dom";
import illustatus from "../assets/illustatus.svg";

const Page404 = () => {
  return (
    <div>
      <section className="bg-white ">
        <div className="container flex items-center min-h-screen px-6 py-12 mx-auto">
          <div className="flex flex-col items-center w-screen mx-auto text-center">
            <div className="h-full w-full">
              <img src={illustatus} alt="404" />
            </div>
            <div className="flex items-center w-full mt-6 gap-x-3 shrink-0 sm:w-auto">
              <Link to="/">
                <button className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-300 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-5 h-5 rtl:rotate-180"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                    />
                  </svg>

                  <span>Go back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page404;
