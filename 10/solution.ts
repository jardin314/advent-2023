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
  let counter: number = 1

  while (currentCoordinates[0].x !== currentCoordinates[1].x || currentCoordinates[0].y !== currentCoordinates[1].y) {
    currentCoordinates = getConnections(currentCoordinates)
    counter++
  }

  return counter



  function getConnections(coordinates: Array<Coordinates>): Array<Coordinates> {
    const returnArray: Array<Coordinates> = []
  
    for (let coordinate of coordinates) {
      const pipe: Pipe = inputArray[coordinate.y][coordinate.x] as Pipe
      console.log(pipe)
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
            case 'north': returnArray.push({x: coordinate.x, y: coordinate.y - 1, cameFrom: 'south'})
            break
            case 'south': returnArray.push({x: coordinate.x, y: coordinate.y + 1, cameFrom: 'north'})
            break
            case 'east': returnArray.push({x: coordinate.x + 1, y: coordinate.y, cameFrom: 'west'})
            break
            case 'west': returnArray.push({x: coordinate.x - 1, y: coordinate.y, cameFrom: 'east'})
            break
          }
      }
    }
    if (returnArray.length !== 2) {
      console.log(returnArray)
      throw Error('Connections not counted properly')
    }
    return returnArray
  }
}



main().then(console.log).catch(console.error)
