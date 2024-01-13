/* eslint-disable require-jsdoc */

/**
 * Domaine Specific Language parser
 * for a simple turtle graphics engine
 * Based on exercise in
 * The Pragmatic Programmer by
 * Dave Thomas and Andrew Hunt
 */

/**
 * TODO:
 * Add loop checkbox
 * Improve UI styling for readability and better instructions
 * Clean up code / package and publish
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
      { name: 'U', arg: false, handler: this.pen, desc: 'Pen Up' },
      { name: 'T', arg: true, handler: this.pen, desc: 'Pen Color' },
      { name: 'K', arg: true, handler: this.pen, desc: 'Change Thickness' },
      { name: 'O', arg: true, handler: this.pen, desc: 'Change Opacity (0-1)' },
      { name: 'C', arg: true, handler: this.shape, desc: 'Draw Circle (r)' },
      { name: 'R', arg: true, handler: this.shape, desc: 'Draw Square (s)' },
      { name: 'F', arg: true, handler: this.shape, desc: 'Fill Color' }
    ]

    this.colors = [
      { name: 'Black', hex: '#000' },
      { name: 'Leonardo', hex: '#2683c9' },
      { name: 'Michelangelo', hex: '#fda800' },
      { name: 'Raphael', hex: '#ef4c4d' },
      { name: 'Donatello', hex: '#8b049f' },
      { name: 'Splinter', hex: '#b7875c' },
      { name: 'Shredder', hex: '#888' },
      { name: 'White', hex: '#FFF' },
      { name: 'Transparent', hex: 'rgba(0,0,0,0)' }
    ]

    this.color = this.colors[0]
    this.opacity = 1
    this.fill = this.colors[this.colors
      .indexOf((item) => item.name === 'Transparent')]
    this.lineWidth = 5

    this.clearCanvas = this.clearCanvas.bind(this)
    this.changeColor = this.changeColor.bind(this)
    this.updatePos = this.updatePos.bind(this)
    this.move = this.move.bind(this)
    this.pen = this.pen.bind(this)
    this.shape = this.shape.bind(this)
  }

  /* ------------------------------------
        METHODS
    ----------------------------------- */
  resizeCanvas (canvas, width, height) {
    console.log(`resize canvas called with width = ${width}`)
    canvas.width = width
    canvas.height = height
    document.querySelector('textarea')
      .style.height = (window.innerHeight * 0.5) + 'px'
  }

  clearCanvas () {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.pos = { x: 0, y: 0 }
    this.color = this.colors[0]
    this.ctx.strokeStyle = this.color.hex
    this.ctx.beginPath()
  };

  updatePos ({ x, y }) {
    this.pos.x = x < 0
      ? this.canvas.width + x
      : x > this.canvas.width
        ? x - this.canvas.width
        : x
    this.pos.y = y < 0
      ? this.canvas.height + y
      : y > this.canvas.height
        ? y - this.canvas.height
        : y
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

  changeColor (index) {
    if (index < 0 || index > this.colors.length - 1) {
      alert(`invalid color choice - ${index} of range`)
      return
    }
    this.color = this.colors[index]
    this.ctx.strokeStyle = this.color.hex
    this.ctx.beginPath()
  };

  changeOpacity (val) {
    if (val < 0 || val > 1) {
      alert(`opacity argument: ${val} out of range`)
      return
    }
    this.opacity = val
    this.ctx.globalAlpha = this.opacity
    this.ctx.beginPath()
  }

  pen (dir, arg) {
    switch (dir) {
      case 'U':
        this._penDown = false
        break
      case 'D':
        this._penDown = true
        break
      case 'T':
        this.changeColor(arg)
        break
      case 'O':
        this.changeOpacity(arg)
        break
      case 'K':
        this.lineWidth = arg
        this.ctx.lineWidth = this.lineWidth
        break
      default:
        console.log('pen called with invalid dir')
    }
  };

  shape (type, size) {
    switch (type) {
      case 'C':
        this.drawCircle(this.pos.x, this.pos.y, size)
        break
      case 'R':
        this.drawRect(this.pos.x - size / 2, this.pos.y - size / 2, size, size)
        break
      case 'F':
        this.fill = this.colors[size]
        this.ctx.fillStyle = this.fill.hex
        console.log('fillstyle changed to : ', this.fill.hex)
        break
      default:
        alert('invalid shape')
    }
  }

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
            com[0] = com[0].toUpperCase()
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
        const comObj =
        this.commands.find((command) => command.name === com[0])

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

  drawCircle (cx, cy, r) {
    this.ctx.beginPath()
    this.ctx.arc(cx, cy, r, 0 * Math.PI, 2 * Math.PI)
    this.ctx.stroke()
    this.ctx.fill()
  }

  drawRect (x, y, w, h) {
    this.ctx.beginPath()
    this.ctx.rect(x, y, w, h)
    this.ctx.stroke()
    this.ctx.fill()
  }
}; // end class definition Turtle
