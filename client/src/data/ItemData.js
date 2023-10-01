import axios from "axios";
import { makeRequest } from "../axios";
import { useQuery } from "react-query";

export const GenderItem = [
  {
    id: "1",
    value: "0",
    label: "Male",
  },
  {
    id: "2",
    value: "1",
    label: "Female",
  },
];

export const CivilStatusItem = [
  {
    id: "1",
    value: "0",
    label: "Single",
  },
  {
    id: "2",
    value: "1",
    label: "Married",
  },
  {
    id: "3",
    value: "2",
    label: "Annulled",
  },
  {
    id: "4",
    value: "3",
    label: "Separated",
  },
  {
    id: "5",
    value: "4",
    label: "Widowed",
  },
];

export const SchoolSectorItem = [
  {
    id: "1",
    value: "0",
    label: "Public",
  },
  {
    id: "2",
    value: "1",
    label: "Private",
  },
];

export const groupPeopleItem = [
  {
    id: "1",
    value: "dependent of solo parent",
  },
  {
    id: "2",
    value: "senior citizens",
  },
  {
    id: "3",
    value: "persons with disabilities",
  },
  {
    id: "4",
    value: "indigenous and ethnic people",
  },
];

const config = {
  header: {
    "X-Content-Type-Options": "nosniff",
  },
};

export const getProvince = () => {
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
  return { status, provinces };
};

export const getCity = (PROV_CODE) => {
  const { data: cities } = useQuery(
    ["cities", PROV_CODE],
    () =>
      axios
        .get(
          `https://psgc.gitlab.io/api/provinces/${PROV_CODE}/cities-municipalities/`,
          config
        )
        .then((response) => response.data),
    {
      enabled: !!PROV_CODE,
    }
  );

  return cities;
};

export const getBarangay = (CITY_CODE, PROV_CODE) => {
  const { data: barangays } = useQuery(
    ["cities", CITY_CODE],
    () =>
      axios
        .get(
          `https://psgc.gitlab.io/api/cities-municipalities/${CITY_CODE}/barangays/`,
          config
        )
        .then((response) => response.data),
    {
      enabled: !!(CITY_CODE && PROV_CODE),
    }
  );
  return barangays;
};

export const getHei = () => {
  const { data: heis } = useQuery("heis", () =>
    makeRequest
      .get("/hei/data")
      .then((response) => response.data)
      .catch((err) => console.log(err))
  );

  return heis;
};

export const getIncome = () => {
  const { data: income } = useQuery("income", () =>
    makeRequest
      .get("/points/income")
      .then((response) => response.data)
      .catch((err) => console.log(err))
  );
  return income;
};

export const getGrade = () => {
  const { data: grade } = useQuery("grade", () =>
    makeRequest
      .get("/points/grade")
      .then((response) => response.data)
      .catch((err) => console.log(err))
  );

  return grade;
};
