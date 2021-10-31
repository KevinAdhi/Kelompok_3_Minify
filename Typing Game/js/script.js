src = "https://code.jquery.com/jquery-3.5.1.min.js";

window.addEventListener("load", waitStart);

// Available Levels
const levels = {
    easy: "easy",
    medium: "medium",
    hard: "hard",
};

//inisialisasi variabel awal(default)
const initialTime = 60;
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

//arrays
//words easy
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
//words medium
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
//words hard
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
//Messages yang ditampilkan saat benar
const messages = [
    "great",
    "wonderful",
    "perfect",
    "awesome",
    "keep it up",
    "almost there",
];

//option
const menuSlideElt = document.getElementById("menuSlide");
$("#optionBtn").click(() => {
    menuSlideElt.classList.toggle("slideIn");
});

//Untuk menampilkan pesan saat game selesai
function showEndMessage() {
    var $score = $("<h3/>")
        .addClass("appended")
        .html(`<h3>Score : ${score}</h3>`);
    var $pesan = $("<h3/>").addClass("appended").html(`<h3>Good Job!</h3>`);
    $("#main-view").append($score);
    $("#main-view").append($pesan);
}

//sleep/delay
function sleep(ms) {
    return new Promise((resolve) => (startCount = setTimeout(resolve, ms)));
}

// setelah memilih level
function setlevel(e) {
    if (e.target === easyBtn) {
        currentLevel = levels.easy;
    } else if (e.target === mediumBtn) {
        currentLevel = levels.medium;
    } else if (e.target === hardBtn) {
        currentLevel = levels.hard;
    }

    //game direset
    time = 0;
    timeDisplay.innerHTML = time;
    menuSlideElt.classList.toggle("slideIn");
    clearInterval(countDown);
    wordInput.value = "";
    $("#start").prop("disabled", false);
    isPlaying = true;
    $(":header").remove(".appended");
    waitStart();
}

//menunggu player menekan tombol start
function waitStart() {
    // pesan yang ditampilkan pada saat menunggu
    if (isPlaying) {
        //player pertama kali main
        currentWord.innerHTML = "Click Start";
        message.innerHTML = "";
    } else {
        //player sudah main sebelumnya
        currentWord.innerHTML = `Time's Up `;
        showEndMessage();
        message.innerHTML = "Click Start to Play Again";
    }

    //inisialisasi waktu, level,da  high score
    seconds.innerHTML = initialTime;
    difficulty.innerHTML = currentLevel;
    maxScore = localStorage.getItem("highScore");
    highScoreElt.innerHTML = maxScore;

    //button start diklik
    $("#start").click(async () => {
        $(":header").remove(".appended"); //menghapus pesan end message
        score = 0;
        wordInput.value = "";
        $("#start").prop("disabled", true);
        //countdown sebelum mulai game
        for (let i = 3; i > 0; i--) {
            currentWord.innerHTML = i;
            await sleep(1000);
            clearTimeout(startCount);
        }
        clearTimeout(startCount);
        isPlaying = true;
        init();
    });
}

// memulai game
function init() {
    // Menampilkan kata dan waktu
    showWord();
    time = initialTime;
    timeDisplay.innerHTML = time;

    wordInput.addEventListener("input", startMatch);
    // countdown waktu permainan
    countDown = setInterval(countdown, 1000);
}

//sistem score (Game sedang jalan)
function startMatch() {
    wordInput.value = wordInput.value.toLowerCase();
    // menambah score jika benar
    if (matchWords()) {
        scoreDisplay.innerHTML = score;
        showWord();
        wordInput.value = "";
        score++;
        scoreDisplay.innerHTML = score;
    }

    //high score baru
    if (score >= maxScore) {
        localStorage.setItem("highScore", score);
        maxScore = localStorage.getItem("highScore");
        highScoreElt.innerHTML = maxScore;
    }
}

// cek kesamaan kata dan input
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

//menampilkan pesan motivasi jika benar
function showMessage() {
    // membuat random index
    const randIndex = Math.floor(Math.random() * messages.length);
    // output pesan dari arrat messages
    message.innerHTML = messages[randIndex] + "!";
}

// Countdown waktu bermain
function countdown() {
    if (time > 0) {
        time--;
    } else if (time === 0) {
        // Game selesai
        //game di reset
        isPlaying = false;
        clearInterval(countDown);
        wordInput.value = "";
        $("#start").prop("disabled", false);
        waitStart();
    }
    // Show time
    timeDisplay.innerHTML = time;
}

//memilih level pada menu
easyBtn.addEventListener("click", setlevel);
mediumBtn.addEventListener("click", setlevel);
hardBtn.addEventListener("click", setlevel);
