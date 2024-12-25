const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const { translate } = require("@vitalets/google-translate-api");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  try {
    if (CheckValid(req.body.initData)) {
      next();
    } else {
      next();
      //res.statusCode(404).send("error");
    }
  } catch {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("ok");
});

app.post("/translate", (req, res) => {
  const text = req.body.text;
  translate(text, {
    to: /[a-zA-Z]/.test(text) ? "ru" : "en",
  })
    .then((response) => res.send(response.text))
    .catch(() => res.send("error many requests"));
});

app.listen(6354, () => {
  console.log("server start");
});

function CheckValid(initData) {
  const urlSearchParams = new URLSearchParams(initData);
  const data = Object.fromEntries(urlSearchParams.entries());

  const checkString = Object.keys(data)
    .filter((key) => key !== "hash")
    .map((key) => `${key}=${data[key]}`)
    .sort()
    .join("\n");

  const secretKey = crypto
    .createHmac("sha256", "WebAppData")
    .update(process.env.TELEGRAM_BOT_TOKEN)
    .digest();

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(checkString)
    .digest("hex");

  return data.hash === signature;
}
