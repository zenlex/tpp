/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/**
 * Write a parser for a simple language
 *  for turtle graphics manipulation
 *
 * Using p5.js for the turtle graphics engine
 */

/* -----------------------
    TODO
-----------------------*/
/* whiteboard UI -
    - user writes program in an html text area
    - each instruction on newline
    - space between command and argument
    - # marks for comments.
    - in html file, import parser script (which exports parse func)
    - on submit for text area, submit text to parser
    - parser reads text and returns code for new p5 program
    - script in sketch contains function that takes a p5 setup and draw function as args, clears any existing p5 sketch and instantiates a new one with the passed functions

    - need to write the parser as a p5 draw function that is called once for each line in the user input program
    */


export default class Turtle {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
  }

  parse() {
    const testNode = document.createElement('h1').textContent = 'Hello World';
    document.querySelector('body').append(testNode);
  }

  drawLine(startX, startY, endX, endY) {
    this.context.moveTo(startX, startY);
    this.context.lineTo(endX, endY);
    this.context.stroke();
  }
};

