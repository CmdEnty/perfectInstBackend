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
const authRoute = require("./routes/auth");
const resourceRoute = require("./routes/resource");
const userRoute = require("./routes/user");
const feePaymentRoute = require("./routes/feePayment");
const intakeClassSessionRoute = require("./routes/intakeClassSession");
const db = require("./connect");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { default: axios } = require("axios");
require("dotenv").config();
const authenticateUser = require("./middleware/authentication");
const moment = require("moment");

const app = express();
// middlewares

const app1 = http.createServer(app);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
// app.use(authenticateUser);
app.use(xss());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SECRETKEY));
app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors({ origin: "http://admin.pitps.co.ke" }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../pitps/public/uploads/staff/kraPin");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const nhifStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../pitps/public/uploads/staff/nhif");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const nssfStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../pitps/public/uploads/staff/nssf");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const resourcesStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../pitps/public/uploads/admin/resources");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use("/api/auth", authRoute);

// app.use(authenticateUser);

app.post("/api/staffUpload/kraPin", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

const uploadNhif = multer({ storage: nhifStorage });

app.post("/api/staffUpload/nhif", uploadNhif.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

const uploadNssf = multer({ storage: nssfStorage });

app.post("/api/staffUpload/nssf", uploadNssf.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

const uploadResources = multer({ storage: resourcesStorage });

app.post(
  "/api/staffUpload/resource",
  uploadResources.single("file"),
  (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  }
);

//profile pic
const profilePicStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../pitps/public/uploads/staff/profilePic");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const uploadProfilePic = multer({ storage: profilePicStorage });

app.post(
  "/api/staffUpload/profiePic",
  uploadProfilePic.single("file"),
  (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
  }
);

const genereteToken = async (req, res, next) => {
  const consumerSecret = process.env.CONSUMER_SECRET;
  const consumerKey = process.env.CONSUMER_KEY;

  const auth = new Buffer.from(`${consumerKey}:${consumerSecret}`).toString(
    "base64"
  );
  await axios
    .get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization: `Basic ${auth}`,
        },
      }
    )
    .then((response) => {
      req.token = response.data.access_token;
      console.log(response);
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};

app.post("/api/stk", genereteToken, async (req, res) => {
  let token = req.token;
  const phone = req.body.phone.substring(1);
  const amount = req.body.amount;
const timstp = moment(Date.now()).format("YYYYDDMMHHmmss");
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2);
  const consumerSecret = process.env.CONSUMER_SECRET;
  const consumer_Key = process.env.CONSUMER_KEY;
  const shortCode = process.env.SHORTCODE;

  const passwd = new Buffer.from(
    `${shortCode}${consumer_Key}${consumerSecret}`
  ).toString("base64");

  await axios
    .post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: shortCode,
        Password: passwd,
        Timestamp: timstp,
        TransactionType: "CustomerPayBillOnline",
        Amount: "1",
        PartyA: "254769405341",
        PartyB: shortCode,
        PhoneNumber: "254769405341",
        CallBackURL: "https://mydomain.com/pat",
        AccountReference: "test",
        // PassKey: consumer_Key,
        TransactionDesc: "Test",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use("/api/user", userRoute);
app.use("/api/resource", resourceRoute);
app.use("/api/feePayment", feePaymentRoute);
app.use("/api/student", studentsRoute);
app.use("/api/courses", courseRoute);
app.use("/api/designation", designationRoute);
app.use("/api/otherExpenditure", expenditureRoute);
app.use("/api/salary", salaryRoute);
app.use("/api/department", departmentRoute);
app.use("/api/field", fieldRoute);
app.use("/api/intakeClass", intakeClassRoute);
app.use("/api/intakeClassSession", intakeClassSessionRoute);
app.use("/api/unit", unitRoute);
app.use("/api/feeStructure", feeStructureRoute);
app.use("/api/staff", staffRoute);

db.connect((err) => {
  if (err) {
    console.log("Database connection error");
  } else {
    app1.listen(8800, () => {
      console.log("connected");
    });
  }
});
