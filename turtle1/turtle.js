/* eslint-disable require-jsdoc */

/**
 * Domaine Specific Language parser
 * for a simple turtle graphics engine
 * Based on exercise in
 * The Pragmatic Programmer by
 * Dave Thomas and Andrew Hunt
 */

export default class Turtle {
  constructor (canvas) {
    this.canvas = canvas
    this.ctx = this.canvas.getContext('2d')
    this.pos = { x: 0, y: 0 }
    this.destPos = { x: 0, y: 0 }
    this._penDown = false

    this.commands = [
      { name: 'N', arg: true, handler: this.move, desc: 'Move North' },
      { name: 'E', arg: true, handler: this.move, desc: 'Move East' },
      { name: 'S', arg: true, handler: this.move, desc: 'Move South' },
      { name: 'W', arg: true, handler: this.move, desc: 'Move West' },
      { name: 'D', arg: false, handler: this.pen, desc: 'Pen Down' },
      { name: 'U', arg: false, handler: this.pen, desc: 'Pen Up' }
    ]

    this.clearCanvas = this.clearCanvas.bind(this)
    this.updatePos = this.updatePos.bind(this)
    this.move = this.move.bind(this)
    this.pen = this.pen.bind(this)
  }

  /* ------------------------------------
        METHODS
    ----------------------------------- */
  resizeCanvas (canvas, width, height) {
    console.log(`resize canvas called with width = ${width}`)
    canvas.width = width
    canvas.height = height
    document.querySelector('textarea').style.height = canvas.height * 0.8
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.pos = { x: 0, y: 0 }
    this.ctx.beginPath()
  };

  updatePos ({ x, y }) {
    this.pos.x = x
    this.pos.y = y
  };

  move (dir, dist) {
    const doMove = () => {
      if (this._penDown) {
        this.drawLine(this.pos, this.destPos)
      }
      this.updatePos(this.destPos)
    }

    switch (dir) {
      case 'N':
        this.destPos = { x: this.pos.x, y: this.pos.y - dist }
        doMove()
        break
      case 'E':
        this.destPos = { x: this.pos.x + dist, y: this.pos.y }
        doMove()
        break
      case 'S':
        this.destPos = { x: this.pos.x, y: this.pos.y + dist }
        doMove()
        break
      case 'W':
        this.destPos = { x: this.pos.x - dist, y: this.pos.y }
        doMove()
        break
      default:
        console.log('move called with invalid dir')
    }
  };

  pen (dir) {
    switch (dir) {
      case 'U':
        this._penDown = false
        break
      case 'D':
        this._penDown = true
        break
      default:
        console.log('pen called with invalid dir')
    }
  };

  run (input) {
    /* ----------------------------------
        LEXER
    ------------------------------------ */
    function lexInput (raw) {
      const lines = raw.split('\n')

      const comPairs = lines.map((line) => line.split(' '))

      return comPairs
    }

    const userCommands = lexInput(input)

    /* --------------------------------------
        PARSER
    --------------------------------------- */
    function sanitize (commands) {
      const ignoreChars = ['', '\n', ' ', '#']
      const clean =
        commands
          .filter((com) => !ignoreChars.includes(com[0]))
          .map((com, index) => {
            if (com.length > 1) {
              com[1] = Number(com[1])
              if (isNaN(com[1])) {
                alert(`invalid arg for command ${com[0]} at index ${index}`)
              }
            }
            return com
          })

      return clean
    }

    const cleanProg = sanitize(userCommands)
    /* --------------------------------------
        TRANSPILER
    --------------------------------------- */
    const transpile = (comArr) => {
      for (const com of comArr) {
        const comObj = this.commands.find((command) => command.name === com[0])

        if (comObj) {
          comObj.handler.call(this, ...com)
        } else {
          alert(`Invalid Command: ${com[0]} ${com[1]}`)
        }
      }
    }

    try {
      if (cleanProg.length > 0) {
        transpile(cleanProg)
      } else {
        alert('no valid commands found')
      }
    } catch (err) {
      console.log(err)
    }
  }

  /* ------------------------------------
        CANVAS HELPERS
    ---------------------------------- */

  drawLine (startPos, endPos) {
    this.ctx.moveTo(startPos.x, startPos.y)
    this.ctx.lineTo(endPos.x, endPos.y)
    this.ctx.stroke()
  }
}; // end class definition Turtle
