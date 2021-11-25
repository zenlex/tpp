
/**
 * Write a DSL parser for a simple turtle graphics engine
 * 
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

  updatePos = ({x, y}) => {
    this.pos.x = x;
    this.pos.y = y;
  };

  move = (dir, dist) => {
    const doMove = () => {
      if (this._penDown) {
        this.drawLine(this.pos, this.destPos);
      }
      this.updatePos(this.destPos);
    };

    switch (dir) {
      case 'N':
        this.destPos = {x: this.pos.x, y: this.pos.y - dist};
        doMove();
        break;
      case 'E':
        this.destPos = {x: this.pos.x + dist, y: this.pos.y};
        doMove();
        break;
      case 'S':
        this.destPos = {x: this.pos.x, y: this.pos.y + dist};
        doMove();
        break;
      case 'W':
        this.destPos = {x: this.pos.x - dist, y: this.pos.y};
        doMove();
        break;
      default:
        console.log('move called with invalid dir');
    }
  };

  pen = (dir) => {
    switch (dir) {
      case 'U':
        this._penDown = false;
        break;
      case 'D':
        this._penDown = true;
        break;
      default:
        console.log('pen called with invalid dir');
    }
  };

  commands = [
    {name: 'N', arg: true, handler: this.move},
    {name: 'E', arg: true, handler: this.move},
    {name: 'S', arg: true, handler: this.move},
    {name: 'W', arg: true, handler: this.move},
    {name: 'D', arg: false, handler: this.pen},
    {name: 'U', arg: false, handler: this.pen},
  ];

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
      const ignoreChars = ['', '\n', '\s', '#'];
      const clean =
        commands.
            filter((com) => !ignoreChars.includes(com[0]))
            .map((com, index) => {
              if (com.length > 1) {
                com[1] = Number(com[1]);
                if (isNaN(com[1])) {
                  alert(`invalid arg for command ${com[0]} at index ${index}, expected Number`);
                }
              }
              return com;
            });

      return clean;
    }

    const cleanProg = sanitize(userCommands);
    /* --------------------------------------
        TRANSPILER
    ---------------------------------------*/
    // iterate through parsed command array
    // switch/case or if chain the command and then call appropriate funcs with args
    const transpile = (comArr) => {
      for (const com of comArr) {
        const comObj = this.commands.find((command) => command.name == com[0]);
        ;
        if (comObj) {
          comObj.handler(...com);
        } else {
          alert(`Invalid Command: ${com[0]} ${com[1]}`);
        }
      }
    };

    try{
      if(cleanProg.length > 0){
      transpile(cleanProg);
    }else{
      alert('no valid commands found');
    }
    }catch(err){
      console.log(err);
    }
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


