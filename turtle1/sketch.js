/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
const hello = document.createElement('h1').textContent='Hello World';
document.querySelector('body').append(hello);
function setup() {
  createCanvas(400, 400);
}

function draw() {
  if (mouseIsPressed) {
    fill(0);
  } else {
    fill(255);
  }
  ellipse(mouseX, mouseY, 80, 80);
}


