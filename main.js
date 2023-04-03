"use strict";

const container = document.getElementById("container");

const number_1 = document.getElementById("num1");
const number_2 = document.getElementById("num2");
const operations = document.getElementById("amal");
const result = document.getElementById("result");

const btnAnswer = document.querySelectorAll(".btn");
const chance = document.getElementById("chance");
const nextRound = document.getElementById("nextRound");
const check = document.getElementById("check");
const box = document.querySelectorAll(".box");
const resetBtn = document.querySelector(".reset");
const startBtn = document.getElementById("start")
const startModal = document.getElementById("startModal")

const modal = document.querySelector(".modalDiv");
let green = document.querySelector(".green");
let red = document.querySelector(".red");
let black = document.querySelector(".black");

const timing = document.getElementById("timing");

let questionsGenerate;
let result_Number;
let counter = 1;

let blackScore = 0;
let redScore = 0;
let greenScore = 0;

let time = 10;
let timerGenrate;
let bonusTime = 0;

function generateNumber() {
  let number1_generate = Math.floor(Math.random() * 20);
  let number2_generate = Math.floor(Math.random() * 20);
  let operation_generate = ["*", "-", "+"].sort(() => Math.random() - 0.5)[0];

  number_1.textContent = number1_generate;
  number_2.textContent = number2_generate;
  operations.textContent = operation_generate;

  result_Number = eval(
    `${number_1.textContent} ${operations.textContent} ${number_2.textContent}`
  );
}

function generateQuestions() {
  questionsGenerate = [
    result_Number + 20,
    result_Number - 10,
    result_Number - 20,
  ];

  questionsGenerate.push(result_Number);
  questionsGenerate.sort(() => Math.random() - 0.5);

  chance.textContent = counter;
  green.textContent = greenScore;
  red.textContent = redScore;
  black.textContent = blackScore;

  timing.textContent = time;

  btnAnswer[0].textContent = questionsGenerate[0];
  btnAnswer[1].textContent = questionsGenerate[1];
  btnAnswer[2].textContent = questionsGenerate[2];
  btnAnswer[3].textContent = questionsGenerate[3];
}


container.style.display = 'none';
startBtn.addEventListener("click", () =>{
  startModal.style.display = 'none'
  container.style.display = 'block';
  timerFunction()
})

function timerFunction() {
  timerGenrate = setInterval(() => {
    time--;
    timing.textContent = time;

    if (timing.textContent == "0") {
      clearInterval(timerGenrate);
      box[counter - 1].classList.add("timeEnd");

      btnAnswer.forEach((item) => {
        item.addEventListener("click", () => {
          clearInterval(timerGenrate);
        });

        if (item.textContent == result_Number) {
          btnAnswer.forEach((elm) => {
            elm.style.pointerEvents = "none";
          });

          nextRound.style.pointerEvents = "all";
          item.style.backgroundColor = "green";
          item.style.color = "#fff";
        }
      });
    }
  }, 1000);

  btnAnswer.forEach((item) => {
    item.addEventListener("click", () => {
      clearInterval(timerGenrate);
      // btnAnswer.forEach((elm) => {
      //   elm.addEventListener("click", () => {
      //     if(elm.textContent == result_Number) {
      //       time += 10;
      //     }
      //   })
      // })
    });
  });
}


function correctAnswers() {
  nextRound.style.pointerEvents = "none";

  btnAnswer.forEach((item) => {
    item.addEventListener("click", () => {
      nextRound.style.pointerEvents = "all";
      btnAnswer.forEach((elm) => {
        elm.style.pointerEvents = "none";
      });

      if (item.textContent == result_Number) {
        item.style.backgroundColor = "green";
        item.style.color = "#fff";
        result.textContent = "CORRECT✔️";
        box[counter - 1].classList.add("correct");
      } else {
        btnAnswer.forEach((elm) => {
          if (elm.textContent == result_Number) {
            elm.style.backgroundColor = "green";
            elm.style.color = "#fff";
          }
        });

        item.style.backgroundColor = "red";
        item.style.color = "#fff";
        result.textContent = "WRONG✖️";
        box[counter - 1].classList.add("wrong");
      }
    });
  });
}




nextRound.addEventListener("click", () => {
  counter++;

  if (counter == 10) {
    container.style.display = "none";
    modal.style.display = "block";

    box.forEach((item) => {
      if (item.classList.contains("correct")) {
        greenScore++;
      }
      if (item.classList.contains("wrong")) {
        redScore++;
      }
      if (item.classList.contains("timeEnd")) {
        blackScore++;
      }
    });
  }

  time = 10
  timerFunction();

  init();

  result.textContent = "Result-?";

  btnAnswer.forEach((item) => {
    item.style.backgroundColor = "#f7f7f7";
    item.style.color = "#000";
    item.style.pointerEvents = "all";
  });
});

resetBtn.addEventListener("click", () => {
  // modal.style.display = "none";
  // container.style.display = "block";
  // init()
  window.location.reload();
});

function init() {
  generateNumber();
  generateQuestions();
  correctAnswers();
}
init();
