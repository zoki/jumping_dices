import Board from "./board"

export default class Game {
  constructor(numPlayers, rows, cols, includeBlank) {
    this.currentPlayer = 1
    this.players = [...Array(++numPlayers).keys()].slice(1)
    this.el = document.createElement("div")
    this.info = document.createElement("div")
    this.render()
    this.board = new Board(rows, cols, includeBlank, this)
  }

  changePlayer() {
    console.log("before player", this.currentPlayer)
    if (this.isEnd()) { this.info.innerHTML = `Player ${this.currentPlayer} wins` }

    this.board.el.classList.remove(`player-${this.currentPlayer}`)
    this.currentPlayer = this.nextPlayer()
    this.board.el.classList.add(`player-${this.currentPlayer}`)

    if (!this.isEnd()) { this.info.innerHTML = `Player ${this.currentPlayer} turn`}
    console.log("after player", this.currentPlayer)
    console.log("total", this.board.total())
  }

  nextPlayer() {
    return this.players[++this.currentPlayer - 1] || 1
  }

  isEnd() {
    const players = this.board.cubes.map( cube => cube.player )
    const uniquePlayers = [... new Set(players)]
    return uniquePlayers.length === 1 && uniquePlayers[0] > 0
  }

  render() {
    this.el.classList.add("game", `player-${this.currentPlayer}`)
    this.info.classList.add("info")
    this.info.innerHTML = `Player ${this.currentPlayer} turn`

    this.el.appendChild(this.info)
    document.body.appendChild(this.el)
  }
}