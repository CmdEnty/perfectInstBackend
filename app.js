import express from "express";
import cors from "cors";
import studentsRoute from "./routes/students.js";
import courseRoute from "./routes/course.js";
import designationRoute from "./routes/designation.js";
import expenditureRoute from "./routes/expenditure.js";
import salaryRoute from "./routes/salary.js";
import departmentRoute from "./routes/department.js";
import fieldRoute from "./routes/field.js";
import intakeClassRoute from "./routes/intakeClass.js";
import unitRoute from "./routes/unit.js";
import feeStructureRoute from "./routes/feeStructure.js";
import staffRoute from "./routes/staff.js";

const app = express();
// middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/student", studentsRoute);
app.use("/api/courses", courseRoute);
app.use("/api/designation", designationRoute);
app.use("/api/otherExpenditure", expenditureRoute);
app.use("/api/salary", salaryRoute);
app.use("/api/department", departmentRoute);
app.use("/api/field", fieldRoute);
app.use("/api/intakeClass", intakeClassRoute);
app.use("/api/unit", unitRoute);
app.use("/api/feeStructure", feeStructureRoute);
app.use("/api/staff", staffRoute);

app.listen(8800, () => {
  console.log("app is working");
});
