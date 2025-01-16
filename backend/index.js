const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  try {
    if (CheckValid(req.body.initData)) {
      next();
    } else {
      res.status(404).send("error");
    }
  } catch {
    res.status(404).send("error");
  }
});

app.post("/translate", (req, res) => {
  const text = req.body.text;
  const isenglish = /[a-zA-Z]/.test(text);

  axios
    .post(
      isenglish
        ? "https://rolling-kyle-realdeal-47d00cd3.koyeb.app/translate_to_russian"
        : "https://rolling-kyle-realdeal-47d00cd3.koyeb.app/translate_native_words",
      { text: text }
    )
    .then((response) => {
      if (isenglish) {
        res.send(response.data.translated_text);
      } else {
        res.send(Object.values(response.data.translations).join(" "));
      }
    })
    .catch(() => res.status(404).send("error translate"));
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
