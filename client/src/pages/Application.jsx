import { useQuery } from "react-query";
import { makeRequest } from "../axios";
import Forms from "../components/Forms";

const Application = () => {
  const { data: duration } = useQuery("duration", () =>
    makeRequest
      .get("/duration/appDur")
      .then((response) => response.data)
      .catch((err) => console.log(err))
  );

  return (
    <div className="flex flex-col m-6 p-10 bg-white border border-gray-300 rounded-lg shadow-xl h-screen max-h-full overflow-y-auto">
      {duration?.map((dur) => <Forms key={dur.appDuration_id} app_id={dur.appDuration_id} />)}
    </div>
  );
};

export default Application;
