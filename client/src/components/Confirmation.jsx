import approvedGIF from "../assets/approved.gif";
import { makeRequest } from "../axios";
import { useQuery } from "react-query";
import { CircularProgress } from "@mui/material";
import { appendDataToFormData } from "../data/formDataUtils";
import { useSelector } from "react-redux";
import { selectFormData } from "../redux/formSlice";
import { selectFileData } from "../redux/fileSlice";

const Confirmation = () => {
  const formData = useSelector(selectFormData);
  const fileData = useSelector(selectFileData);

  const mergedData = appendDataToFormData(formData, fileData);

  const { status, data } = useQuery(
    "confirm",
    () =>
      makeRequest
        .post("/application", mergedData)
        .then((response) => response.data)
        .catch((err) => console.log(err)),
    {
      staleTime: Infinity,
    }
  );

  console.log(data);

  if (status === "loading") return <CircularProgress />;
  return (
    <div className="flex flex-col items-center m-6 p-10 text-center gap-7">
      <div className="font-bold text-2xl">
        <h1>
          APPLICATION ID:{" "}
          {data?.map((id) => (
            <span key={id.applicant_id} className="text-red-800">
              {id.applicant_id}
            </span>
          ))}
        </h1>
      </div>
      <div className="h-56 w-56">
        <img src={approvedGIF} alt="approved" />
      </div>
      <div className="p-2 px-10 font-bold text-2xl text-green-950 bg-green-300 rounded-lg">
        <h1>APPLICATION SUBMITTED SUCCESSFULLY!</h1>
      </div>
      <div className="font-normal text-lg">
        <h1>EMAIL WILL BE SENT TO ACCEPTED APPLICANTS.</h1>
      </div>
    </div>
  );
};

export default Confirmation;
