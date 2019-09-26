import Game from "./models/game"

// numPlayers, rows, cols, includeBlank
const game = new Game(2, 4, 4, false)
console.log("players", game.players)
