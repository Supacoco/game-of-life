const RESOLUTION = 10
const WIDTH = 800
const HEIGHT = 800

const ROWS = HEIGHT / RESOLUTION
const COLS = WIDTH / RESOLUTION

const setup = () => {
  const canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.width = WIDTH
  canvas.height = HEIGHT

  document.getElementById('root').appendChild(canvas)
  const grid = generate2DGrid(COLS, ROWS)
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      grid[i][j] = Math.round(Math.random(2));
    }
  }
  return grid
}

const generate2DGrid = (cols, rows) => {
  let grid = new Array(cols)
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows)
  }
  return grid
}

const draw = (grid) => {
  const context = document.getElementById('canvas').getContext('2d')
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      if (grid[i][j]){
        context.fillStyle = 'white';
      } else {
        context.fillStyle = 'black';
      }
      context.fillRect(i * RESOLUTION, j * RESOLUTION, RESOLUTION, RESOLUTION)
    }
  }
}

const generateNewState = (grid) => {
  const newGrid = generate2DGrid(COLS, ROWS)
  for (let i = 0; i < COLS; i++) {
    for (let j = 0; j < ROWS; j++) {
      const neighboors = countNeighbors(grid, i, j)
      const currentCell = grid[i][j]
      if (currentCell === 0 && neighboors === 3) {
        newGrid[i][j] = 1
      } else if (currentCell === 1 && (neighboors < 2 || neighboors > 3)) {
        newGrid[i][j] = 0
      } else {
        newGrid[i][j] = currentCell
      }
    }
  }
  return newGrid
}

const countNeighbors = (grid, x, y) => {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + COLS) % COLS
      let row = (y + j + ROWS) % ROWS
      sum += grid[col][row]
    }
  }
  sum -= grid[x][y]
  return sum
}

let state = setup()
draw(state)

setInterval(() => {
  state = generateNewState(state)
  draw(state)
}, 16)