const http = require("http");
const fs = require("fs");
const path = require("path");
const { currentTime } = require("./time");

function handle(req, res) {
  let body = "";
  if (req.url.endsWith("html")) {
    body = fs.readFileSync(path.join(__dirname, req.url));
  } else if (req.url === "/time.dy") {
    body = currentTime();
  }
  res.writeHead(200, {
    "content-length": Buffer.byteLength(body),
    "content-type": "text/html",
  });
  res.write(body);
  res.end();
}

const server = http.createServer(handle);

server.listen(3000);
