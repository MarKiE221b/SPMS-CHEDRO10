import { Link } from "react-router-dom";

const NeedToKnow = () => {
  return (
    <div className="flex flex-col items-center md:mx-12 p-10 bg-white border border-gray-300 rounded-lg shadow-xl max-h-full overflow-y-auto">
      <div className="text-center text-blue-900 font-bold font-roboto text-3xl mb-4">
        <h1>APPLICANTS NEEDS TO KNOW!</h1>
      </div>
      <div className="max-w-full text-justify">
        <p className="mb-4">
          The CHED Scholarship Program (CSP) is officially{" "}
          <span className="font-bold text-green-500">OPEN</span> for application
          for the Academic Year 2023-2024. The following are the important
          things that student-applicants need to know:
        </p>
        <h1 className="font-bold">
          A. ON THE MINUMUM GENERAL WEIGHTED AVERAGE(GWA)
        </h1>
        <p className="mb-4">
          <span className="font-bold">
            Student-applicants must be incoming freshmen/first year students
          </span>{" "}
          who are eligible for enrollment in college,{" "}
          <span className="font-bold">
            with at least 96% or its equivalent for the Full Merit Program and
            93% to 95% or its equivalent for the Half Merit Program
          </span>{" "}
          and must enroll in recognized priority programs in private Higher
          Education Institutions (HEI's) or State Universities and Colleges
          (SUC's)/or accredited Local Universities and Colleges (LUC's) with
          Certificates of Program Compliance (COPC).
        </p>
        <h1 className="font-bold">B. ELIGIBILITY REQUIREMENTS</h1>
        <span className="mb-4">
          Student-applicants must comply with the following requirements for the
          scholarship grant and be uploaded to the student-applicant designated
          portal account preferably in PDF format:
          <ul className="list-decimal list-inside space-y-4">
            <li>
              Certified true copy of Birth Certificate as proof of Filipino
              citizenship;
            </li>
            <li>
              Combined annual gross income of parent's or guardian which does
              not exceed PHP400,000.00, or in cases where the income exceeds
              PHP400,000.00, a student-applicant must present a written
              certification or medical findings of illness of a family member
              from a licensed medical doctor, and/or school certification of two
              or more dependents enrolled in college from an authorized school
              official;
            </li>
            <li>
              Student-applicants belonging to the special group of persons such
              as the Underprivileged and Homeless Citizens under RA No. 7279,
              Persons with Disability under RA No. 7277 as amended, Solo Parents
              and/or their Dependents under RA 8972, Senior Citizens under RA
              9994, and Indigenous Peoples under RA 8371, must submit
              certifications and/or Identification Cards (IDs) issued by the
              appropriate offices or agencies:
            </li>
            <li>
              High school report card for students eligible for enrollment in
              college, and duly certified true copy of grades for Grade 11 and
              1st Semester of Grade 12 for graduating high school students;
            </li>
            <li>
              Must submit ANY of the following:
              <ul className="list-disc list-inside space-y-1">
                <li>Latest Income Tax Return (ITR) of parents or guardian;</li>
                <li>
                  Certificate of Tax Exemption from the Bureau of Internal
                  Revenue (BIR);
                </li>
                <li>
                  Certificate of Indigency either from their Barangay or
                  Department of Social Welfare and Development (DSWD);
                </li>
                <li>Case Study Report from DSWD:</li>
                <li>
                  Latest copy of employment contract or proof of income of
                  parents may be considered for children of Overseas Filipino
                  Workers (OFW) and Seafarers.
                </li>
              </ul>
            </li>
          </ul>
        </span>
        <h1 className="font-bold">C. FINANCIAL ASSISTANCE</h1>
        <p className="mb-4">
          The financial assistance will cover the tuition and other school fees
          (TOSF), stipends, and book/connectivity allowances per semester which
          will be released directly to the scholars through the HEI
        </p>
        <p className="mb-4">
          Below is the list of the financial packages for the Full and Half
          Merit Scholars:
        </p>
        <div className="mb-4">
          <h1 className="font-bold">PRIVATE HEI'S</h1>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm font-roboto text-center text-gray-500">
              <thead className="text-sm text-black bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Period
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOSF
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stipend
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Book/Connectivity Allowance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                <tr className="bg-white border-b border-t">
                  <th
                    className="px-6 py-4 font-roboto font-medium whitespace-nowrap"
                    rowSpan={2}
                    scope="row"
                  >
                    Full PESFA
                  </th>
                  <td>Annual</td>
                  <td>40,000</td>
                  <td>70,000</td>
                  <td>10,000</td>
                  <td>120,000</td>
                </tr>
                <tr className="border-b">
                  <td>Semestral</td>
                  <td>20,000</td>
                  <td>35,000</td>
                  <td>5,000</td>
                  <td>60,000</td>
                </tr>
                <tr className="bg-white border-b">
                  <th
                    className="px-6 py-4 font-roboto font-medium whitespace-nowrap"
                    rowSpan={2}
                    scope="row"
                  >
                    Half PESFA
                  </th>
                  <td>Annual</td>
                  <td>20,000</td>
                  <td>35,000</td>
                  <td>5,000</td>
                  <td>60,000</td>
                </tr>
                <tr className="border-b">
                  <td>Semestral</td>
                  <td>10,000</td>
                  <td>17,500</td>
                  <td>2,500</td>
                  <td>30,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-4">
          <h1 className="font-bold">SUC'S LUC'S</h1>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm font-roboto text-center text-gray-500">
              <thead className="text-sm text-black bg-gray-100">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Program
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Period
                  </th>
                  <th scope="col" className="px-6 py-3">
                    TOSF
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Stipend
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Book/Connectivity Allowance
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="text-black">
                <tr className="bg-white border-b border-t">
                  <th
                    className="px-6 py-4 font-roboto font-medium whitespace-nowrap"
                    rowSpan={2}
                    scope="row"
                  >
                    Full SSP
                  </th>
                  <td>Annual</td>
                  <td>FREE</td>
                  <td>70,000</td>
                  <td>10,000</td>
                  <td>80,000</td>
                </tr>
                <tr className="border-b">
                  <td>Semestral</td>
                  <td>FREE</td>
                  <td>35,000</td>
                  <td>5,000</td>
                  <td>40,000</td>
                </tr>
                <tr className="bg-white border-b">
                  <th
                    className="px-6 py-4 font-roboto font-medium whitespace-nowrap"
                    rowSpan={2}
                    scope="row"
                  >
                    Half SSP
                  </th>
                  <td>Annual</td>
                  <td>FREE</td>
                  <td>35,000</td>
                  <td>5,000</td>
                  <td>40,000</td>
                </tr>
                <tr className="border-b">
                  <td>Semestral</td>
                  <td>FREE</td>
                  <td>17,500</td>
                  <td>2,500</td>
                  <td>20,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h1 className="font-bold">D. AVAILMENT OF SLOTS</h1>
        <p className="mb-4">
          The availment of the type of scholarships is determined through
          ranking system and availability of slots.
        </p>
      </div>
      <div>
        <Link to="/terms">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-2xl text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
          >
            PROCEED TO APPLICATION
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NeedToKnow;
