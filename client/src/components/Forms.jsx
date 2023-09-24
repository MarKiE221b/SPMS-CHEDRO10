import { useState } from "react";
import { useQuery } from "react-query";
import { GenderItem, CivilStatusItem } from "../hardcoded_data/ItemData";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Forms = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
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
    schoolLastAddr:"",
    
  });

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
      enabled: !!formData.cityCode,
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
              toggleState === 1
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
                : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            }
            onClick={() => toggleTab(1)}
          >
            PERSONAL INFORMATION
          </div>
          <div
            className={
              toggleState === 2
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
                : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            }
            onClick={() => toggleTab(2)}
          >
            FAMILY BACKGROUND
          </div>
          <div
            className={
              toggleState === 3
                ? "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active"
                : "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50"
            }
            onClick={() => toggleTab(3)}
          >
            REQUIREMENTS
          </div>
        </div>
      </div>

      <div className="py-5">
        <form>
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
                pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}"
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
          </div>
        </form>
      </div>
    </>
  );
};

export default Forms;
