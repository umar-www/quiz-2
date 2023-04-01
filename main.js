"use strict";

const num1 = document.getElementById("num1");
const num2 = document.getElementById("num2");
const amal = document.getElementById("amal");
const result = document.getElementById("result");
const answer = document.querySelectorAll('.answer')
const chance = document.getElementById("chance");
// const answer1 = document.getElementById("answer1");
// const answer2 = document.getElementById("answer2");
// const answer3 = document.getElementById("answer3");
// const answer4 = document.getElementById("answer4");
let questions = [];

function generateNumber() {
  let number1 = Math.floor(Math.random() * 50) + 1;
  let number2 = Math.floor(Math.random() * 50) + 1;
  let operation = ["*", "+", "-"].sort(() => Math.random() - 0.5)[0];

  num1.textContent = number1;
  num2.textContent = number2;
  amal.textContent = operation;
}
generateNumber();

function sum() {
  let result = eval(`${num1.textContent} ${amal.textContent} ${num2.textContent}`);
  return result;
}
console.log(sum());


function generateAnswers(){
  
}



