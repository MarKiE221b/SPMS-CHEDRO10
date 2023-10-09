import { useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {
  GenderItem,
  CivilStatusItem,
  SchoolSectorItem,
  groupPeopleItem,
  getCity,
  getBarangay,
  getProvince,
  getHei,
  getIncome,
  getGrade,
} from "../data/ItemData";
import { FormValidation, FileValidation } from "../validation/FormValidation";
import AlertBox from "./AlertBox";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, selectFormData } from "../redux/formSlice";
import {
  setIsChecked,
  setOpenAlert,
  setOpenDialog,
  setToggleState,
  selectUiState,
} from "../redux/uiSlice";
import { updateFileData, selectFileData } from "../redux/fileSlice";
import { selectDuration } from "../redux/durationSlice";
import DialogBox from "./DialogBox";

const Forms = () => {
  const tabPaneRef = useRef(null);
  const dispatch = useDispatch();

  const duration = useSelector(selectDuration);
  const formData = useSelector(selectFormData);
  const fileData = useSelector(selectFileData);
  const { isChecked, toggleState } = useSelector(selectUiState);

  const provinces = getProvince();
  const cities = getCity(formData.provCode);
  const barangays = getBarangay(formData.cityCode, formData.provCode);
  const heis = getHei();
  const income = getIncome();
  const grade = getGrade();

  const toggle = (index) => {
    dispatch(setToggleState(index));
    tabPaneRef.current.scrollIntoView({ behavior: "auto" });
  };

  //submit data
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(updateFormData({ appDuration: duration[0].appDuration_id }));

    if (!FormValidation(formData) || !FileValidation(fileData)) {
      dispatch(setOpenAlert(true));
      return;
    }

    dispatch(setOpenDialog(true));
  };

  const handleCheckBox = () => {
    dispatch(setIsChecked(!isChecked));
    if (!isChecked) {
      dispatch(updateFormData({ currentAddr: formData.permanentAddr }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ [name]: value }));
  };

  const handleFileUpload = (e) => {
    const { name, files } = e.target;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;

      dispatch(updateFileData({ [name]: base64Image }));
    };

    if (files && files[0]) {
      reader.readAsDataURL(files[0]);
    }
  };

  if (provinces.status === "loading") return <CircularProgress />;
  return (
    <>
      <DialogBox />
      <div ref={tabPaneRef} className="text-2xl font-bold text-center">
        APPLICATION FORM
      </div>
      <div className="mt-3 text-red-600 text-base">
        <p>
          Instructions: Fill in all the information. Do not leave any item
          blank. If an item is not applicable, indicate 'N/A'.
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
                htmlFor="lName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Last Name
              </label>
              <input
                type="text"
                id="lName"
                name="lName"
                value={formData.lName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="fName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *First Name
              </label>
              <input
                type="text"
                id="fName"
                name="fName"
                value={formData.fName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="mName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Middle Name
              </label>
              <input
                type="text"
                id="mName"
                name="mName"
                value={formData.mName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="maidName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Maiden Name
              </label>
              <input
                type="text"
                id="maidName"
                name="maidName"
                value={formData.maidName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="placeBirth"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Place of Birth
              </label>
              <input
                type="text"
                id="placeBirth"
                name="placeBirth"
                value={formData.placeBirth}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="birthday"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Birthday
              </label>
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={formData.birthday}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="sex"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Sex
              </label>
              <select
                id="sex"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
              >
                <option value="">Choose Sex</option>
                {GenderItem.map((sex) => (
                  <option key={sex.id} value={sex.label}>
                    {sex.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="civilStatus"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Civil Status
              </label>
              <select
                id="civilStatus"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="civilStatus"
                value={formData.civilStatus}
                onChange={handleChange}
              >
                <option value="">Choose Status</option>
                {CivilStatusItem.map((status) => (
                  <option key={status.id} value={status.label}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="mobile"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0951*******"
                pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                autoComplete="email"
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>Address</p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
            <div>
              <label
                htmlFor="provCode"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Province
              </label>
              <select
                id="provCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="provCode"
                value={formData.provCode}
                onChange={handleChange}
              >
                <option value="">Choose Province</option>
                {provinces.provinces?.map((province) => (
                  <option key={province.code} value={province.code}>
                    {province.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="cityCode"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *City
              </label>
              <select
                id="cityCode"
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
                htmlFor="barangayCode"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Barangay
              </label>
              <select
                id="barangayCode"
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
                htmlFor="zipCode"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div className="relative">
              <label
                htmlFor="permanentAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Permanent Address
              </label>
              <input
                type="text"
                id="permanentAddr"
                name="permanentAddr"
                value={formData.permanentAddr}
                onChange={handleChange}
                disabled={isChecked}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />

              <div className="absolute left-32 top-0">
                <div className="flex items-center">
                  <label
                    htmlFor="checkbox"
                    className="ml-2 text-xs font-medium text-gray-800 mr-1"
                  >
                    Copy Address
                  </label>
                  <input
                    id="checkbox"
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
                htmlFor="currentAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Current Address
              </label>
              <input
                type="text"
                id="currentAddr"
                name="currentAddr"
                value={formData.currentAddr}
                onChange={handleChange}
                disabled={isChecked}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>Others</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="groupPeople"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Are you belong to: (any of the following groups)?
              </label>
              <select
                id="groupPeople"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="groupPeople"
                value={formData.groupPeople}
                onChange={handleChange}
              >
                <option value="">N/A</option>
                {groupPeopleItem?.map((group) => (
                  <option key={group.id} value={group.value}>
                    {group.value}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="specifyGroup"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Please Specify (disabilities or ethnic group)
              </label>
              <input
                type="text"
                id="specifyGroup"
                name="specifyGroup"
                value={formData.specifyGroup}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                disabled={
                  formData.groupPeople === "dependent of solo parent" ||
                  formData.groupPeople === "senior citizens" ||
                  formData.groupPeople === ""
                }
              />
            </div>
          </div>
          <div className="text-lg font-medium">Preferred School</div>
          <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
            <div>
              <label
                htmlFor="schoolLast"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Name of School Last Attended
              </label>
              <input
                type="text"
                id="schoolLast"
                name="schoolLast"
                value={formData.schoolLast}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="schoolLastAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *School Address
              </label>
              <input
                type="text"
                id="schoolLastAddr"
                name="schoolLastAddr"
                value={formData.schoolLastAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="schoolSector"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *School Sector
              </label>
              <select
                id="schoolSector"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="schoolSector"
                value={formData.schoolSector}
                onChange={handleChange}
              >
                <option value="">Choose School Sector</option>
                {SchoolSectorItem?.map((sector) => (
                  <option key={sector.id} value={sector.label}>
                    {sector.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="attGrade"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Highest Attained Grade/Year
              </label>
              <input
                type="text"
                id="attGrade"
                name="attGrade"
                value={formData.attGrade}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>Preffered School</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div>
              <label
                htmlFor="schoolIntend"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *School Intended to enroll or enrolled in
              </label>
              <select
                id="schoolIntend"
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
                *Degree Program
              </label>
              <input
                type="text"
                id="degreeProg"
                name="degreeProg"
                value={formData.degreeProg}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
            <div className="flex flex-col items-center md:flex-row gap-6">
              <p>
                *Are you enjoying other sources of educational/financial
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
                htmlFor="edAssistAdd"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                If yes, please specify:
              </label>
              <input
                type="text"
                id="edAssistAdd"
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
                htmlFor="fatName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Name
              </label>
              <input
                type="text"
                id="fatName"
                name="fatName"
                value={formData.fatName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="fAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Address
              </label>
              <input
                type="text"
                id="fAddr"
                name="fAddr"
                value={formData.fAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="fContact"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Contact Number
              </label>
              <input
                type="text"
                id="fContact"
                name="fContact"
                value={formData.fContact}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0951*******"
                pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
              />
            </div>
            <div>
              <label
                htmlFor="fOccupation"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Occupation
              </label>
              <input
                type="text"
                id="fOccupation"
                name="fOccupation"
                value={formData.fOccupation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="fEmpName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name of Employer
              </label>
              <input
                type="text"
                id="fEmpName"
                name="fEmpName"
                value={formData.fEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="fEmpAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer Address
              </label>
              <input
                type="text"
                id="fEmpAddr"
                name="fEmpAddr"
                value={formData.fEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="fEdAtt"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Highest Eductational Attainment
              </label>
              <input
                type="text"
                id="fEdAtt"
                name="fEdAtt"
                value={formData.fEdAtt}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
          <div className="text-lg font-medium">
            <p>MOTHER</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 md:gap-6 my-6">
            <div>
              <label
                htmlFor="matName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Name
              </label>
              <input
                type="text"
                id="matName"
                name="matName"
                value={formData.matName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="mAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Address
              </label>
              <input
                type="text"
                id="mAddr"
                name="mAddr"
                value={formData.mAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="mContact"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Contact Number
              </label>
              <input
                type="text"
                id="mContact"
                name="mContact"
                value={formData.mContact}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="0951*******"
                pattern="[0-9]{4}[0-9]{3}[0-9]{4}"
              />
            </div>
            <div>
              <label
                htmlFor="mOccupation"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Occupation
              </label>
              <input
                type="text"
                id="mOccupation"
                name="mOccupation"
                value={formData.mOccupation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="mEmpName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name of Employer
              </label>
              <input
                type="text"
                id="mEmpName"
                name="mEmpName"
                value={formData.mEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="mEmpAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer Address
              </label>
              <input
                type="text"
                id="mEmpAddr"
                name="mEmpAddr"
                value={formData.mEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="mEdAtt"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Highest Eductational Attainment
              </label>
              <input
                type="text"
                id="mEdAtt"
                name="mEdAtt"
                value={formData.mEdAtt}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                htmlFor="gadName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name
              </label>
              <input
                type="text"
                id="gadName"
                name="gadName"
                value={formData.gadName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="gAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Address
              </label>
              <input
                type="text"
                id="gAddr"
                name="gAddr"
                value={formData.gAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="gContact"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Contact Number
              </label>
              <input
                type="text"
                id="gContact"
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
                htmlFor="gOccupation"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Occupation
              </label>
              <input
                type="text"
                id="gOccupation"
                name="gOccupation"
                value={formData.gOccupation}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="gEmpName"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Name of Employer
              </label>
              <input
                type="text"
                id="gEmpName"
                name="gEmpName"
                value={formData.gEmpName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="gEmpAddr"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Employeer Address
              </label>
              <input
                type="text"
                id="gEmpAddr"
                name="gEmpAddr"
                value={formData.gEmpAddr}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div>
              <label
                htmlFor="gEdAtt"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                Highest Eductational Attainment
              </label>
              <input
                type="text"
                id="gEdAtt"
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
                htmlFor="income"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Annual Gross Income
              </label>
              <select
                id="income"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="income"
                value={formData.income}
                onChange={handleChange}
              >
                <option value="">Choose Gross Income</option>
                {income?.map((income) => (
                  <option
                    key={income.income_id}
                    value={[income.equiv_points, income.range_value]}
                  >
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
                *No. of Siblings in the family 18 years old and below
              </label>
              <input
                type="text"
                id="siblings"
                name="siblings"
                value={formData.siblings}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
            <div className="flex flex-col items-center md:flex-row gap-6">
              <p>*Is your family a beneficiary of the DSWD's (4P's)</p>
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
                htmlFor="imgGrades"
              >
                *Copy of Grades: Grade 11 or 1st Semester Grade 12
              </label>
              <input
                className="block text-sm text-gray-900 border border-gray-400 cursor-pointer bg-gray-50 focus:outline-none"
                aria-describedby="imgGrades"
                id="imgGrades"
                type="file"
                name="imgGrades"
                accept="image/jpeg, image/png"
                onChange={handleFileUpload}
              />
              <p className="mt-1 text-sm text-gray-800">PNG, JPG.</p>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="imgFinance"
              >
                *ITR, /Tax Exemption/Certificate of Indigency/Case Study
                DSWD/OFW Contract
              </label>
              <input
                className="block text-sm text-gray-900 border border-gray-400 cursor-pointer bg-gray-50 focus:outline-none"
                aria-describedby="imgFinance"
                id="imgFinance"
                type="file"
                name="imgFinance"
                accept="image/jpeg, image/png"
                onChange={handleFileUpload}
              />
              <p className="mt-1 text-sm text-gray-800">PNG, JPG.</p>
            </div>
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-900"
                htmlFor="imgOthers"
              >
                (Optional) Solo Parent/Senior Citizen/IPs/PWD
              </label>
              <input
                className="block text-sm text-gray-900 border border-gray-400 cursor-pointer bg-gray-50 focus:outline-none"
                aria-describedby="imgOthers"
                id="imgOthers"
                type="file"
                name="imgOthers"
                accept="image/jpeg, image/png"
                onChange={handleFileUpload}
              />
              <p className="mt-1 text-sm text-gray-800">PNG, JPG.</p>
            </div>

            <div>
              <label
                htmlFor="grades"
                className="block mb-2 text-sm font-medium text-gray-500"
              >
                *Select Average Grade
              </label>
              <select
                id="grades"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                name="grades"
                value={formData.grades}
                onChange={handleChange}
              >
                <option value="">Choose Average Grade</option>
                {grade?.map((grade) => (
                  <option
                    key={grade.grade_id}
                    value={[grade.equiv_points, grade.range_value]}
                  >
                    {grade.range_value}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <AlertBox />
          <div className="absolute right-0 flex items-center">
            <div>
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
            <div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
              >
                SUBMIT
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Forms;
