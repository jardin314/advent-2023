import * as fs from 'node:fs/promises'
import 'dotenv/config'

type Pipe = '|'|'-'|'L'|'J'|'F'|'7'|'S'
type Connections = {north: boolean, south: boolean, east: boolean, west: boolean}
type Coordinates = {x: number, y: number, cameFrom?: 'north'|'south'|'east'|'west'}
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
  const startingY: number = inputArray.findIndex((row) => row.includes('S'))
  const startingX: number = inputArray[startingY].indexOf('S')
  const startingCoordinates: Coordinates = {x: startingX, y: startingY}
  let currentCoordinates: Array<Coordinates> = getConnections([startingCoordinates])
  const loop: Array<Coordinates> = []
  currentCoordinates.forEach((coordinate) => loop.push(coordinate))

  while (currentCoordinates[0].x !== currentCoordinates[1].x || currentCoordinates[0].y !== currentCoordinates[1].y) {
    currentCoordinates = getConnections(currentCoordinates)
    currentCoordinates.forEach((coordinate) => loop.push(coordinate))
  }

  return countTilesInLoop()



  function getConnections(coordinates: Array<Coordinates>): Array<Coordinates> {
    const returnArray: Array<Coordinates> = []
  
    for (let coordinate of coordinates) {
      returnArray.push(getNewCoordinates(coordinate))
    }
    if (returnArray.length !== 2) {
      console.log(returnArray)
      throw Error('Connections not counted properly')
    }
    return returnArray
  }

  function getNewCoordinates(coordinate: Coordinates): Coordinates {
   const pipe: Pipe = inputArray[coordinate.y][coordinate.x] as Pipe
    if (pipe === undefined) {
      throw Error(`No pipe found at ${coordinate.x}${coordinate.y}`)
    }
    const connections: Connections = pipeConnectionMap.get(pipe) ?? {'north': false, 'south': false, 'east': false, 'west': false}
    if (!connections) {
      throw Error('No connections found')
    }
    for (let direction in connections) {
      if (!connections[direction as keyof typeof connections] || direction === coordinate.cameFrom) {
        continue
      }
        switch (direction) {
          case 'north': return {x: coordinate.x, y: coordinate.y - 1, cameFrom: 'south'}
          break
          case 'south': return {x: coordinate.x, y: coordinate.y + 1, cameFrom: 'north'}
          break
          case 'east': return {x: coordinate.x + 1, y: coordinate.y, cameFrom: 'west'}
          break
          case 'west': return {x: coordinate.x - 1, y: coordinate.y, cameFrom: 'east'}
          break
        }
    } 
    throw Error('This should have been impossible')
  }

  /*
  function countTilesInLoop(): number {
    let counter: number = 0
    for (let y = 0; y < inputArray.length; y++) {
      for (let x = 0; x < line.length; x++) {
        if (checkInLoop({x, y}) {
          counter++
        }
      }
    }
    return counter
  }
  function checkInLoop(coordinates: Coordinates): boolean {
    let inLoop: boolean = false
    
  }
  */
}



main().then(console.log).catch(console.error)
