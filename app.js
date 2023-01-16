const http = require("http");
const express = require("express");
const cors = require("cors");
const studentsRoute = require("./routes/students");
const courseRoute = require("./routes/course");
const designationRoute = require("./routes/designation");
const expenditureRoute = require("./routes/expenditure");
const salaryRoute = require("./routes/salary");
const departmentRoute = require("./routes/department");
const fieldRoute = require("./routes/field");
const intakeClassRoute = require("./routes/intakeClass");
const unitRoute = require("./routes/unit");
const feeStructureRoute = require("./routes/feeStructure");
const staffRoute = require("./routes/staff");

const app = express();
// middlewares

const app1 = http.createServer(app);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors({ origin: "http://admin.pitps.co.ke" }));

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

app1.listen(8800, () => {
  console.log("connected");
});
