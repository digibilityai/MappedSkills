const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const hostname = process.env.HOSTNAME || "0.0.0.0";
const dev = false;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    createServer(async (req, res) => {
      try {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
      } catch (error) {
        console.error("Request error:", req.url, error);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    })
      .once("error", (error) => {
        console.error("Server error:", error);
        process.exit(1);
      })
      .listen(port, hostname, () => {
        console.log(`Next.js ready on http://${hostname}:${port}`);
      });
  })
  .catch((error) => {
    console.error("Failed to start Next.js:", error);
    process.exit(1);
  });
