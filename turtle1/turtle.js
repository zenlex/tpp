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
    this._penDown = false;
  }

  /* ------------------------------------
        COMMANDS
    -----------------------------------*/
  set draw(value) {
    this._penDown = value;
  }

  n(dist) {
    console.log('running N');
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
    function sanitize(commands) {
      return commands;
    }

    const cleanProg = sanitize(userCommands);
    /* --------------------------------------
        TRANSPILER
    ---------------------------------------*/
    // iterate through parsed command array
    // switch/case or if chain the command and then call appropriate funcs with args
    function transpile(commands) {
      function callCom(com) {
        switch (com[0]) {
          case 'N':
            console.log('calling N from transpile');
            break;
          case 'D':
            console.log('calling pen down');
            break;
        }
      }
      for (const com of commands) {
        console.log(com);
        callCom(com);
      }
    }

    transpile(cleanProg);
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

