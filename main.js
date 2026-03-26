import "./style.css";
import { TextInterface } from "text-interface";

const app = document.querySelector("#app");
const ti = new TextInterface(app);

function distance(p1, p2) {
  let xsquared = (p1[0] - p2[0]) ** 2;
  let ysquared = (p1[1] - p2[1]) ** 2;
  return Math.sqrt(xsquared + ysquared);
}

function displayGuessFeedback(guesses, target) {
  ti.output(`Guess\tDistance from Target`);
  for (let guess of guesses) {
    let dist = distance(guess, target);
    ti.output(`(${guess[0]}, ${guess[1]})\t${dist.toFixed(2)} `);
    if (dist === 0) {
      ti.output(`(${guess[0]}, ${guess[1]})\tCorrect!`);
      ti.output('YOU WIN!!!!!!!!')
      return true;
    }
  }
}

function main() {
  let targetPoint = [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
  let guessPoints = [];
  let gameOver = false;
  ti.prompt("Welcome to the Guessing Game! Try to guess the target point (x, y) on a 100x100 grid.");
  while (!gameOver) {
    let x = ti.promptIntegerInRange("X: ", 0, 100);
    let y = ti.promptIntegerInRange("Y: ", 0, 100);
    guessPoints.push([x, y]);
    gameOver = displayGuessFeedback(guessPoints, targetPoint);
  }
  if (ti.promptYesOrNo("Play again? (y/n)")) {
    main();
  } else {
    ti.output("Thanks for playing!");
  }
}

main();