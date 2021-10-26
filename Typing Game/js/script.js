src = "https://code.jquery.com/jquery-3.5.1.min.js";

window.addEventListener("load", waitStart);

// Globals

// Available Levels
const levels = {
  easy: "easy",
  medium: "medium",
  hard: "hard",
};
const initialTime = 60;
// To change level
let currentLevel = levels.easy;

let time = initialTime;
let score = 0;
let isPlaying = true;
let maxScore;
let countDown;
let startCount;

// DOM Elements
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");
const highScoreElt = document.querySelector("#high-score");
const difficulty = document.querySelector("#level");

const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");

const wordsEasy = [
  "brew",
  "css",
  "echo",
  "let",
  "wall",
  "hash",
  "beer",
  "hero",
  "work",
  "case",
  "rush",
  "api",
  "init",
  "dash",
  "nice",
  "vue",
  "node",
  "html",
  "grid",
  "mac",
  "ajax",
  "loop",
  "sql",
  "php",
  "data",
  "npm",
  "bash",
  "go",
  "long",
  "else",
  "act",
  "done",
  "not",
  "and",
  "add",
  "ago",
  "age",
  "aid",
  "air",
  "orb",
  "ore",
  "bed",
  "bad",
  "bet",
  "big",
  "bit",
  "box",
  "boy",
  "buy",
  "bus",
  "but",
  "can",
  "cap",
  "car",
  "cat",
  "dog",
  "mom",
  "dad",
  "day",
  "dig",
  "ear",
];
const wordsMed = [
  "magic",
  "while",
  "throw",
  "break",
  "swing",
  "ninja",
  "master",
  "coding",
  "react",
  "dragon",
  "motion",
  "google",
  "float",
  "block",
  "deploy",
  "array",
  "front",
  "stack",
  "heroku",
  "server",
  "respect",
  "felony",
  "among",
  "shear",
  "shorn",
  "extend",
  "except",
  "learn",
  "errors",
  "thing",
  "driver",
  "chair",
  "drugs",
  "table",
  "dream",
  "empty",
  "enable",
  "engage",
  "engine",
  "english",
  "episode",
  "serial",
  "estimate",
  "evidence",
  "examine",
  "example",
  "exceed",
  "familiar",
  "feature",
  "federal",
  "favorite",
  "friendly",
  "frequent",
  "founder",
  "generate",
  "graduate",
  "headline",
  "earphone",
  "handphone",
  "headset",
  "highway",
  "hospital",
];
const wordsHard = [
  "presentation",
  "subscription",
  "javascript",
  "programming",
  "learning",
  "industrial",
  "machinery",
  "perfection",
  "terminal",
  "proposal",
  "researches",
  "environment",
  "completed",
  "trousers",
  "appreciate",
  "subsequent",
  "analyzes",
  "remarkable",
  "staggering",
  "exaggerate",
  "compliment",
  "complexity",
  "notification",
  "incorporate",
  "survival",
  "extension",
  "powershell",
  "visualize",
  "something",
  "requirement",
  "accompany",
  "accomplish",
  "achievement",
  "acknowledge",
  "administration",
  "administrator",
  "approximately",
  "arrangement",
  "assignment",
  "association",
  "assumption",
  "circumstance",
  "communication",
  "comprehensive",
  "consciousness",
  "contemporary",
  "discrimination",
  "fundamental",
  "furthermore",
  "grandmother",
  "independence",
  "recommendation",
  "representation",
  "representative",
  "temperature",
  "transformation",
  "transportation",
  "understanding",
  "unfortunately",
];
const messages = ["great", "wonderful", "perfect", "awesome","keep it up","almost there"];

//option
const menuSlideElt = document.getElementById("menuSlide");
$("#optionBtn").click(() => {
  menuSlideElt.classList.toggle("slideIn");
});

function showEndMessage() {
  var $score = $("<h3/>")
    .addClass("appended")
    .html(`<h3>Score : ${score}</h3>`);
  var $pesan = $("<h3/>").addClass("appended").html(`<h3>Good Job!</h3>`);
  $("#main-view").append($score);
  $("#main-view").append($pesan);
}

function sleep(ms) {
  return new Promise((resolve) => (startCount = setTimeout(resolve, ms)));
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
  time = 0;
  timeDisplay.innerHTML = time;
  menuSlideElt.classList.toggle("slideIn");
  clearInterval(countDown);
  wordInput.value = "";
  $("#start").prop("disabled", false);
  waitStart();
}

function waitStart() {
  // Messages
  if (isPlaying) {
    currentWord.innerHTML = "Click Start";
    message.innerHTML = "";
  } else {
    currentWord.innerHTML = `Time's Up `;
    showEndMessage();
    message.innerHTML = "Click Start to Play Again";
  }
  seconds.innerHTML = initialTime;
  difficulty.innerHTML = currentLevel;

  //button start diklik
  $("#start").click(async () => {
    $(":header").remove(".appended");
    score = 0;
    wordInput.value = "";
    $("#start").prop("disabled", true);
    for (let i = 3; i > 0; i--) {
      currentWord.innerHTML = i;
      console.log(i);
      await sleep(1000);
      clearTimeout(startCount);
    }
    clearTimeout(startCount);
    console.log("done");
    isPlaying = true;

    init();
  });
}

// Initialize Game
function init() {
  // Load word from array
  showWord();
  time = initialTime;
  timeDisplay.innerHTML = time;

  // Start matching on word input
  wordInput.addEventListener("input", startMatch);
  // Call countdown every second
  countDown = setInterval(countdown, 1000);

  maxScore = localStorage.getItem("highScore");
  scoreDisplay.innerHTML = score;
  highScoreElt.innerHTML = maxScore;
}

//Start match (Game udah jalan)
function startMatch() {
  wordInput.value = wordInput.value.toLowerCase();
  if (matchWords()) {
    // isPlaying = true;
    scoreDisplay.innerHTML = score;
    showWord();

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
  highScoreElt.innerHTML = maxScore;
}

// Match currentWord to wordInput
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    showMessage();
    return true;
  }
}

// Pick and show random word
function showWord(word) {
  var words;
  if (currentLevel === levels.easy) {
    words = wordsEasy;
  } else if (currentLevel === levels.medium) {
    words = wordsMed;
  } else if (currentLevel === levels.hard) {
    words = wordsHard;
  }
  const randIndex = Math.floor(Math.random() * words.length);
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

    clearInterval(countDown);
    wordInput.value = "";
    $("#start").prop("disabled", false);
    waitStart();
  }
  // Show time
  timeDisplay.innerHTML = time;
}

easyBtn.addEventListener("click", setlevel);
mediumBtn.addEventListener("click", setlevel);
hardBtn.addEventListener("click", setlevel);
