/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/**
 * Write a parser for a simple language
 *  for turtle graphics manipulation
 *
 * Using p5.js for the turtle graphics engine
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
    console.log(userCommands);

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
        COMMANDS
    -----------------------------------*/
  set draw(value) {
    this._penDown = value;
  }

  n(dist) {
    const newY = this.pos.y - dist;
    if (this._penDown) {
      this.drawLine(this.pos.x, this.pos.y, this.pos.x, newY);
    } else {
      this.ctx.moveTo(this.pos.x, newY);
    }
    this.pos.y = newY;
  }

  s(dist) {
    const newY = this.pos.y + dist;
    if (this._penDown) {
      this.drawLine(this.pos.x, this.pos.y, this.pos.x, newY);
    } else {
      this.ctx.moveTo(this.pos.x, newY);
    }
    this.pos.y = newY;
  }

  e(dist) {
    const newX = this.pos.x + dist;
    if (this._penDown) {
      this.drawLine(this.pos.x, this.pos.y, newX, this.pos.y);
    } else {
      this.ctx.moveTo(newX, this.pos.y);
    }
    this.pos.x = newX;
  }

  w(dist) {
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

