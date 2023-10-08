import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  appDuration: "",
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
  groupPeople: "",
  specifyGroup: "",
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
  grades: "",
};

const formSlice = createSlice({
  name: "formData",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { updateFormData } = formSlice.actions;
export const selectFormData = (state) => state.formData;
export default formSlice.reducer;
