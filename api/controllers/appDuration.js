import { db } from "../connect.js";
export const getDuration = (req, res) => {
  const q =
    "SELECT appDuration_id, school_year, status FROM application_duration CROSS JOIN school_yr WHERE application_duration.sy_id = school_yr.sy_id AND status = 1";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(200).json(null);
    return res.status(200).json(data);
  });
};
