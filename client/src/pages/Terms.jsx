import { Link } from "react-router-dom";
const Terms = () => {
  return (
    <div className="flex flex-col items-center md:mx-12 p-10 bg-white border border-gray-300 rounded-lg shadow-xl max-h-full overflow-y-auto">
      <div className="font-bold text-2xl text-center">
        <span>TERMS AND CONDTION</span>
      </div>
      <div className="p-4 text-justify font-normal space-y-4">
        <p className="italic text-lg">
          By signing this application form, I agree to the following terms and
          conditions:
        </p>
        <ul className="ml-5 list-disc list-inside space-y-2">
          <li>
            I certify that all the information provided in this application is
            true, accurate, and complete to the best of my knowledge. I
            understand that any misrepresentation or withholding of information
            will result in automatic disqualification from the CHED Region 10
            Scholarship Program. Moreover, I agree to refund the financial
            benefits received if it is discovered that any of the information I
            provided is false after I have accepted the award.
          </li>
          <li>
            I understand that the decision of the Commission on Higher Education
            regarding the scholarship award is final and non-negotiable.
          </li>
          <li>
            I acknowledge that the scholarship is non-transferable, and I will
            only use it for the academic purposes specified by CHED.
          </li>
          <li>
            I agree to comply with all the rules and regulations of the CHED
            Region 10 Scholarship Program, including those related to academic
            performance, attendance, and conduct.
          </li>

          <li>
            I understand that I may be required to participate in activities or
            events organized by CHED or its partner institutions as part of my
            scholarship requirements.
          </li>
          <li>
            I hereby express my consent for the Commission on Higher Education
            to collect, record, organize, update, or modify, retrieve, consult,
            use, consolidate, block, erase, or destruct my personal data for
            purposes related to the CHED Region 10 Scholarship Program. I also
            agree to be indemnified in case of damages pursuant to the
            provisions of the Republic Act No. 10173 of the Philippines, Data
            Privacy Act of 2012, and its corresponding Implementing Rules and
            Regulations.
          </li>
          <li>
            I understand that failure to comply with any of the terms and
            conditions of the CHED Region 10 Scholarship Program may result in
            the revocation of my scholarship, and I may be required to refund
            the financial benefits received.
          </li>
          <li>
            I agree to notify CHED immediately if there are any changes to my
            personal information or academic status.
          </li>
          <li>
            By signing this application form, I acknowledge that I have read and
            understood the terms and conditions of the CHED Region 10
            Scholarship Program and agree to comply with them.
          </li>
        </ul>
      </div>
      <div>
        <Link to="/h/application">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            I HAVE READ AND AGREE TO THESE TERMS AND CONDITION
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Terms;
