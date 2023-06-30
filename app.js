const express = require("express");
const dotenv = require("dotenv");
const margan = require("morgan");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
