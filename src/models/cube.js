export default class Cube {
  constructor({
    x, y, value, blank, board, player,
  }) {
    this.id = `${x}-${y}`;
    this.blank = blank;
    this.value = value || 0;
    this.x = x;
    this.y = y;
    this.player = player;
    this.neighbourIds = [];
    this._neighbours = [];
    this.el = document.createElement('div');
    this.board = board;
    this.setElement();
    this.setNeighbourIds();
  }

  get state() {
    return {
      x: this.x, y: this.y, value: this.value, blank: this.blank, player: this.player,
    };
  }

  setElement() {
    this.el.classList.add('cube');
    if (this.blank) { this.el.classList.add('blank'); }
    this.el.dataset.id = this.id;
    this.el.addEventListener('click', () => this.move());
    this.render();
  }

  move() {
    if (this.canClick()) {
      console.debug('move start');

      this.update(this).then(() => {
        console.debug('move end', this.updates);
        this.board.game.changePlayer();
      });
    }
  }

  update(origin) {
    return new Promise((resolve, reject) => {
      const wait = this === origin ? 0 : 500;
      this.el.classList.add("current");
      setTimeout(() => {
        this.player = this.board.game.currentPlayer;
        this.value++;
        console.debug('render', this.id);
        this.render();
        // console.debug('cube id', this.id, origin, origin == this);

        if (this.board.game.isEnd()) {
          resolve();
          return false;
        }

        let promises = [];
        if (this.isOverloaded) {
          console.debug('isOverloaded');
          promises = this.updateNeighbours(origin);
          console.debug(promises);
        }


        Promise.all(promises).then(() => {
          this.el.classList.remove("current");
          this.render();
          resolve();
        });
      }, wait);
    });
  }

  updateNeighbours(origin) {
    this.value = this.value - this.neighbours.length;
    return this.neighbours.map((cube) => cube.update(origin));
  }

  canClick() {
    if (this.value === 1 && this.neighbours.length === 0) { return false; }
    if (this.blank) { return false; }
    return this.player === this.board.game.currentPlayer || !this.player;
  }

  get isOverloaded() {
    return this.value > this.maximumValue;
  }

  render() {
    this.el.classList.remove('player-1', 'player-2');
    if (this.value > 0) { this.el.classList.add(`player-${this.player}`); }
    if (!this.blank) this.el.innerHTML = this.value.toString(10);
    // this.el.innerHTML = this.debug()
    return this;
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
    const { x, y, neighbourIds } = this;
    const maxBottom = this.board.cols + 1;
    const maxRight = this.board.rows + 1;

    // Top / same row before
    y > 0 && neighbourIds.push(`${x}-${y - 1}`);

    // Bottom / same row after
    y < maxBottom && neighbourIds.push(`${x}-${y + 1}`);

    // Left / same column before
    x > 0 && neighbourIds.push(`${x - 1}-${y}`);

    // Right / same column after
    x < maxRight && neighbourIds.push(`${x + 1}-${y}`);
  }
}
