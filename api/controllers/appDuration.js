import { db } from "../connect.js";
export const getDuration = (req, res) => {
  const q = "SELECT * FROM `application_duration` WHERE `status` = 1";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
