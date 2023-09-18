import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import { GenderItem, AddressItems } from "../hardcoded_data/ItemData";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const Forms = () => {
  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [sex, setSex] = useState("");
  const handleChange = (event) => {
    setSex(event.target.value);
  };

  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [barangay, setBarangay] = useState("");
  const [cities, setCities] = useState([]);
  const [barangays, setBarangays] = useState([]);

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
    setCities(
      AddressItems.find((prov) => prov.name === event.target.value).cities
    );
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
    setBarangays(
      cities.find((city) => city.name === event.target.value).barangays
    );
  };

  const handleBarangayChange = (event) => {
    setBarangay(event.target.value);
  };
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
          <form>
            <div className="text-lg font-medium">
              <span>Name</span>
              <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
                <div>
                  <InputLabel>Last Name*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>

                <div>
                  <InputLabel>First Name*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>

                <div>
                  <InputLabel>Middle Name*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>

                <div>
                  <InputLabel>Maiden Name</InputLabel>
                  <TextField id="outlined-required-text" fullWidth />
                </div>

                <div>
                  <InputLabel>Place of Birth*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>

                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div>
                      <InputLabel>Birthday*</InputLabel>
                      <DatePicker />
                    </div>
                  </LocalizationProvider>
                </div>

                <div>
                  <InputLabel id="sex">Sex*</InputLabel>
                  <FormControl required fullWidth>
                    <Select
                      labelId="sex"
                      id="Select"
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
                  <InputLabel>Civil Status*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
                <div>
                  <InputLabel>Mobile Number*</InputLabel>
                  <TextField
                    id="outlined-start-adornment"
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
                  <InputLabel>Email Address*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>
              </div>
            </div>
            <div className="text-lg font-medium">
              <span>Address</span>
              <div className="grid gap-6 md:grid-cols-5 md:gap-6 my-6">
                <div>
                  <InputLabel>Province*</InputLabel>
                  <FormControl required fullWidth>
                    <Select
                      id="Select"
                      value={province}
                      onChange={handleProvinceChange}
                    >
                      {AddressItems.map((prov) => (
                        <MenuItem key={prov.code} value={prov.name}>
                          {prov.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div>
                  <InputLabel>City*</InputLabel>
                  <FormControl required fullWidth>
                    <Select
                      id="Select"
                      value={city}
                      onChange={handleCityChange}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.code} value={city.name}>
                          {city.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <InputLabel>Barangay*</InputLabel>
                  <FormControl required fullWidth>
                    <Select
                      id="Select"
                      value={barangay}
                      onChange={handleBarangayChange}
                    >
                      {barangays.map((bar) => (
                        <MenuItem key={bar.code} value={bar.name}>
                          {bar.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <InputLabel>Zip Code*</InputLabel>
                  <FormControl required fullWidth>
                    <Select
                      id="Select"
                      value={barangay}
                      onChange={handleBarangayChange}
                    >
                      {barangays.map((bar) => (
                        <MenuItem key={bar.code} value={bar.name}>
                          {bar.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div>
                  <InputLabel>Street*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
                <div>
                  <InputLabel>Permanent Address*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>
                <div>
                  <InputLabel>Current Address*</InputLabel>
                  <TextField id="outlined-required-text" required fullWidth />
                </div>
              </div>

              <div className="text-lg font-medium">
                <span>Previous School</span>
                <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
                  <div>
                    <InputLabel>Name of school last attended*</InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
                  </div>
                  <div>
                    <InputLabel>School Address*</InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
                  </div>
                  <div>
                    <InputLabel>School Sector*</InputLabel>
                    <FormControl required fullWidth>
                      <Select
                        id="Select"
                        value={barangay}
                        onChange={handleBarangayChange}
                      >
                        {barangays.map((bar) => (
                          <MenuItem key={bar.code} value={bar.name}>
                            {bar.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <InputLabel>Highest Attainded Grade/Year*</InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2 md:gap-6 my-6">
                  <div>
                    <InputLabel>
                      Type of Disability <span>(if applicable)</span>
                    </InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
                  </div>
                  <div>
                    <InputLabel>
                      IP Affiliation <span>(if applicable)</span>
                    </InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
                  </div>
                </div>
              </div>
              <div className="text-lg font-medium">
                <span>Preferred School</span>
                <div className="grid gap-6 md:grid-cols-4 md:gap-6 my-6">
                  <div>
                    <InputLabel>School intended to enroll in*</InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
                  </div>
                  <div>
                    <InputLabel>School Address*</InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
                  </div>
                  <div>
                    <InputLabel>Type of School*</InputLabel>
                    <FormControl required fullWidth>
                      <Select
                        id="Select"
                        value={barangay}
                        onChange={handleBarangayChange}
                      >
                        {barangays.map((bar) => (
                          <MenuItem key={bar.code} value={bar.name}>
                            {bar.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div>
                    <InputLabel>Degree Program*</InputLabel>
                    <TextField id="outlined-required-text" required fullWidth />
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
