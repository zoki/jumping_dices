export default class Cube {
  constructor(id, x, y, blank, board) {
    this.blank = blank;
    this.value = 0;
    this.x = x;
    this.y = y;
    this.player = undefined;
    this.id = id;
    this.neighbourIds = [];
    this._neighbours = [];
    this.el = document.createElement('div');
    this.board = board;
    this.setElement();
    this.setNeighbourIds();
  }

  setElement() {
    this.el.classList.add('cube');
    if (this.blank) { this.el.classList.add('blank'); }
    this.el.dataset.id = this.id;
    this.el.addEventListener('click', (e) => this.move());
    this.render();
  }

  move() {
    if (this.canClick()) {
      console.log('move start');
      this.update();
      console.log('move end');
      this.board.game.changePlayer();
    }
  }

  update() {
    console.log('cube id', this.id);
    this.player = this.board.game.currentPlayer;
    this.value++;
    this.render();

    if (this.board.game.isEnd()) { return; }

    if (this.overload()) { this.updateNeighbours(); }
    this.render();
  }

  updateNeighbours() {
    this.value = this.value - this.neighbours.length;
    this.neighbours.forEach((cube) => cube.update());
  }

  canClick() {
    if (this.value === 1 && this.neighbours.length === 0) { return false; }
    if (this.blank) { return false; }
    return this.player === this.board.game.currentPlayer || !this.player;
  }

  overload() {
    return this.value > this.maximumValue;
  }

  render() {
    this.el.classList.remove('player-1', 'player-2');
    if (this.value > 0) { this.el.classList.add(`player-${this.player}`); }
    if (!this.blank) this.el.innerHTML = this.value.toString(10);
    // this.el.innerHTML = this.debug()
  }

  debug() {
    this.el.classList.add('debug');
    return `value: ${this.value}<br>x-y: ${this.x}-${this.y}<br>n: ${this.neighbourIds.join()}`;
  }

  get maximumValue() {
    return this.neighbours.length;
  }

  get neighbours() {
    if (this._neighbours.length > 0) { return this._neighbours; }

    this.neighbourIds.forEach((id) => {
      const neighbour = this.board.findCube(id);
      if (neighbour) { this._neighbours.push(neighbour); }
    });

    return this._neighbours;
  }

  setNeighbourIds() {
    let x; let y; let
      id;

    // same row before
    x = this.x;
    y = this.y - 1;
    id = parseInt(`${x}${y}`, 10);
    if (y > 0) { this.neighbourIds.push(id); }

    // same row after
    x = this.x;
    y = this.y + 1;
    id = parseInt(`${x}${y}`, 10);
    if (y < this.board.cols + 1) { this.neighbourIds.push(id); }

    // same column before
    x = this.x - 1;
    y = this.y;
    id = parseInt(`${x}${y}`, 10);
    if (x > 0) { this.neighbourIds.push(id); }

    // same column after
    x = this.x + 1;
    y = this.y;
    id = parseInt(`${x}${y}`, 10);
    if (x < this.board.rows + 1) { this.neighbourIds.push(id); }
  }
}
