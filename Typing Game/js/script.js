window.addEventListener("load", waitStart);

// Globlas

// Available Levels
const levels = {
  easy: 5,
  medium: 3,
  hard: 2,
};

// To change level
let currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;
let maxScore;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const highScoreElt = document.querySelector("#high-score");

const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");
const startBtn = document.querySelector("#start");

const words = [
  "angular",
  "magic",
  "brew",
  "while",
  "throw",
  "css",
  "break",
  "swing",
  "echo",
  "let",
  "wall",
  "laughter",
  "hash",
  "spinner",
  "beer",
  "ninja",
  "javascript",
  "master",
  "program",
  "coding",
  "hero",
  "learning",
  "work",
  "case",
  "react",
  "dragon",
  "rush",
  "api",
  "init",
  "motion",
  "google",
  "float",
  "damn",
  "block",
  "ranking",
  "nice",
  "machine",
  "perfect",
  "deploy",
  "terminal",
  "array",
  "vue",
  "node",
  "html",
  "front",
  "grid",
  "stack",
  "mac",
  "console",
  "ajax",
  "heroku",
  "loop",
  "sql",
  "php",
  "data",
  "npm",
  "server",
  "bash",
];
const messages = ["great", "wonderfull", "perfect", "awesome"];
//option
const settingOption = document.getElementById("optionBtn");
const menuSlideElt = document.getElementById("menuSlide");

settingOption.addEventListener("click", function () {
  menuSlideElt.classList.toggle("slideIn");
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Seclect level
function setlevel(e) {
  if (e.target === easyBtn) {
    currentLevel = levels.easy;
  } else if (e.target === mediumBtn) {
    currentLevel = levels.medium;
  } else if (e.target === hardBtn) {
    currentLevel = levels.hard;
  }
  console.log(currentLevel);
  waitStart();
}

function waitStart() {
  // Show number of sec in UI
  seconds.innerHTML = currentLevel;

  currentWord.innerHTML = "Click start";
  startBtn.addEventListener("click", async function () {
    for (let i = 3; i > 0; i--) {
      currentWord.innerHTML = i;
      await sleep(1000);
    }
    init();
  });
}

// Initialize Game
function init() {
  // Load word from array
  showWord(words);
  isPlaying = true;
  time = currentLevel + 1;
  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  setInterval(countdown, 1000);
  // Check game status
  setInterval(checkStatus, 50);
  maxScore = localStorage.getItem("highScore");
  highScoreElt.innerHTML = maxScore;
}

//Start match
function startMatch() {
  wordInput.value = wordInput.value.toLowerCase();
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    if (currentLevel === levels.easy) {
      score++;
    }
    if (currentLevel === levels.medium) {
      score += 2;
    }
    if (currentLevel === levels.hard) {
      score += 3;
    }
  }

  // If score is -1 display zero
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
    highScoreElt.innerHTML = score;

    if (score >= maxScore) {
      localStorage.setItem("highScore", score);
    }
  }
  maxScore = localStorage.getItem("highScore");
  scoreDisplay.innerHTML = score;
  highScoreElt.innerHTML = maxScore;
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    showMessage();
    return true;
  } else {
    return false;
  }
}

// Pick and show random word
function showWord(word) {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * words.length);
  // Output random word
  currentWord.innerHTML = words[randIndex];
}

function showMessage() {
  // Generate random array index
  const randIndex = Math.floor(Math.random() * messages.length);
  // Output random word
  message.innerHTML = messages[randIndex] + "!";
}

// Countdown timer

function countdown() {
  // Make sure time is not runout
  if (time > 0) {
    // decrement
    time--;
  } else if (time === 0) {
    // Game is over
    isPlaying = false;
  }
  // Show time
  timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Click start to play again";
    currentWord.innerHTML = "Game Over!";
    score = 0;
  }
}

easyBtn.addEventListener("click", setlevel);
mediumBtn.addEventListener("click", setlevel);
hardBtn.addEventListener("click", setlevel);
