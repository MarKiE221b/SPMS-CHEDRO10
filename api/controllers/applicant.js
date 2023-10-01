import { db } from "../connect.js";

export const application = (req, res) => {
  //checks application exists
  const q = "SELECT * FROM `applicant` WHERE `phone` = ? AND `email` = ?";

  db.query(q, [req.body.mobile, req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length)
      return res.status(409).json("Application has been processed");

    //calculate points  
    let c = 0;
    if (req.body.groupPeople !== "") c = 5;
    const pointsResult =
      (parseInt(req.body.grades, 10) * 0.7) +
      (parseInt(req.body.income, 10) * 0.3 + c);

    //insert application  
    const q =
      "INSERT INTO `applicant`(`appDuration_id`, `inst_code`, `province_code`, `lastname`, `firstname`, `middlename`, `maidennam`, `date_birth`, `place_birth`, `sex`, `civil_status`, `phone`, `email`, `city`, `barangay`, `zip_code`, `present_addr`, `perma_addr`, `last_school`, `last_schoolAddr`, `last_schoolSec`, `high_grade`, `group_people`, `specify_group`, `father_name`, `father_addr`, `father_phone`, `father_occupation`, `father_employer`, `father_empAddr`, `father_edAttainment`, `mother_name`, `mother_addr`, `mother_phone`, `mother_occupation`, `mother_employer`, `mother_empAddr`, `mother_edAttainment`, `guardian_name`, `guardian_addr`, `guardian_phone`, `guardian_occupation`, `guardian_employer`, `guardian_empAddr`, `guardian_edAttainment`, `parent_incomeTax`, `number_siblings`, `4ps`, `degree_program`, `assistance`, `grade_overall`, `rank_points`) VALUES (?)";

    const values = [
      req.body.appDuration,
      req.body.schoolIntend,
      req.body.provCode,
      req.body.lName,
      req.body.fName,
      req.body.mName,
      req.body.maidName,
      req.body.birthday,
      req.body.placeBirth,
      req.body.sex,
      req.body.civilStatus,
      req.body.mobile,
      req.body.email,
      req.body.cityCode,
      req.body.barangayCode,
      req.body.zipCode,
      req.body.currentAddr,
      req.body.permanentAddr,
      req.body.schoolLast,
      req.body.schoolLastAddr,
      req.body.schoolSector,
      req.body.attGrade,
      req.body.groupPeople,
      req.body.specifyGroup,
      req.body.fatName,
      req.body.fAddr,
      req.body.fContact,
      req.body.fOccupation,
      req.body.fEmpName,
      req.body.fEmpAddr,
      req.body.fEdAtt,
      req.body.matName,
      req.body.mAddr,
      req.body.mContact,
      req.body.mOccupation,
      req.body.mEmpName,
      req.body.mEmpAddr,
      req.body.mEdAtt,
      req.body.gadName,
      req.body.gAddr,
      req.body.gContact,
      req.body.gOccupation,
      req.body.gEmpName,
      req.body.gEmpAddr,
      req.body.gEdAtt,
      req.body.income,
      req.body.siblings,
      req.body.DSWD,
      req.body.degreeProg,
      req.body.edAssistAdd,
      req.body.grades,
      pointsResult,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data.applicant_id);
    });
  });
};
