import { db } from "../connect.js";

export const getIncome = (req, res) => {
    const q = "SELECT * FROM `income_points`";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };
  
  export const getGrade = (req, res) => {
    const q = "SELECT * FROM `grade_points`";
  
    db.query(q, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  };