/* eslint-disable require-jsdoc */
import Turtle from './turtle.js'

const canvas = document.getElementById('turtle-canvas')

const turtle = new Turtle(canvas)
function runTurtle (e) {
  e.preventDefault()
  const prog = e.target.prog.value
  turtle.parse(prog)
}

document.querySelector('#prog-form').onsubmit = runTurtle
document.querySelector('#clear-btn').onclick = turtle.clearCanvas
