export const FormValidation = (formData) => {
  const requiredFields = [
    "lName",
    "fName",
    "mName",
    "placeBirth",
    "birthday",
    "sex",
    "civilStatus",
    "mobile",
    "email",
    "provCode",
    "cityCode",
    "barangayCode",
    "zipCode",
    "permanentAddr",
    "currentAddr",
    "schoolLast",
    "schoolLastAddr",
    "schoolSector",
    "attGrade",
    "schoolIntend",
    "degreeProg",
    "fatName",
    "fAddr",
    "fContact",
    "mOccupation",
    "matName",
    "mAddr",
    "mContact",
    "mOccupation",
    "income",
    "siblings",
    "DSWD",
    "grades",
  ];
  return requiredFields.every(
    (field) => formData[field] && formData[field] !== ""
  );
};

export const FileValidation = (fileData) => {
  const requiredFields = ["imgGrades", "imgFinance"];
  return requiredFields.every(
    (field) => fileData[field] && fileData[field] !== null
  );
};
