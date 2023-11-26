const express = require("express");
const axios = require("axios");
const cors = require("cors"); // cors 모듈 추가
const fs = require("fs"); // fs 모듈 추가

const app = express();
const port = 3000;

// CORS 설정
app.use(cors());

app.get("/api/search", async (req, res) => {
  try {
    const searchURL =
      "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%ED%9E%88%EB%9D%BC%EA%B0%80%EB%82%98+%ED%91%9C";

    const response = await axios.get(searchURL);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
