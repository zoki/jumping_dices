import Cube from './cube';

export default class Board {
  constructor(rows, cols, includeBlank, game) {
    this.game = game;
    this.includeBlank = includeBlank;
    this.rows = rows;
    this.cols = cols;
    this.cubes = [];
    this.el = document.createElement('div');
  }

  findCube(value) {
    return this.cubes.find(({ id, blank }) => id === value && !blank);
  }

  procesing() {
    return this.cubes.some((cube) => cube.overload());
  }

  total() {
    return this.cubes.reduce((sum, cube) => sum + cube.value, 0);
  }

  maximumTotal() {
    return this.cubes.reduce((sum, cube) => sum + cube.maximumValue, 0);
  }

  generate() {
    for (let x = 1; x < this.rows + 1; x++) {
      for (let y = 1; y < this.cols + 1; y++) {
        const blank = this.includeBlank && Math.random() >= 0.90;
        const cube = new Cube({
          x, y, blank, board: this,
        });
        this.cubes.push(cube);
      }
    }
  }

  load(state) {
    this.cubes = state.map((cube) => new Cube({ ...cube, board: this }));
  }


  renderCubes() {
    const fragment = document.createDocumentFragment();
    this.cubes.forEach((cube) => fragment.appendChild(cube.render().el));
    this.el.innerHTML = '';
    this.el.appendChild(fragment);
  }

  render() {
    this.el.classList.add('board');
    this.el.setAttribute('style', `--cols:${this.cols}`);
    this.renderCubes();
  }
}
