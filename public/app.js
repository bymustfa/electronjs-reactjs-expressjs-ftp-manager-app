// let express = require("express");
// let app = express();
// const ftp = require("basic-ftp");
// require("dotenv").config();
//
// let env = process.env;
//
// let PORT = env.EXPRESS_PORT || 3005;
//
// const ftpInfos = {
//   host: env.FTP_ADRESS,
//   user: env.FTP_USER,
//   password: env.FTP_PASSWORD,
//   secure: false,
// };
//
// app.get("/", function (req, res) {
//   res.send({
//     message: "Welcome FTP API",
//   });
// });
//
// app.get("/list", async function (req, res) {
//   const client = new ftp.Client();
//   const { query } = req;
//   console.log(query);
//   const path = query?.path || ".";
//   try {
//     await client.access(ftpInfos);
//     const list = await client.list(path);
//
//     res.send(list);
//   } catch (err) {
//     res.send({ error: err });
//   }
// });
//
// app.get("/download", async function (req, res) {
//   const client = new ftp.Client();
//   const { query } = req;
//   console.log(query);
//   const path = query?.path || ".";
//   try {
//     await client.access(ftpInfos);
//     const { query } = req;
//     const path = query?.path || ".";
//     let result = await client.downloadTo("./ftpFiles/indir", path + "/indir");
//     res.send(result);
//   } catch (err) {
//     res.send({ error: err });
//   }
// });
//
// let server = app.listen(PORT, function () {
//   console.log("http://localhost:" + PORT);
// });
//
// module.exports = app;
