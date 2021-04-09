let express = require("express");
let app = express();
app.get("/", function (req, res) {
  res.send({ name: "mustafa", demo: "dasd" });
});
let server = app.listen(3005, function () {
  console.log("http://localhost: " + server.address().port);
});
module.exports = app;
