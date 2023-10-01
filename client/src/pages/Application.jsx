import { useContext } from "react";
import Forms from "../components/Forms";
import { AuthContext } from "../context/authContext";

const Application = () => {
  const { duration } = useContext(AuthContext);

  return (
    <div className="flex flex-col m-6 p-10 bg-white border border-gray-300 rounded-lg shadow-xl max-h-full overflow-y-auto">
      {duration?.map((dur) => (
        <Forms key={dur.appDuration_id} app_id={dur.appDuration_id} />
      ))}
    </div>
  );
};

export default Application;
