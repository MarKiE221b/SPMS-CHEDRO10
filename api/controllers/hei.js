import { db } from "../connect.js";

export const getHei = (req, res) => {
  const q = "SELECT * FROM `hei` ORDER BY `name` ASC";

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};
