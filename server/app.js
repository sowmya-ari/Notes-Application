const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const models = require("./models/Index");
const notesroutes = require("./routes/Notes");
const userroutes = require("./routes/Users");
const validatetoken = require("./utils/Jwt");

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Notes application"
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(userroutes);
app.use(validatetoken.ValidateToken);
app.use(notesroutes);

dotenv.config();
const port = process.env.PORT;
models.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Notes application is listening on port ${port}!`);
  });
});

module.exports = app;
