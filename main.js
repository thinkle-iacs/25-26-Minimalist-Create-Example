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
  ti.output(`Guess\tDistance\n-----\t--------`);
  for (let guess of guesses) {
    let dist = distance(guess, target);
    ti.output(`(${guess[0]}, ${guess[1]})\t${dist.toFixed(2)} `);
    if (dist === 0) {
      ti.output(`You win!!!`);
      return true;
    }
  }
}

async function main(size) {
  let targetPoint = [Math.floor(Math.random() * size), Math.floor(Math.random() * size)];
  let guessPoints = [];
  let gameOver = false;
  ti.prompt(`Try to guess the target point (x, y) on a ${size}x${size} grid.`);
  while (!gameOver) {
    let x = await ti.promptIntegerInRange("X: ", 0, size);
    let y = await ti.promptIntegerInRange("Y: ", 0, size);
    guessPoints.push([x, y]);
    gameOver = displayGuessFeedback(guessPoints, targetPoint);
  }
  if (await ti.promptYesOrNo("Play again? (y/n)")) {
    let newSize = await ti.promptInteger("Enter new grid size: ");
    await main(newSize);
  } else {
    ti.output("Thanks for playing!");
  }
}

await main(
  10
);


/*
In order check whether each point in guessPoints is valid, 
I would first set a variable isValid to true, with the assumption
that all points are valid.

Then I would need to loop through each point in guessPoints and check if it is valid by calling the function isValid(value). 


If any point is found to be invalid, I would know I had an invalid
list.

*/

/*
The parameter to my function is `size`. In my first call, I call
main(10) which creates a grid of size 10. By using the parameter,
I am able to make it easy to change the size of the grid. That wAY,
the same code works for a grid with size 20 or 40, and I could easily
change the game to have the grid grow each time you play, or, as I actually do, ask the user for a new grid size each time they play again.


*/