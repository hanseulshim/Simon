$(document).ready(function () {
  simon.init()
})

var simon = {
  round: 0,
  gameover: false,
  sequence: [],
  move: [],
  result: false,
  strict: false,

  init: function () {
    var that = this
    $('#start').on('click', () => that.startGame())

    // Enables/Disables strict mode
    $('#strict').on('click', () => {
      that.strict = !that.strict
      $('#strict').toggleClass('inactive')
    })
  },

  startGame: function () {
    this.round = 1
    this.move = []
    this.gameover = false
    this.sequence = []
    this.newRound()
  },

  // New round where a new move is added to the sequence
  newRound: function () {
    $('.roundNum').text(this.round++)
    this.disableBoard()
    this.sequence.push(this.randomMove())
    this.move = this.sequence.slice()
    this.animate(this.sequence)
  },

  animate: function (sequence) {
    var i = 0
    var interval = setInterval(() => {
      this.lightUp(sequence[i])
      i++
      if (i >= sequence.length) {
        clearInterval(interval)
        this.humanMove()
      }
    }, 750)
  },

  lightUp: function (tile) {
    $('[data-id="' + tile + '"]').addClass('selected')
    window.setTimeout(() => {
      $('[data-id="' + tile + '"]').removeClass('selected')
    }, 500)
  },

  humanMove: function () {
    var that = this
    $('.board').on('click', function () {
      var expected = that.move.shift()
      var actual = $(this).data('id')
      that.result = expected === actual
      that.checkWin()
    })
  },

  // Checks for winning move
  // 1) If sequence is not done yet then it does nothing
  // 2) If strict mode is enabled and wrong move then game over
  // 3) If strict mode is disabled and wrong move then repeat sequence
  // 4) If you make it through 20 rounds then you win
  checkWin: function () {
    if (this.move.length === 0 && this.result) {
      this.newRound()
    } else if (this.strict && !this.result) {
      this.gameOver()
    } else if (!this.result) {
      alert('Wrong move, try again')
      this.disableBoard()
      this.move = this.sequence.slice()
      this.animate(this.sequence)
    } else if (!this.sequence.length === 20 && this.result) {
      this.win()
    }
  },

  win: function () {
    alert('you win!')
    this.startGame()
  },

  gameOver: function () {
    alert('GG. Try again')
    this.startGame()
  },

  disableBoard: function () {
    $('.disable-click').off('click')
  },

  randomMove: function () {
    return Math.round(Math.random() * 3) + 1
  }
}
