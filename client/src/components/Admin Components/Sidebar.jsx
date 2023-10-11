import { useState } from "react";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import logo from "../../assets/CHED-LOGO_orig.png";
import { useDispatch, useSelector } from "react-redux";
import { selectUiState, setIndexMenu, setSubIndexMenu } from "../../redux/uiSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const { indexMenu, subIndexMenu } = useSelector(selectUiState);
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const Menus = [
    { title: "Dashboard", img: <StackedBarChartIcon /> },
    {
      title: "Applicants",
      img: <TextSnippetIcon />,
      gap: true,
      submenu: true,
      submenuItems: [
        { title: "Pending Applicants" },
        { title: "Complete Applicants" },
        { title: "Decline Applicants" },
      ],
    },
  ];

  return (
    <>
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-blue-900 h-screen p-5 pt-8 relative duration-300`}
      >
        <KeyboardArrowLeftIcon
          className={`bg-white absolute cursor-pointer -right-3 top-9 w-7 border-blue-900
               border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`h-10 w-10 cursor-pointer duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-xl duration-200 ${
              !open && "scale-0"
            }`}
          >
            CHED_ADMIN
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <div key={index}>
              <li
                key={index}
                className={`flex rounded-md p-2 cursor-pointer hover:bg-slate-300 text-sm items-center gap-x-4 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                  index === indexMenu
                    ? "bg-slate-300 text-gray-700"
                    : "text-white"
                } `}
                onClick={() => {
                    dispatch(setIndexMenu(index));
                }}
              >
                {Menu.img}
                <span
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.title}
                </span>
                <div
                  className={`${!open && "hidden"} origin-left duration-200`}
                >
                  {Menu.submenu && (
                    <KeyboardArrowUpIcon
                      className={`${
                        subMenuOpen && indexMenu === 1 && "rotate-180"
                      }`}
                      onClick={() => {
                        setSubMenuOpen(!subMenuOpen);
                      }}
                    />
                  )}
                </div>
              </li>
              {Menu.submenu && subMenuOpen && open && indexMenu === 1 && (
                <ul>
                  {Menu.submenuItems.map((submenuItem, index) => (
                    <li
                      key={index}
                      className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 mx-5 my-2 hover:bg-amber-300 hover:bg-opacity-60 rounded-md ${
                        index === subIndexMenu && "bg-amber-300 bg-opacity-60"
                      }`}
                      onClick={() => {
                        dispatch(setSubIndexMenu(index));
                      }}
                    >
                      {submenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
