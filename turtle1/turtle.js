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
    this.ctx = this.canvas.getContext('2d');
    this.pos = {'x': 0, 'y': 0};
    this.commands = new Map();
    this._penDown = false;
  }

  parse(input) {
    console.log(`parsing: ${input}`);
    // write parser here
    /* ----------------------------------
        LEXER
    ------------------------------------*/
    function lexInput(raw) {
      const lines = raw.split('\n');

      const comPairs = lines.map((line) => line.split(' '));

      return comPairs;
    }

    const userCommands = lexInput(input);

    /* --------------------------------------
        PARSER
    ---------------------------------------*/
    // strip comments
    // filter out invalid characters / sequences

    /* --------------------------------------
        TRANSPILER
    ---------------------------------------*/
    // iterate through parsed command array
    // switch/case or if chain the command and then call appropriate funcs with args
  }

  /* ------------------------------------
        COMMAND MAP
    -----------------------------------*/
  set draw(value) {
    this._penDown = value;
  }

  north(dist) {
    const newY = this.pos.y - dist;
    if (this._penDown) {
      this.drawLine(this.pos.x, this.pos.y, this.pos.x, newY);
    } else {
      this.ctx.moveTo(this.pos.x, newY);
    }
    this.pos.y = newY;
  }

  south(dist) {
    const newY = this.pos.y + dist;
    if (this._penDown) {
      this.drawLine(this.pos.x, this.pos.y, this.pos.x, newY);
    } else {
      this.ctx.moveTo(this.pos.x, newY);
    }
    this.pos.y = newY;
  }

  east(dist) {
    const newX = this.pos.x + dist;
    if (this._penDown) {
      this.drawLine(this.pos.x, this.pos.y, newX, this.pos.y);
    } else {
      this.ctx.moveTo(newX, this.pos.y);
    }
    this.pos.x = newX;
  }

  west(dist) {
    const newX = this.pos.x - dist;
    if (this._penDown) {
      this.drawLine(this.pos.x, this.pos.y, newX, this.pos.y);
    } else {
      this.ctx.moveTo(newX, this.pos.y);
    }
    this.pos.x = newX;
  }
  /* ------------------------------------
        JS CANVAS HELPERS
    ----------------------------------*/

  drawLine(startX, startY, endX, endY) {
    this.ctx.moveTo(startX, startY);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();
  }
};

