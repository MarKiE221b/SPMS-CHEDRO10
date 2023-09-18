import SchoolIcon from "@mui/icons-material/School";
const Card = () => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-300 cursor-pointer">
      <div className="flex flex-col items-center text-center mb-2 ">
        <div className="text-blue-400">
          <SchoolIcon style={{ fontSize: 60 }} />
        </div>
        <span className="text-2xl font-bold font-roboto text-blue-400">
          APPLICATION IS NOW
        </span>
        <span className="h-[35px] w-[200px] pt-1 mt-[5px] rounded-full bg-green-100 text-xl text-green-400">
          AVAILABLE
        </span>
      </div>
      <div className="pt-5 text-justify font-sans max-h-[260px] overflow-y-auto">
        <p>
          The CHED Scholarship Program (CSP) is a prestigious educational
          initiative in the Philippines that aims to provide financial
          assistance and support A academically gifted and financially
          disadvantaged students pursuing higher education. Managed by the
          Commission on Higher Education (CHED), the program seeks to promote
          access to quality tertiary education and develop a highly skilled
          workforce for the country.
        </p>
      </div>
    </div>
  );
};

export default Card;
