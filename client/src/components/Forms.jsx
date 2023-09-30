import { useState } from "react";
import { useQuery } from "react-query";
import {
  GenderItem,
  CivilStatusItem,
  SchoolSectorItem,
  groupPeopleItem,
} from "../hardcoded_data/ItemData";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { makeRequest } from "../axios";

const Forms = ({ app_id }) => {
  const [toggleState, setToggleState] = useState("1");

  const toggle = (index) => {
    setToggleState(index);
  };

  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
    appDuration: app_id,
    lName: "",
    fName: "",
    mName: "",
    maidName: "",
    placeBirth: "",
    birthday: "",
    sex: "",
    civilStatus: "",
    mobile: "",
    email: "",
    provCode: "",
    cityCode: "",
    barangayCode: "",
    zipCode: "",
    permanentAddr: "",
    currentAddr: "",
    schoolLast: "",
    schoolLastAddr: "",
    schoolSector: "",
    attGrade: "",
    groupId: "",
    groupPeople: "",
    schoolIntend: "",
    degreeProg: "",
    edAssist: "",
    edAssistAdd: "",
    fatName: "",
    fAddr: "",
    fContact: "",
    fOccupation: "",
    fEmpName: "",
    fEmpAddr: "",
    fEdAtt: "",
    matName: "",
    mAddr: "",
    mContact: "",
    mOccupation: "",
    mEmpName: "",
    mEmpAddr: "",
    mEdAtt: "",
    gadName: "",
    gAddr: "",
    gContact: "",
    gOccupation: "",
    gEmpName: "",
    gEmpAddr: "",
    gEdAtt: "",
    income: "",
    siblings: "",
    DSWD: "",
    imgGrades: null,
    imgFinance: null,
    imgOthers: null,
    grades: "",
    points: null,
  });

  const calculatePoints = () => {
    let c = 0;
    if (formData.groupId !== "") c = 5;
    const pointsResult =
      parseInt(formData.grades, 10) * 0.7 +
      (parseInt(formData.income, 10) * 0.3 + c);
    setFormData({ ...formData, points: pointsResult });
  };

  const handleSubmit = (e) => {
    e.preventDefault;
    calculatePoints();
  };

  const config = {
    header: {
      "X-Content-Type-Options": "nosniff",
    },
  };

  const { status, data: provinces } = useQuery(
    "provinces",
    () =>
      axios
        .get("https://psgc.gitlab.io/api/regions/100000000/provinces/", config)
        .then((response) => response.data),
    {
      staleTime: Infinity, // Cache the data indefinitely
    }
  );

  const { data: cities } = useQuery(
    ["cities", formData.provCode],
    () =>
      axios
        .get(
          `https://psgc.gitlab.io/api/provinces/${formData.provCode}/cities-municipalities/`,
          config
        )
        .then((response) => response.data),
    {
      enabled: !!formData.provCode,
    }
  );

  const { data: barangays } = useQuery(
    ["cities", formData.cityCode],
    () =>
      axios
        .get(
          `https://psgc.gitlab.io/api/cities-municipalities/${formData.cityCode}/barangays/`,
          config
        )
        .then((response) => response.data),
    {
      enabled: !!formData.cityCode && !!formData.provCode,
    }
  );

  const { data: heis } = useQuery("heis", () =>
    makeRequest
      .get("/hei/data")
      .then((response) => response.data)
      .catch((err) => console.log(err))
  );

  const { data: income } = useQuery("income", () =>
    makeRequest
      .get("/points/income")
      .then((response) => response.data)
      .catch((err) => console.log(err))
  );

  const { data: grade } = useQuery("grade", () =>
    makeRequest
      .get("/points/grade")
      .then((response) => response.data)
      .catch((err) => console.log(err))
  );

  const handleCheckBox = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      setFormData({ ...formData, currentAddr: formData.permanentAddr });
    } else {
      setFormData({ ...formData, currentAddr: "" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (status === "loading")
    return (
      <div className="flex items-center justify-center">
        <CircularProgress />;
      </div>
    );
  return (
    <>
      <div className="text-2xl font-bold text-center">APPLICATION FORM</div>
      <div className="mt-3 text-red-600 text-sm">
        <p>
          Instructions: Fill in all the required information. Do not leave an
          item blank. If item is not applicable, indicate "N/A".
        </p>
      </div>

      <div className="my-5">
        <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <div
            className={
              toggleState === "1"
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
                : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            }
          >
            PERSONAL INFORMATION
          </div>
          <div
            className={
              toggleState === "2"
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
                : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            }
          >
            FAMILY BACKGROUND
          </div>
          <div
            className={
              toggleState === "3"
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
                : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            }
          >
            REQUIREMENTS
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className={toggleState === "1" ? "py-5 block relative" : "hidden"}>
          <div className="text-lg font-medium">
            <p>Name</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
            <div>
              <label
                htmlFor="lNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lNameText"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="FNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                First Name
              </label>
              <input
                type="text"
                id="FNameText"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Middle Name
              </label>
              <input
                type="text"
                id="MNameText"
                name="mName"
                value={formData.mName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MdNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Maiden Name
              </label>
              <input
                type="text"
                id="MdNameText"
                name="maidName"
                value={formData.maidName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="PbirthText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Place of Birth
              </label>
              <input
                type="text"
                id="PbirthText"
                name="placeBirth"
                value={formData.placeBirth}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="birthDate"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Birthday
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="selectSex"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Sex
              </label>
              <select
                id="selectSex"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option value="">Choose Sex</option>
                {GenderItem.map((sex) => (
                  <option key={sex.id} value={sex.value}>
                    {sex.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="selectStatus"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Civil Status
              </label>
              <select
                id="selectStatus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="civilStatus"
                value={formData.civilStatus}
                onChange={handleChange}
              >
                <option value="">Choose Status</option>
                {CivilStatusItem.map((status) => (
                  <option key={status.id} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="mNumberTel"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Mobile Number
              </label>
              <input
                type="tel"
                id="mNumberTel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0951*******"
                pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                required
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                autoComplete="email"
                required
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>Address</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
            <div>
              <label
                htmlFor="selectProvince"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Province
              </label>
              <select
                id="selectProvince"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="provCode"
                value={formData.provCode}
                onChange={handleChange}
              >
                <option value="">Choose Province</option>
                {provinces?.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="selectCity"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                City
              </label>
              <select
                id="selectCity"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="cityCode"
                value={formData.cityCode}
                onChange={handleChange}
              >
                <option value="">Choose City</option>
                {cities?.map((city) => (
                  <option key={city.code} value={city.code}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="selectBarangay"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Barangay
              </label>
              <select
                id="selectBarangay"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="barangayCode"
                value={formData.barangayCode}
                onChange={handleChange}
              >
                <option value="">Choose Barangay</option>
                {barangays?.map((barangay) => (
                  <option key={barangay.code} value={barangay.code}>
                    {barangay.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="streetText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="streetText"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div className="relative">
              <label
                htmlFor="permaText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Permanent Address
              </label>
              <input
                type="text"
                id="permaText"
                name="permanentAddr"
                value={formData.permanentAddr}
                onChange={handleChange}
                disabled={isChecked}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />

              <div className="absolute left-32 top-0">
                <div className="flex items-center">
                  <label
                    htmlFor="checkBox"
                    className="ml-2 text-xs font-medium text-gray-800 mr-1"
                  >
                    Copy Address
                  </label>
                  <input
                    id="checkBox"
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckBox}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="currentText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Current Address
              </label>
              <input
                type="text"
                id="currentText"
                name="currentAddr"
                value={formData.currentAddr}
                onChange={handleChange}
                disabled={isChecked}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>Others</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="groupSelect"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Are you belong to: (any of the following groups)?
              </label>
              <select
                id="groupSelect"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="groupId"
                value={formData.groupId}
                onChange={handleChange}
              >
                <option value="">N/A</option>
                {groupPeopleItem?.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="groupText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Please Specify (disabilities or ethnic group)
              </label>
              <input
                type="text"
                id="groupText"
                name="groupPeople"
                value={formData.groupPeople}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled={
                  formData.groupId === "1" ||
                  formData.groupId === "2" ||
                  formData.groupId === ""
                }
              />
            </div>
          </div>
          <div className="text-lg font-medium">Preferred School</div>
          <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
            <div>
              <label
                htmlFor="schoolLastText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name of School Last Attended
              </label>
              <input
                type="text"
                id="schoolLastText"
                name="schoolLast"
                value={formData.schoolLast}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="schoolLAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                School Address
              </label>
              <input
                type="text"
                id="schoolLAddrText"
                name="schoolLastAddr"
                value={formData.schoolLastAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="selectSchoolSec"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                School Sector
              </label>
              <select
                id="selectSchoolSec"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="schoolSector"
                value={formData.schoolSector}
                onChange={handleChange}
              >
                <option value="">Choose School Sector</option>
                {SchoolSectorItem?.map((sector) => (
                  <option key={sector.id} value={sector.value}>
                    {sector.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="AttGrade"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Highest Attained Grade/Year
              </label>
              <input
                type="text"
                id="AttGrade"
                name="attGrade"
                value={formData.attGrade}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>Preffered School</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="schoolIntendText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                School Intended to enroll or enrolled in
              </label>
              <select
                id="schoolIntendText"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="schoolIntend"
                value={formData.schoolIntend}
                onChange={handleChange}
              >
                <option value="">Choose School</option>
                {heis?.map((hei) => (
                  <option key={hei.inst_code} value={hei.inst_code}>
                    {hei.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="degreeProg"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Degree Program
              </label>
              <input
                type="text"
                id="degreeProg"
                name="degreeProg"
                value={formData.degreeProg}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div className="flex flex-col items-center md:flex-row gap-6">
              <p>
                Are you enjoying other sources of educational/financial
                assistance?
              </p>
              <div className="flex items-center">
                <input
                  id="radioYes"
                  type="radio"
                  name="edAssist"
                  value="1"
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="radioYes"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="radioNo"
                  type="radio"
                  name="edAssist"
                  value="0"
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="radioNo"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  No
                </label>
              </div>
            </div>
            <div>
              <label
                htmlFor="edAssistText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                If yes, please specify:
              </label>
              <input
                type="text"
                id="edAssistText"
                name="edAssistAdd"
                value={formData.edAssistAdd}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled={formData.edAssist !== "1"}
              />
            </div>
          </div>
          <div className="absolute right-0">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
              onClick={() => toggle("2")}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={toggleState === "2" ? "py-5 block relative" : "hidden"}>
          <div className="text-lg font-medium">
            <p>FATHER</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-6 my-6">
            <div>
              <label
                htmlFor="FatNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="FatNameText"
                name="fatName"
                value={formData.fatName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="FAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Address
              </label>
              <input
                type="text"
                id="FAddrText"
                name="fAddr"
                value={formData.fAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="FContactText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="FContactText"
                name="fContact"
                value={formData.fContact}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0951*******"
                pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                required
              />
            </div>
            <div>
              <label
                htmlFor="FOccupationText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Occupation
              </label>
              <input
                type="text"
                id="FOccupationText"
                name="fOccupation"
                value={formData.fOccupation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="FEmpNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name of Employer
              </label>
              <input
                type="text"
                id="FEmpNameText"
                name="fEmpName"
                value={formData.fEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="FEmpAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer Address
              </label>
              <input
                type="text"
                id="FEmpAddrText"
                name="fEmpAddr"
                value={formData.fEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="FEdAttText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Highest Eductational Attainment
              </label>
              <input
                type="text"
                id="FEdAttText"
                name="fEdAtt"
                value={formData.fEdAtt}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>MOTHER</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-6 my-6">
            <div>
              <label
                htmlFor="MatNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="MatNameText"
                name="matName"
                value={formData.matName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Address
              </label>
              <input
                type="text"
                id="MAddrText"
                name="mAddr"
                value={formData.mAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MContactText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="MContactText"
                name="mContact"
                value={formData.mContact}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0951*******"
                pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MOccupationText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Occupation
              </label>
              <input
                type="text"
                id="MOccupationText"
                name="mOccupation"
                value={formData.mOccupation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MEmpNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name of Employer
              </label>
              <input
                type="text"
                id="MEmpNameText"
                name="mEmpName"
                value={formData.mEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="MEmpAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer Address
              </label>
              <input
                type="text"
                id="MEmpAddrText"
                name="mEmpAddr"
                value={formData.mEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="MEdAttText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Highest Eductational Attainment
              </label>
              <input
                type="text"
                id="MEdAttText"
                name="mEdAtt"
                value={formData.mEdAtt}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>
              GUARDIAN <span>if applicable</span>
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-6 my-6">
            <div>
              <label
                htmlFor="GarNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="GarNameText"
                name="gatName"
                value={formData.gatName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="GAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Address
              </label>
              <input
                type="text"
                id="GAddrText"
                name="gAddr"
                value={formData.gAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="GContactText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="GContactText"
                name="gContact"
                value={formData.gContact}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0951*******"
                pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
              />
            </div>
            <div>
              <label
                htmlFor="GOccupationText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Occupation
              </label>
              <input
                type="text"
                id="GOccupationText"
                name="gOccupation"
                value={formData.gOccupation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="GEmpNameText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name of Employer
              </label>
              <input
                type="text"
                id="GEmpNameText"
                name="gEmpName"
                value={formData.gEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="GEmpAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer Address
              </label>
              <input
                type="text"
                id="GEmpAddrText"
                name="gEmpAddr"
                value={formData.gEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="GEdAttText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Highest Eductational Attainment
              </label>
              <input
                type="text"
                id="GEdAttText"
                name="gEdAtt"
                value={formData.gEdAtt}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="text-lg font-medium">OTHERS</div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="selectIncome"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Annual Gross Income
              </label>
              <select
                id="selectIncome"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="income"
                value={formData.income}
                onChange={handleChange}
                required
              >
                <option value="">Choose Gross Income</option>
                {income?.map((income) => (
                  <option key={income.income_id} value={income.equiv_points}>
                    {income.range_value}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="siblings"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                No. of Siblings in the family 18 years old and below
              </label>
              <input
                type="text"
                id="siblings"
                name="siblings"
                value={formData.siblings}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex flex-col items-center md:flex-row gap-6">
              <p>Is your family a beneficiary of the DSWD's (4P's)</p>
              <div className="flex items-center">
                <input
                  id="radioDsYes"
                  type="radio"
                  name="DSWD"
                  value="1"
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="radioDsYes"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Yes
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="radioDsNo"
                  type="radio"
                  name="DSWD"
                  value="0"
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                />
                <label
                  htmlFor="radioDsNo"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  No
                </label>
              </div>
            </div>
          </div>
          <div className="absolute right-0">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
              onClick={() => toggle("1")}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
                transform="scale(-1, 1)"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
              onClick={() => toggle("3")}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className={toggleState === "3" ? "py-5 block relative" : "hidden"}>
          <div className="flex flex-col gap-6 my-6">
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input1"
              >
                Copy of Grades: Grade 11 or 1st Semester Grade 12
              </label>
              <input
                className="block text-sm text-gray-900 border border-gray-400 cursor-pointer bg-gray-50 focus:outline-none"
                aria-describedby="file_input1"
                id="file_input1"
                type="file"
                name="imgGrades"
                accept=".jpeg, .png"
              />
              <p className="mt-1 text-sm text-gray-800" id="file_input1">
                PNG, JPG (MAX. 800x400px).
              </p>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input2"
              >
                ITR, /Tax Exemption/Certificate of Indigency/Case Study DSWD/OFW
                Contract
              </label>
              <input
                className="block text-sm text-gray-900 border border-gray-400 cursor-pointer bg-gray-50 focus:outline-none"
                aria-describedby="file_input2"
                id="file_input2"
                type="file"
                name="imgFinance"
                accept=".jpeg, .png"
              />
              <p className="mt-1 text-sm text-gray-800" id="file_input2">
                PNG, JPG (MAX. 800x400px).
              </p>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="file_input3"
              >
                (Optional) Solo Parent/Senior Citizen/IPs/PWD
              </label>
              <input
                className="block text-sm text-gray-900 border border-gray-400 cursor-pointer bg-gray-50 focus:outline-none"
                aria-describedby="file_input3"
                id="file_input3"
                type="file"
                name="imgOthers"
                accept=".jpeg, .png"
              />
              <p className="mt-1 text-sm text-gray-800" id="file_input3">
                PNG, JPG (MAX. 800x400px).
              </p>
            </div>

            <div>
              <label
                htmlFor="selectGrade"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Select Average Grade
              </label>
              <select
                id="selectGrade"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="grades"
                value={formData.grades}
                onChange={handleChange}
                required
              >
                <option value="">Choose Gross Income</option>
                {grade?.map((grade) => (
                  <option key={grade.grade_id} value={grade.equiv_points}>
                    {grade.range_value}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="absolute right-0">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
              onClick={() => toggle("2")}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
                transform="scale(-1, 1)"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Forms;
