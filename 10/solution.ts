import * as fs from 'node:fs/promises'
import 'dotenv/config'

type Pipe = '|'|'-'|'L'|'J'|'F'|'7'|'S'
type Connections = {north: boolean, south: boolean, east: boolean, west: boolean}
type Coordinates = {x: number, y: number}
type CoordinateInfo = {node: string, inLoop?: boolean}
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
  const sideA: Array<Coordinates> = []
  const sideB: Array<Coordinates> = []

  displayGrid()
  while (currentCoordinates.x !== startingCoordinates.x || currentCoordinates.y !== startingCoordinates.y) {
    const {x, y} = currentCoordinates
    const currentNode: string = coordinateGrid[y][x].node
    switch (currentNode) {
      case '|': {
        if (y - 1 === previousCoordinates.y) {
          currentCoordinates.y++
        } else {
          currentCoordinates.y--
        }
      }
      case '-': {
        if (x - 1 === previousCoordinates.x) {
          currentCoordinates.x++
        } else {
            currentCoordinates.x--
          }
      }
      case 'J': {
        if (x - 1 === previousCoordinates.x) {
          currentCoordinates.y--
        } else {
            currentCoordinates.x--
          }
      }
      case 'F': {
        if (x + 1 === previousCoordinates.x) {
          currentCoordinates.y++
        } else {
            currentCoordinates.x++
          }
      }
      case 'L': {
        if (x + 1 === previousCoordinates.x) {
          currentCoordinates.y--
        } else {
            currentCoordinates.x++
          }
      }
      case '7': {
        if (x - 1 === previousCoordinates.x) {
          currentCoordinates.y++
        } else {
            currentCoordinates.x--
          }
      }
    }
    coordinateGrid[currentCoordinates.y][currentCoordinates.x].inLoop = true
  }
  displayGrid()

  return 0

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
        } else {
          str += coordinateGrid[y][x].node
        }
      }
      str += '\n'
    }
    console.log(str)
  }
}



main().then(console.log).catch(console.error)
