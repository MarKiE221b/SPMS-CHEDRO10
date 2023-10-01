import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const q = "SELECT * FROM scholar WHERE scholar_id = ?";

  db.query(q, [req.body.scholar_id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkPassword)
      return res.status(400).json("Wrong password or username!");

    const token = jwt.sign(
      { id: data[0].scholar_id },
      process.env.REACT_JWT_API_KEY,
      { expiresIn: "1d" }
    );

    const { password, ...others } = data[0];

    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(others);
  });
};

export const getTokenData = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    res.json({ message: "No Token" });
  } else {
    jwt.verify(token, process.env.REACT_JWT_API_KEY, (err, decoded) => {
      if (err) {
        res.json("Auth Error");
      } else {
        res.json({ id: decoded.id });
      }
    });
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken").status(200).json(null);
};

export const getDuration = (req, res)=>{
  const q = "SELECT * FROM `application_duration`"

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Application Duration Not Found!");

    res.status(200).json(data[0])
  })

}