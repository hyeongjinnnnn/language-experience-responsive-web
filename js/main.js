/* 웹 스크래핑 테이블 추출 */
const alphabetURL = 'http://localhost:3000/api/alphabet';
const hiraganaURL = 'http://localhost:3000/api/hiragana';
const frenchURL = 'http://localhost:3000/api/french';

// 네이버 검색 결과 페이지에서 테이블을 추출하고 동적으로 생성하는 함수
async function createTableFromNaver(url, tableName) {
  try {
    // 네이버 검색 결과 페이지에서 HTML 가져오기
    const response = await fetch(url);
    const html = await response.text();

    // HTML에서 원하는 테이블 부분 추출
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const tableElement = doc.querySelector('table');

    // 동적으로 생성한 테이블을 표시할 div 요소 찾기
    const resultTableContainer = document.getElementById(tableName);

    // 동적으로 생성한 테이블을 표시
    resultTableContainer.appendChild(tableElement);
  } catch (error) {
    console.error('Error:', error);
  }
}

// 페이지 로드 시 테이블 생성 함수 호출
window.onload = function () {
  const functionsToCall = [
    //() => createTableFromNaver(alphabetURL, "resultTableAlphabet"),
    () => createTableFromNaver(hiraganaURL, 'resultTableHiragana'),
    //() => createTableFromNaver(frenchURL, "resultTableFrench"),
  ];

  functionsToCall.forEach((func) => func());
};

// 영어 단어와 뜻 배열
const english_word = [
  { word: 'love', meaning: '사랑' },
  { word: 'face', meaning: '얼굴' },
  { word: 'lie', meaning: '거짓말' },
  { word: 'subway', meaning: '지하철' },
  { word: 'cat', meaning: '고양이' },
  { word: 'age', meaning: '나이' },
  { word: 'mushroom', meaning: '버섯' },
  { word: 'sea', meaning: '바다' },
  { word: 'color', meaning: '색깔' },
  { word: 'brother', meaning: '형, 오빠' },
  { word: 'insect', meaning: '벌레' },
  { word: 'rain', meaning: '비' },
  { word: 'flower', meaning: '꽃' },
  { word: 'person', meaning: '사람' },
  { word: 'mountain', meaning: '산' },
];
/* 랜덤으로 영어 단어 출력 */
function showRandomEnglishWord() {
  // 랜덤으로 인덱스 선택
  const randomIndex = Math.floor(Math.random() * english_word.length);

  // 선택된 단어와 뜻 표시
  const wordElement = document.getElementById('english_word');
  const meaningElement = document.getElementById('english_meaning');

  wordElement.textContent = english_word[randomIndex].word;
  meaningElement.textContent = english_word[randomIndex].meaning;
}
showRandomEnglishWord();

const japanese_word = [
  { word: 'あい', meaning: '사랑' },
  { word: 'かお', meaning: '얼굴' },
  { word: 'うそ', meaning: '거짓말' },
  { word: 'ちかてつ', meaning: '지하철' },
  { word: 'ねこ', meaning: '고양이' },
  { word: 'とし', meaning: '나이' },
  { word: 'きのこ', meaning: '버섯' },
  { word: 'うみ', meaning: '바다' },
  { word: 'いろ', meaning: '색깔' },
  { word: 'あに', meaning: '형, 오빠' },
  { word: 'むし', meaning: '벌레' },
  { word: 'あめ', meaning: '비' },
  { word: 'はな', meaning: '꽃' },
  { word: 'ひと', meaning: '사람' },
  { word: 'やま', meaning: '산' },
];
/* 랜덤으로 일본어 단어 출력 */
function showRandomJapaneseWord() {
  // 랜덤으로 인덱스 선택
  const randomIndex = Math.floor(Math.random() * japanese_word.length);

  // 선택된 단어와 뜻 표시
  const wordElement = document.getElementById('japanese_word');
  const meaningElement = document.getElementById('japanese_meaning');

  wordElement.textContent = japanese_word[randomIndex].word;
  meaningElement.textContent = japanese_word[randomIndex].meaning;
}
showRandomJapaneseWord();

const french_word = [
  { word: 'amour', meaning: '사랑' },
  { word: 'visage', meaning: '얼굴' },
  { word: 'mensonge', meaning: '거짓말' },
  { word: 'métro', meaning: '지하철' },
  { word: 'chat', meaning: '고양이' },
  { word: 'âge', meaning: '나이' },
  { word: 'champignon', meaning: '버섯' },
  { word: 'mer', meaning: '바다' },
  { word: 'couleur', meaning: '색깔' },
  { word: 'frère', meaning: '형, 오빠' },
  { word: 'insecte', meaning: '벌레' },
  { word: 'pluie', meaning: '비' },
  { word: 'fleur', meaning: '꽃' },
  { word: 'personne', meaning: '사람' },
  { word: 'montagne', meaning: '산' },
];
/* 랜덤으로 프랑스어 단어 출력 */
function showRandomFrenchWord() {
  // 랜덤으로 인덱스 선택
  const randomIndex = Math.floor(Math.random() * french_word.length);

  // 선택된 단어와 뜻 표시
  const wordElement = document.getElementById('french_word');
  const meaningElement = document.getElementById('french_meaning');

  wordElement.textContent = french_word[randomIndex].word;
  meaningElement.textContent = french_word[randomIndex].meaning;
}
showRandomFrenchWord();

/* english translation & listen*/
async function translateEnglishText() {
  const inputText = document.getElementById('inputEnglishText').value;

  if (inputText.trim() === '') {
    alert('번역할 텍스트를 입력하세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/translateToEnglish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    });

    const result = await response.json();

    if (result?.translatedText) {
      document.getElementById('outputEnglishText').value =
        result.translatedText;
    } else {
      alert('번역에 실패했습니다.');
    }
  } catch (error) {
    console.error('에러:', error);
    alert('번역에 실패했습니다.');
  }
}

/* Text To Speech */
function speakEnglishText() {
  const text = document.getElementById('outputEnglishText').value;

  if (text.trim() === '') {
    alert('텍스트가 없습니다.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.8;

  // 음성 재생
  window.speechSynthesis.speak(utterance);
}

/* japanese translation & listen*/
async function translateJapaneseText() {
  const inputText = document.getElementById('inputJapaneseText').value;

  if (inputText.trim() === '') {
    alert('번역할 텍스트를 입력하세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/translateToJapanese', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    });

    const result = await response.json();

    if (result?.translatedText) {
      document.getElementById('outputJapaneseText').value =
        result.translatedText;
    } else {
      alert('번역에 실패했습니다.');
    }
  } catch (error) {
    console.error('에러:', error);
    alert('번역에 실패했습니다.');
  }
}

/* Text To Speech */
function speakJapaneseText() {
  const text = document.getElementById('outputJapaneseText').value;

  if (text.trim() === '') {
    alert('텍스트가 없습니다.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ja-JP';

  // 음성 재생
  window.speechSynthesis.speak(utterance);
}

/* french translation & listen*/
async function translateFrenchText() {
  const inputText = document.getElementById('inputFrenchText').value;

  if (inputText.trim() === '') {
    alert('번역할 텍스트를 입력하세요.');
    return;
  }

  try {
    const response = await fetch('http://localhost:3000/translateToFrench', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputText }),
    });

    const result = await response.json();

    if (result?.translatedText) {
      document.getElementById('outputFrenchText').value = result.translatedText;
    } else {
      alert('번역에 실패했습니다.');
    }
  } catch (error) {
    console.error('에러:', error);
    alert('번역에 실패했습니다.');
  }
}

/* Text To Speech */
function speakFrenchText() {
  const text = document.getElementById('outputFrenchText').value;

  if (text.trim() === '') {
    alert('텍스트가 없습니다.');
    return;
  }

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'fr-FR';

  // 음성 재생
  window.speechSynthesis.speak(utterance);
}

/* 메일 보내기 */
function sendMail() {
  var params = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value,
  };

  const serviceID = 'service_hyeong';
  const templateID = 'template_flzqocd';

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('message').value = '';
      alert('메일 전송이 완료되었습니다.');
    })
    .catch((err) => console.log(err));
}
