/* eslint-disable require-jsdoc */
import Turtle from './turtle.js';

const canvas = document.getElementById('turtle-canvas');

const turtle = new Turtle(canvas);
function runTurtle(e) {
  e.preventDefault();
  const prog = e.target.prog.value;
  turtle.parse(prog);
  testSquare(100);
}

document.querySelector('#prog-form').onsubmit = runTurtle;

/* -------------------------------
    HELPER FUNCTIONS
-------------------------------*/
function testSquare(dist) {
  turtle.draw = true;
  turtle.e(dist);
  turtle.s(dist);
  turtle.w(dist);
  turtle.n(dist);
}
