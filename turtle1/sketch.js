/* eslint-disable require-jsdoc */
const hello = document.createElement('h1').textContent='Hello World';
document.querySelector('body').append(hello);
function setup() {

}

function draw() {
  background(204);
  ellipse(50, 50, 80, 80);
}


