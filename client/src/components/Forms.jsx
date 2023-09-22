import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { GenderItem } from "../hardcoded_data/ItemData";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useQuery } from "react-query";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

const Forms = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [sex, setSex] = useState(undefined);
  const [provCode, setProvCode] = useState(undefined);
  const [cityCode, setCityCode] = useState(undefined);
  const [barangayCode, setBarangayCode] = useState(undefined);

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
    ["cities", provCode],
    () =>
      axios
        .get(
          `https://psgc.gitlab.io/api/provinces/${provCode}/cities-municipalities/`,
          config
        )
        .then((response) => response.data),
    {
      enabled: !!provCode,
    }
  );

  const { data: barangays } = useQuery(
    ["cities", cityCode],
    () =>
      axios
        .get(
          `https://psgc.gitlab.io/api/cities-municipalities/${cityCode}/barangays/`,
          config
        )
        .then((response) => response.data),
    {
      enabled: !!cityCode,
    }
  );

  const handleProvChange = (e) => {
    setProvCode(e.target.value);
    setCityCode(undefined);
  };

  const handleCityChange = (e) => {
    setCityCode(e.target.value);
    setBarangayCode(undefined);
  };

  const handleBarangayChange = (e) => {
    setBarangayCode(e.target.value);
  };

  const handleChange = (event) => {
    setSex(event.target.value);
  };

  if (status === "loading") return <CircularProgress />;
  return (
    <>
      <div className="text-2xl font-bold text-center">
        <span>APPLICATION FORM</span>
      </div>
      <div className="mt-3 text-red-600 text-sm">
        <p>
          Instructions: Fill in all the required information. Do not leave an
          item blank. If item is not applicable, indicate "N/A".
        </p>
      </div>
      <div className="mt-5">
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

        <div className="py-5">
          <form id="form">
            <div className="text-lg font-medium">
              <span>Name</span>
              <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Last Name"
                    required
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    id="outlined-required-text"
                    label="First Name"
                    required
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Middle Name"
                    required
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Maiden Name"
                    fullWidth
                  />
                </div>

                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Place of Birth"
                    required
                    fullWidth
                  />
                </div>

                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div>
                      <DatePicker label="Birthday" />
                    </div>
                  </LocalizationProvider>
                </div>

                <div>
                  <FormControl required fullWidth>
                    <InputLabel id="sexLabel" htmlFor="selectSex">Sex</InputLabel>
                    <Select
                      id="selectSex"
                      labelId="sexLabel"
                      label="Sex"
                      defaultValue=""
                      value={sex}
                      onChange={handleChange}
                    >
                      {GenderItem.map((option) => (
                        <MenuItem key={option.id} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Civil Status"
                    required
                    fullWidth
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
                <div>
                  <TextField
                    id="outlined-start-adornment"
                    label="Mobile Number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+63</InputAdornment>
                      ),
                    }}
                    required
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Email Address"
                    required
                    fullWidth
                  />
                </div>
              </div>
            </div>
            <div className="text-lg font-medium">
              <span>Address</span>
              <div className="grid gap-6 md:grid-cols-5 md:gap-6 my-6">
                <div>
                  <FormControl required fullWidth>
                    <InputLabel id="provinceLabel" htmlFor="selectProvince">Province</InputLabel>
                    <Select
                      id="selectProvince"
                      labelId="provinceLabel"
                      label="Province"
                      defaultValue=""
                      value={provCode}
                      onChange={handleProvChange}
                    >
                      {provinces?.map((provinces) => (
                        <MenuItem key={provinces.code} value={provinces.code}>
                          {provinces.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <FormControl required fullWidth>
                    <InputLabel id="cityLabel" htmlFor="selectCity">City</InputLabel>
                    <Select
                      id="selectCity"
                      labelId="cityLabel"
                      label="City"
                      defaultValue=""
                      value={cityCode}
                      onChange={handleCityChange}
                    >
                      {cities?.map((cities) => (
                        <MenuItem key={cities.code} value={cities.code}>
                          {cities.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl required fullWidth>
                    <InputLabel id="barangayLabel" htmlFor="selectBarangay">Barangay</InputLabel>
                    <Select
                      id="selectBarangay"
                      labelId="barangayLabel"
                      label="Barangay"
                      defaultValue=""
                      value={barangayCode}
                      onChange={handleBarangayChange}
                    >
                      {barangays?.map((barangays) => (
                        <MenuItem key={barangays.code} value={barangays.code}>
                          {barangays.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <FormControl required fullWidth>
                    <InputLabel id="zipLabel" htmlFor="selectZip">Zip Code</InputLabel>
                    <Select
                      id="selectZip"
                      labelId="zipLabel"
                      label="Zip Code"
                    ></Select>
                  </FormControl>
                </div>
                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Street"
                    required
                    fullWidth
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Permanent Address"
                    required
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    id="outlined-required-text"
                    label="Current Address"
                    required
                    fullWidth
                  />
                </div>
              </div>

              <div className="text-lg font-medium">
                <span>Previous School</span>
                <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="Name of school last attended"
                      required
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="School Address"
                      required
                      fullWidth
                    />
                  </div>
                  <div>
                    <FormControl required fullWidth>
                      <InputLabel id="schoolSId" htmlFor="selectSchoolS">School Sector</InputLabel>
                      <Select
                        id="selectSchoolS"
                        labelId="schoolSId"
                        label="School Sector"
                      ></Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="Highest Attainded Grade/Year"
                      required
                      fullWidth
                    />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="Type of Disability (if applicable)"
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="IP Affiliationy (if applicable)"
                      fullWidth
                    />
                  </div>
                </div>
              </div>
              <div className="text-lg font-medium">
                <span>Preferred School</span>
                <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="School intended to enroll in"
                      required
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="School Address"
                      required
                      fullWidth
                    />
                  </div>
                  <div>
                    <FormControl required fullWidth>
                      <InputLabel id="typeId" htmlFor="selectType">Type of School</InputLabel>
                      <Select
                        id="selectType"
                        labelId="typeId"
                        label="Type of School"
                        value={undefined}
                      ></Select>
                    </FormControl>
                  </div>
                  <div>
                    <TextField
                      id="outlined-required-text"
                      label="Degree Program"
                      required
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forms;
