import Sidebar from "../../components/Admin Components/Sidebar";
import Pending from "../../components/Admin Components/Pending";
import Dashboard from "../../components/Admin Components/Dashboard";
import { useSelector } from "react-redux";
import { selectUiState } from "../../redux/uiSlice";

const Admin = () => {
  const { indexMenu, subIndexMenu } = useSelector(selectUiState);
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7">
        {indexMenu === 0 && <Dashboard />}
        {indexMenu === 1 && subIndexMenu == 0 && <Pending />}
      </div>
    </div>
  );
};

export default Admin;
