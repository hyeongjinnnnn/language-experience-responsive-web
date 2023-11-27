const express = require('express');
const axios = require('axios');
const cors = require('cors'); // cors 모듈 추가
const fs = require('fs'); // fs 모듈 추가
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// CORS 설정
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

/* 영어 알파벳 
app.get("/api/alphabet", async (req, res) => {
  try {
    const searchURL =
      "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EC%98%81%EC%96%B4+%EC%95%8C%ED%8C%8C%EB%B2%B3+%EB%B0%B0%EC%97%B4";

    const response = await axios.get(searchURL);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
*/

app.get('/api/hiragana', async (req, res) => {
  try {
    const searchURL =
      'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%ED%9E%88%EB%9D%BC%EA%B0%80%EB%82%98+%ED%91%9C';

    const response = await axios.get(searchURL);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

/* 프랑스어
app.get("/api/french", async (req, res) => {
  try {
    const searchURL =
      "https://venglishstudy.tistory.com/entry/%ED%94%84%EB%9E%91%EC%8A%A4%EC%96%B4-%EC%95%8C%ED%8C%8C%EB%B2%B3-%EB%B0%9C%EC%9D%8C%ED%94%84%EB%9E%91%EC%8A%A4%EC%96%B4-%EB%AA%A8%EC%9D%8C%EC%9D%84-%EB%B0%B0%EC%9B%8C%EB%B3%B4%EC%9E%90";

    const response = await axios.get(searchURL);
    const data = response.data;

    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});
*/

//번역 앤드포인트
app.post('/translateToEnglish', async (req, res) => {
  const { text } = req.body;
  const clientId = '9ljWgWQDh8wydwsCK1yR'; // api key id
  const clientSecret = 'dW4i3ee7Cc'; // api key secret
  const papagoUrl = 'https://openapi.naver.com/v1/papago/n2mt';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Naver-Client-Id': '9ljWgWQDh8wydwsCK1yR',
    'X-Naver-Client-Secret': 'pnb82zY9oZ',
  };

  const data = new URLSearchParams({
    source: 'ko',
    target: 'en',
    text: text,
  });

  try {
    const response = await fetch(papagoUrl, {
      method: 'POST',
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error('API 호출이 실패했습니다.');
    }

    const result = await response.json();
    const translatedText = result.message.result.translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error('번역 오류:', error);
    res.status(500).json({ error: '번역 오류가 발생했습니다.' });
  }
});

app.post('/translateToJapanese', async (req, res) => {
  const { text } = req.body;
  const clientId = '9ljWgWQDh8wydwsCK1yR'; // api key id
  const clientSecret = 'dW4i3ee7Cc'; // api key secret
  const papagoUrl = 'https://openapi.naver.com/v1/papago/n2mt';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Naver-Client-Id': '9ljWgWQDh8wydwsCK1yR',
    'X-Naver-Client-Secret': 'pnb82zY9oZ',
  };

  const data = new URLSearchParams({
    source: 'ko',
    target: 'ja',
    text: text,
  });

  try {
    const response = await fetch(papagoUrl, {
      method: 'POST',
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error('API 호출이 실패했습니다.');
    }

    const result = await response.json();
    const translatedText = result.message.result.translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error('번역 오류:', error);
    res.status(500).json({ error: '번역 오류가 발생했습니다.' });
  }
});

app.post('/translateToFrench', async (req, res) => {
  const { text } = req.body;
  const clientId = '9ljWgWQDh8wydwsCK1yR'; // api key id
  const clientSecret = 'dW4i3ee7Cc'; // api key secret
  const papagoUrl = 'https://openapi.naver.com/v1/papago/n2mt';

  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Naver-Client-Id': '9ljWgWQDh8wydwsCK1yR',
    'X-Naver-Client-Secret': 'pnb82zY9oZ',
  };

  const data = new URLSearchParams({
    source: 'ko',
    target: 'fr',
    text: text,
  });

  try {
    const response = await fetch(papagoUrl, {
      method: 'POST',
      headers: headers,
      body: data,
    });

    if (!response.ok) {
      throw new Error('API 호출이 실패했습니다.');
    }

    const result = await response.json();
    const translatedText = result.message.result.translatedText;

    res.json({ translatedText });
  } catch (error) {
    console.error('번역 오류:', error);
    res.status(500).json({ error: '번역 오류가 발생했습니다.' });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log('서버가 http://localhost:${port} 에서 실행 중입니다.');
});
