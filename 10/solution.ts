import * as fs from 'node:fs/promises'
import 'dotenv/config'

type Pipe = '|'|'-'|'L'|'J'|'F'|'7'|'S'
type Connections = {north: boolean, south: boolean, east: boolean, west: boolean}
type Coordinates = {x: number, y: number}
type CoordinateInfo = {node: string, inLoop?: boolean, a?: boolean, b?: boolean}
type CoordinateGrid = Array<Array<CoordinateInfo>>
const pipeConnectionMap: Map<Pipe, Connections> = new Map()
pipeConnectionMap
.set('|', {north: true, south: true, east: false, west: false})
.set('-', {north: false, south: false, east: true, west: true})
.set('L', {north: true, south: false, east: true, west: false})
.set('J', {north: true, south: false, east: false, west: true})
.set('F', {north: false, south: true, east: true, west: false})
.set('7', {north: false, south: true, east: false, west: true})
.set('S', {north: true, south: true, east: false, west: false})

async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/10/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  const coordinateGrid: CoordinateGrid = []
  let startingCoordinates: Coordinates = {x: -1, y: -1}
  createCoordinateGrid()
  let currentCoordinates: Coordinates = {x: startingCoordinates.x, y: startingCoordinates.y - 1} 
  let previousCoordinates: Coordinates = {x: startingCoordinates.x, y: startingCoordinates.y}
  let sideA: Array<Coordinates> = []
  let sideB: Array<Coordinates> = []

  let counter = 0
  while (currentCoordinates.x !== startingCoordinates.x || currentCoordinates.y !== startingCoordinates.y) {
    const {x, y} = currentCoordinates
    const currentNode: string = coordinateGrid[y][x].node
    traceSides(currentNode, x, y)
    switch (currentNode) {
      case '|': {
        if (y - 1 === previousCoordinates.y) {
          currentCoordinates.y++
        } else {
          currentCoordinates.y--
        }
      }
      break
      case '-': {
        if (x - 1 === previousCoordinates.x) {
          currentCoordinates.x++
        } else {
            currentCoordinates.x--
          }
      }
      break
      case 'J': {
        if (x - 1 === previousCoordinates.x) {
          currentCoordinates.y--
        } else {
            currentCoordinates.x--
          }
      }
      break
      case 'F': {
        if (x + 1 === previousCoordinates.x) {
          currentCoordinates.y++
        } else {
            currentCoordinates.x++
          }
      }
      break
      case 'L': {
        if (x + 1 === previousCoordinates.x) {
          currentCoordinates.y--
        } else {
            currentCoordinates.x++
          }
      }
      break
      case '7': {
        if (x - 1 === previousCoordinates.x) {
          currentCoordinates.y++
        } else {
            currentCoordinates.x--
          }
      }
      break
      default: throw Error('Not on pipe')
    }
    counter++
    coordinateGrid[currentCoordinates.y][currentCoordinates.x].inLoop = true
    previousCoordinates.x = x
    previousCoordinates.y = y
  }
  console.log(`Side A: ${JSON.stringify(sideA)}\nSide B: ${JSON.stringify(sideB)}`)
  for (let i = 0; i < sideA.length; i++) {
    let sideAInLoop = !coordinateGrid[sideA[i].y][sideA[i].x]?.inLoop
    let sideBInLoop = !coordinateGrid[sideB[i].y][sideB[i].x]?.inLoop
    if (sideAInLoop && !!coordinateGrid[sideA[i].y][sideA[i].x]) {
      coordinateGrid[sideA[i].y][sideA[i].x].a = true
    }
    if (sideBInLoop && !!coordinateGrid[sideB[i].y][sideB[i].x]) {
      coordinateGrid[sideB[i].y][sideB[i].x].b = true
    }
    if ((sideBInLoop && !!coordinateGrid[sideB[i].y][sideB[i].x]) && sideAInLoop && !!coordinateGrid[sideA[i].y][sideA[i].x]) {
      throw Error('What the hell!')
    }
  }
  displayGrid()

  return counter

  function createCoordinateGrid() {
    for (let y = 0; y < inputArray.length; y++) {
      coordinateGrid.push([])
      for (let x = 0; x < inputArray[y].length; x++) {
        coordinateGrid[y].push({node: inputArray[y][x], inLoop: false})
        const node = coordinateGrid[y][x].node
        if (node === 'S') {
          coordinateGrid[y][x].inLoop = true
          startingCoordinates = {x, y}
        }
      }
    }
  }
  function displayGrid() {
    let str = ''
    for (let y = 0; y < coordinateGrid.length; y++) {
      for (let x = 0; x < coordinateGrid[y].length; x++) {
        if (coordinateGrid[y][x].inLoop) {
          str += '+'
        } else if (coordinateGrid[y][x].a) {
          str += 'A'
        } else if (coordinateGrid[y][x].b) {
          str += 'B'
        } else {
          str += coordinateGrid[y][x].node
        }
      }
      str += '\n'
    }
    console.log(str)
  }
  function traceSides(node: string, x: number, y: number) {
    const side1: Array<Coordinates> = []
    const side2: Array<Coordinates> = []
    switch (node) {
      case '|': {
        side1.push({x: x-1, y})
        side2.push({x: x+1, y})
      }
      case '-': {
        side1.push({x, y: y--})
        side2.push({x, y: y++})
      }
      case '7': {
        side1.push({x: x-1, y: y+1})
        side2.push({x, y: y-1}, {x: x+1, y: y-1}, {x: x+1, y})
      }
      case 'J': {
        side1.push({x: x-1, y: y-1})
        side2.push({x: x+1, y}, {x: x+1, y: y+1}, {x, y: y+1})
      }
      case 'F': {
        side1.push({x: x+1, y: y+1})
        side2.push({x: x-1, y}, {x: x-1, y: y-1}, {x, y: y-1})
      }
      case 'L': {
        side1.push({x: x+1, y: y-1})
        side2.push({x: x-1, y}, {x: x-1, y: y+1}, {x, y: y+1})
      }
    }
    const sideALastCoord = sideA.at(-1) ?? {x: startingCoordinates.x-1, y: startingCoordinates.y}
    const sideBLastCoord = sideB.at(-1) ?? {x: startingCoordinates.x+1, y: startingCoordinates.y}
    if (sideA.length === 0 && sideB.length === 0) {
      sideA.push(sideALastCoord)
      sideB.push(sideBLastCoord)
    }
    if (coordinatesAreTouching(side1, sideALastCoord)) {
      sideA = sideA.concat(side1)
      sideB = sideB.concat(side2)
    } else if (coordinatesAreTouching(side2, sideALastCoord)) {
      sideB = sideB.concat(side1)
      sideA = sideA.concat(side2)
    } else {
      throw Error('This should have been impossible!')
    }
  }
  function coordinatesAreTouching(coords1: Array<Coordinates>, coords2: Coordinates) {
    const {x, y} = coords2
    for (let coord of coords1) {
      if (coord.x-1 === x && coord.y+1 === y ||
          coord.x-1 === x && coord.y-1 === y ||
          coord.x-1 === x && coord.y === y ||
          coord.x === x && coord.y-1 === y ||
          coord.x === x && coord.y+1 === y ||
          coord.x+1 === x && coord.y === y ||
          coord.x+1 === x && coord.y-1 === y ||
            coord.x+1 === x && coord.y+1 === y
         ) {
           return true
         }
    }
    return false
  }
}



main().then(console.log).catch(console.error)
