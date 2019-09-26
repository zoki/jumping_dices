import Cube from "./cube"

export default class Board {
  constructor(rows, cols, includeBlank, game) {
    this.game = game
    this.includeBlank = includeBlank
    this.rows = rows
    this.cols = cols
    this.cubes = []
    this.el = document.createElement("div")
    this.render()
    console.log('maximumTotal', this.maximumTotal());
  }

  findCube(value) {
    return this.cubes.find( ({ id, blank }) => id === value && !blank )
  }

  procesing() {
    return this.cubes.some( cube => cube.overload() )
  }

  total() {
    return this.cubes.reduce( (sum, cube) => sum + cube.value, 0 )
  }

  maximumTotal(){
    return this.cubes.reduce( (sum, cube) => sum + cube.maximumValue, 0 )
  }

  render() {
    this.el.classList.add("board")
    this.el.setAttribute("style", `--cols:${this.cols}`);

    for ( let x = 1; x < this.rows + 1; x++ ) {
      for ( let y = 1; y < this.cols + 1; y++ ) {
        const id = parseInt(`${x}${y}`, 10)
        const blank = this.includeBlank && Math.random() >= 0.90
        const cube = new Cube(id, x, y, blank, this)
        this.cubes.push(cube)
        this.el.appendChild(cube.el)
      }
    }
    this.game.el.appendChild(this.el)
  }
}


