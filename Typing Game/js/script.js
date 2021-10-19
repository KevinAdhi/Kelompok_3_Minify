src="https://code.jquery.com/jquery-3.5.1.min.js";

window.addEventListener("load", waitStart);

// Globals

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

const easyBtn = document.querySelector("#easy");
const mediumBtn = document.querySelector("#medium");
const hardBtn = document.querySelector("#hard");

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
const menuSlideElt = document.getElementById("menuSlide");
$("#optionBtn").click( ()=>{
  menuSlideElt.classList.toggle("slideIn");
});


function sleep(ms) {
  return new Promise((resolve) => startCount = setTimeout(resolve, ms));
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
  menuSlideElt.classList.toggle("slideIn");
  waitStart();
}

function waitStart() {
  // Messages
  if(isPlaying){
    currentWord.innerHTML = "Click start";
    message.innerHTML = "";
  }else{
    currentWord.innerHTML = "Game Over";
    message.innerHTML = "Click start to play again";
  }
  seconds.innerHTML = currentLevel;

  //button start diklik
  $("#start").click(async () => {
    wordInput.value = "";
    $("#start").prop('disabled', true);
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
  showWord(words);
  time = currentLevel;
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
    time = currentLevel;
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
    score = 0;
    clearInterval(countDown);
    wordInput.value = "";
    $("#start").prop('disabled', false);
    waitStart();
  }
  // Show time
  timeDisplay.innerHTML = time;
}


easyBtn.addEventListener("click", setlevel);
mediumBtn.addEventListener("click", setlevel);
hardBtn.addEventListener("click", setlevel);
