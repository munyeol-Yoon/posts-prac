const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const apiRouter = require("./routes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
