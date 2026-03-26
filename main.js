import "./style.css";
import { TextInterface } from "text-interface";

const app = document.querySelector("#app");
const ti = new TextInterface(app);
ti.setTitle("Guess my Point!");

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
      ti.output(`(${guess[0]}, ${guess[1]})\tCorrect!!!`);
      return true;
    }
  }
}

async function main() {
  let targetPoint = [Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)];
  let guessPoints = [];
  let gameOver = false;
  ti.prompt("Welcome to the Guessing Game! Try to guess the target point (x, y) on a 20x20 grid.");
  while (!gameOver) {
    let xy = await ti.promptIntegerInRange("X: ", 0, 20);
    let y = await ti.promptIntegerInRange("Y: ", 0, 20);
    guessPoints.push([x, y]);
    gameOver = displayGuessFeedback(guessPoints, targetPoint);
  }
  if (await ti.promptYesOrNo("Play again? (y/n)")) {
    await main();
  } else {
    ti.output("Thanks for playing!");
  }
}

await main();