import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
// import { authmiddleware } from "./middlewares/auth.js";/
import { MongoDB } from "./configs/DBconnection.js";
// import User from "./models/user.js";
import { comparePassword, hashPassword } from "./configs/hashPassword.js";
import jwt from "jsonwebtoken";
// import { get } from "mongoose";
import Student from "./models/student.js";
import Admin from "./models/admin.js";
import studentData from "./data/student.js";
import adminData from "./data/admin.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors(
  {
  
  }
));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", async (req, res) => {
//   return res.status(200).send("Hello World");
// });

app.post("/user/login", async (req, res) => {
  try {
    console.log(req.body);
    const student = await Student.findOne({ rollNumber: req.body.rollNumber }).select(
      "-__v -createdAt -updatedAt "
    );
    if (!student)
      return res
        .status(404)
        .send({ success: false, message: "Student not found" });

    if (req.body.password === null)
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });

    if (!(await comparePassword(req.body.password, student.password) || req.body.password === student.password))
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ data: student }, "secret", { expiresIn: "24h" });
    console.log(student);
    const { password, ...others } = student.toObject();
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      data: others,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

app.post("/admin/login", async (req, res) => {
  try {
    console.log(req.body);
    const admin = await Admin.findOne({ email: req.body.email }).select(
      "-__v -createdAt -updatedAt "
    );
    if (!admin)
      return res
        .status(404)
        .send({ success: false, message: "Admin not found" });

    if (req.body.password === null)
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });

    if (!(await comparePassword(req.body.password, admin.password) || req.body.password === admin.password))
      return res
        .status(401)
        .send({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ data: admin }, "secret", { expiresIn: "1h" });
    console.log(admin);
    const { password, ...others } = admin.toObject();
    res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      data: others,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});






app.patch("/user/student/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });
    res.send({ success: true, message: "User updated successfully", data: user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

app.patch("/user/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Student.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });
    res.send({ success: true, message: "User updated successfully", data: user });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

if(false){
  Student.insertMany(studentData)
  .then(() => console.log('Students imported successfully'))
  .catch(err => console.log(err));
  Admin.insertMany(adminData)
  .then(() => console.log('Admins imported successfully'))
  .catch(err => console.log(err));
}



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  MongoDB();
});
