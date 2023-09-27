import { useState } from "react";
import { useQuery } from "react-query";
import {
  GenderItem,
  CivilStatusItem,
  SchoolSectorItem,
  SchoolType,
} from "../hardcoded_data/ItemData";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Forms = () => {
  const [toggleState, setToggleState] = useState("1");

  const toggle = (index) => {
    setToggleState(index);
  };

  const [isChecked, setIsChecked] = useState(false);

  const [formData, setFormData] = useState({
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
    street: "",
    permanentAddr: "",
    currentAddr: "",
    schoolLast: "",
    schoolLastAddr: "",
    schoolSector: "",
    attGrade: "",
    typeDis: "",
    ipAff: "",
    schoolIntend: "",
    schoolIntendAddr: "",
    typeSchool: "",
    degreeProg: "",
    edAssist: "0",
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
  });

  const handleSubmit = (e) => {
    e.preventDefault;
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

  if (status === "loading") return <CircularProgress />;
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
                Street
              </label>
              <input
                type="text"
                id="streetText"
                name="street"
                value={formData.street}
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
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="TypeDis"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Type of Dissability{" "}
                <span className="text-xs font-light">(if Applicable)</span>
              </label>
              <input
                type="text"
                id="TypeDis"
                name="typeDis"
                value={formData.typeDis}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Type N/A if not applicable"
              />
            </div>
            <div>
              <label
                htmlFor="IpAff"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                IP Affiliation{" "}
                <span className="text-xs font-light">(if Applicable)</span>
              </label>
              <input
                type="text"
                id="IpAff"
                name="ipAff"
                value={formData.ipAff}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Type N/A if not applicable"
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>Preffered School</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
            <div>
              <label
                htmlFor="schoolIntendText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                School intended to enroll in
              </label>
              <input
                type="text"
                id="schoolIntendText"
                name="schoolIntend"
                value={formData.schoolIntend}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="schoolIAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                School Address
              </label>
              <input
                type="text"
                id="schoolIAddrText"
                name="schoolIntendAddr"
                value={formData.schoolIntendAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="selectTypeSchool"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Type of School
              </label>
              <select
                id="selectTypeSchool"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="typeSchool"
                value={formData.typeSchool}
                onChange={handleChange}
              >
                <option value="">Choose School Type</option>
                {SchoolType?.map((type) => (
                  <option key={type.id} value={type.value}>
                    {type.label}
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
              <p>Are you in other sources of educational assistance?</p>
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
                disabled={formData.edAssist === "0"}
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
                Name of employer
              </label>
              <input
                type="text"
                id="FEmpNameText"
                name="fEmpName"
                value={formData.fEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="FEmpAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer address
              </label>
              <input
                type="text"
                id="FEmpAddrText"
                name="fEmpAddr"
                value={formData.fEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="FEdAttText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Highest eductational attainment
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
                Name of employer
              </label>
              <input
                type="text"
                id="MEmpNameText"
                name="mEmpName"
                value={formData.mEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MEmpAddrText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer address
              </label>
              <input
                type="text"
                id="MEmpAddrText"
                name="mEmpAddr"
                value={formData.mEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label
                htmlFor="MEdAttText"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Highest eductational attainment
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
        </div>
      </form>
    </>
  );
};

export default Forms;
