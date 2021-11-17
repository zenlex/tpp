/* eslint-disable require-jsdoc */
import Turtle from './turtle.js';

const canvas = document.getElementById('turtle-canvas');

const turtle = new Turtle(canvas);
function runTurtle(e) {
  console.log('running turtle');
  e.preventDefault();
  turtle.parse();
  turtle.drawLine(0, 0, 200, 100);
}

document.querySelector('#prog-form').onsubmit = runTurtle;

