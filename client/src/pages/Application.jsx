import Forms from "../components/Forms";
import Confirmation from "../components/Confirmation";
import { useSelector } from "react-redux";
import { selectUiState } from "../redux/uiSlice";

const Application = () => {
  const { agreeDialog } = useSelector(selectUiState);

  return (
    <div className="flex flex-col m-6 p-10 bg-white border border-gray-300 rounded-lg shadow-xl max-h-full overflow-y-auto">
      {agreeDialog ? <Confirmation /> : <Forms />}
    </div>
  );
};

export default Application;
