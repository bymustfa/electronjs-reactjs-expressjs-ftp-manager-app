let express = require("express");
const cors = require("cors");
let app = express();
app.use(cors());
const ftp = require("basic-ftp");

require("dotenv").config();
let env = process.env;
let PORT = env.EXPRESS_PORT || 3005;

const ftpInfos = {
  host: env.FTP_ADRESS,
  user: env.FTP_USER,
  password: env.FTP_PASSWORD,
  secure: false,
};

const shortName = (name) => {
  if (name.length > 10) {
    name =
      name.substr(0, 10) + "..." + name.substr(name.length - 4, name.length);
  }
  return name;
};

const extention = (name) => {
  let ex = name.split(".");
  if (ex.length > 1) {
    ex = ex[ex.length - 1];
  }
  return ex;
};

const fileSize = (bytes, si = false, dp = 1) => {
  const thresh = si ? 1000 : 1024;
  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }
  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;
  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );
  return bytes.toFixed(dp) + " " + units[u];
};

app.get("/", function (req, res) {
  res.send({
    message: "Welcome FTP API",
  });
});

app.get("/ftp", async (req, res, next) => {
  try {
    const { query } = req;
    if (query.path) {
      const list = await listFiles(query.path);

      res.send(list);
    } else {
      const list = await listFiles();
      res.send(list);
    }
  } catch (err) {
    next(err);
  }
});

async function listFiles(path = ".") {
  let tmpPath = path !== "." ? JSON.parse(path).join("/") : path;
  let pathArray = path !== "." ? JSON.parse(path) : path;
  const client = new ftp.Client();
  await client.access(ftpInfos);
  let list = await client.list(tmpPath);
  list = list.map((x) => {
    return {
      uniqueID: x.uniqueID,
      name: x.name,
      shortName: shortName(x.name),
      ex: extention(x.name),
      size: x.size,
      fileSize: fileSize(x.size),
    };
  });
  return { path: tmpPath, pathArray: pathArray, list: list };
}

let server = app.listen(PORT, function () {
  console.log("http://localhost:" + PORT);
});

module.exports = app;
