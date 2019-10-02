import Board from './board';

export default class Game {
  constructor({
    numPlayers, rows, cols, includeBlank,
  }) {
    this.currentPlayer = 1;
    this.players = [...Array(numPlayers + 1).keys()].slice(1);
    this.board = new Board(rows, cols, includeBlank, this);
    this.board.generate();
    this.setupElements();
    this.render();
  }

  setupElements() {
    this.el = document.createElement('div');
    this.info = document.createElement('div');
    this.el.appendChild(this.info);
    this.el.appendChild(this.board.el);
  }

  saveState() {
    const state = {
      currentPlayer: this.currentPlayer,
      cubes: this.board.cubes.map((cube) => cube.state),
    };
    console.log(state);
    localStorage.setItem('game-state', JSON.stringify(state));
  }

  loadState() {
    const state = JSON.parse(localStorage.getItem('game-state'));
    this.board.load(state.cubes);
    this.currentPlayer = state.currentPlayer;
    this.render();
    console.log(state);
  }

  changePlayer() {
    console.log('before player', this.currentPlayer);
    if (this.isEnd()) { this.info.innerHTML = `Player ${this.currentPlayer} wins`; }

    this.board.el.classList.remove(`player-${this.currentPlayer}`);
    this.currentPlayer = this.nextPlayer();
    this.board.el.classList.add(`player-${this.currentPlayer}`);

    if (!this.isEnd()) { this.info.innerHTML = `Player ${this.currentPlayer} turn`; }
    console.log('after player', this.currentPlayer);
    console.log('total', this.board.total());
  }

  nextPlayer() {
    return this.players[++this.currentPlayer - 1] || 1;
  }

  isEnd() {
    const players = this.board.cubes.map((cube) => cube.player);
    const uniquePlayers = [...new Set(players)];
    return uniquePlayers.length === 1 && uniquePlayers[0] > 0;
  }

  renderInfo() {
    this.info.classList.add('info');
    this.info.innerHTML = `Player ${this.currentPlayer} turn`;
  }

  render() {
    this.el.classList.add('game', `player-${this.currentPlayer}`);
    this.renderInfo();
    this.board.render();
  }

}
