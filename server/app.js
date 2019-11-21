const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const models = require("./models/Index");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({
    message:
      "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."
  });
});
dotenv.config();
const port = process.env.PORT;
models.sequelize.sync({ force: true }).then(() => {
  app.listen(port, () => {
    console.log(`notes application is listening on port ${port}!`);
  });
});
