import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PrintIcon from "@mui/icons-material/Print";
const Users = () => {
  return (
    <div className="flex flex-col w-full gap-4 max-h-full overflow-y-auto font-roboto">
      <div className="border p-6 border-gray-300 shadow-xl rounded-lg">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="flex flex-col mb-5 md:mb-0 md:flex-row ">
            <div className="flex items-center justify-center md:mr-4">
              <AccountCircleIcon style={{ fontSize: 100 }} />
            </div>
            <div>
              <span className="text-lg font-bold">Scholar ID :</span>
              <span className="block">Test C. Test</span>
              <span className="block">
                BACHELOR OF SCIENCE IN INFORMATION TECHNOLOGY
              </span>
              <span className="block">4TH YEAR</span>
              <span className="block">+639352636125</span>
            </div>
          </div>
          <div className="font-bold text-lg text-center md:text-left">
            <h1>SY: 2023-2024</h1>
          </div>
        </div>
      </div>

      <div className="border p-6 border-gray-300 shadow-xl rounded-lg">
        <div className="flex justify-between mb-6 text-lg font-semibold">
          <div>
            <span className="mr-3 block md:inline-block">
              Allowance Status :
            </span>
            <span className="text-green-500">PROCESSING</span>
          </div>
          <div>
            <span className="mr-3 block md:inline-block">Status :</span>
            <span className="text-green-500">ACTIVE</span>
          </div>
        </div>
        <div className="bg-gray-200 p-2 font-semibold">
          <span>Residence Data</span>
        </div>
        <div className="p-2">
          <span className="mr-3">Permanent Address :</span>
          <span className="underline">
            64 University St. Lawrence, MA 01841
          </span>
        </div>
        <div className="p-2">
          <span className="mr-9">Current Address :</span>
          <span className="underline">
            64 University St. Lawrence, MA 01841
          </span>
        </div>
        <div className="bg-gray-200 p-2 font-semibold">
          <span>Family Data</span>
        </div>

        <div className="p-2">
          <div className="flex flex-col w-[220px] mb-6 md:w-auto md:flex-row md:justify-between md:my-2">
            <div className="md:w-[220px] flex gap-2">
              <span>Father's Name:</span>
              <span>James Tour</span>
            </div>
            <div className="flex gap-2">
              <span>Occupation:</span>
              <span>Engineer</span>
            </div>
            <div className="flex gap-2">
              <span>Contact No:</span>
              <span>+639246245261</span>
            </div>
          </div>
          <div className="flex flex-col w-[220px] mb-6 md:w-auto md:flex-row md:justify-between md:my-2">
            <div className="md:w-[220px] flex gap-2">
              <span>Mother's Name:</span>
              <span>James Tour</span>
            </div>
            <div className="flex gap-2">
              <span>Occupation:</span>
              <span>Engineer</span>
            </div>
            <div className="flex gap-2">
              <span>Contact No:</span>
              <span>+639246245261</span>
            </div>
          </div>
          <div className="flex flex-col w-[220px] mb-6 md:w-auto  md:flex-row md:justify-between md:my-2">
            <div className="md:w-[220px] flex gap-2">
              <span>Legal Guadian:</span>
              <span>James Tour</span>
            </div>
            <div className="flex gap-2">
              <span>Occupation:</span>
              <span>Engineer</span>
            </div>
            <div className="flex gap-2">
              <span>Contact No:</span>
              <span>+639246245261</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-200 p-5"></div>
        <div className="flex justify-end m-5">
          <div className="text-blue-950 cursor-pointer">
            <PrintIcon style={{ fontSize: 30 }} />
          </div>
        </div>
        <div className="flex justify-center md:justify-end m-5 pt-9">
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Edit
          </button>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Users;
