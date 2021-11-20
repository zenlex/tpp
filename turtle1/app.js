/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
import Turtle from './turtle.js';

const canvas = document.getElementById('turtle-canvas');

const turtle = new Turtle(canvas);
function runTurtle(e) {
  e.preventDefault();
  const prog = e.target.prog.value;
  turtle.parse(prog);
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
