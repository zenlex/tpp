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
    this.destPos = {'x': 0, 'y': 0};
    this._penDown = false;
  }

  /* ------------------------------------
        COMMANDS
    -----------------------------------*/
  set draw(value) {
    this._penDown = value;
  }

  updatePos({x, y}) {
    this.pos.x = x;
    this.pos.y = y;
  }

  n(dist) {
    this.destPos = {x: this.pos.x, y: this.pos.y - dist};
    if (this._penDown) {
      this.drawLine(this.pos, this.destPos);
    }
    this.updatePos(this.destPos);
  }

  s(dist) {
    this.destPos = {x: this.pos.x, y: this.pos.y + dist};
    if (this._penDown) {
      this.drawLine(this.pos, this.destPos);
    }
    this.updatePos(this.destPos);
  }

  e(dist) {
    this.destPos = {x: this.pos.x + dist, y: this.pos.y};
    if (this._penDown) {
      this.drawLine(this.pos, this.destPos);
    }
    this.updatePos(this.destPos);
  }

  w(dist) {
    this.destPos = {x: this.pos.x - dist, y: this.pos.y};
    if (this._penDown) {
      this.drawLine(this.pos, this.destPos);
    }
    this.updatePos(this.destPos);
  }

  parse(input) {
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
    function sanitize(commands) {
      // make sure second value is number
      for (const com of commands) {
        if (com.length > 1) {
          com[1] = Number(com[1]);
        }
      }
      return commands;
    }

    const cleanProg = sanitize(userCommands);
    /* --------------------------------------
        TRANSPILER
    ---------------------------------------*/
    // iterate through parsed command array
    // switch/case or if chain the command and then call appropriate funcs with args
    const transpile = (commands) => {
      const callCom = (com) => {
        switch (com[0]) {
          case 'N':
            this.n(com[1]);
            break;
          case 'E':
            this.e(com[1]);
            break;
          case 'S':
            this.s(com[1]);
            break;
          case 'W':
            this.w(com[1]);
            break;
          case 'D':
            this._penDown = true;
            break;
          case 'U':
            this._penDown = false;
          default:
            console.log('no valid commands parsed');
        }
      };
      for (const com of commands) {
        callCom(com);
      }
    };

    transpile(cleanProg);
  }


  /* ------------------------------------
        JS CANVAS HELPERS
    ----------------------------------*/

  drawLine(startPos, endPos) {
    this.ctx.moveTo(startPos.x, startPos.y);
    this.ctx.lineTo(endPos.x, endPos.y);
    this.ctx.stroke();
  }
}; // end class definition Turtle


