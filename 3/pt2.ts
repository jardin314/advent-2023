import * as fs from 'node:fs/promises'
import 'dotenv/config'

type Coordinates = {
    x: number,
    y: number,
}
type NumberGridInfo = {
    coordinateList: Array<Coordinates>,
    value: string,
    id: number,
}


async function main() {

  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/3/input`, 'utf8')
  const inputArray: Array<string> = input.trim().split('\n')
  const numberIndicesArray: Array<NumberGridInfo> = []
  let total: number = 0
  const gearIndicesArray: Array<Coordinates> = []
  let numId: number = 0

  for (let i=0; i < inputArray.length; i++) {
    const line = inputArray[i] ?? ''
    const previousLine = inputArray[i-1] ?? ''
    const nextLine = inputArray[i+1] ?? ''
    const nums: string[]|null = line.match(/\d+/g)
    const gears: string[]|null = line.match(/\*/g)


    if (nums !== null) {
      let pointInLine: number = 0

      for (let n=0; n < nums.length; n++) {
        const num = nums[n]
        pointInLine += line.slice(pointInLine).indexOf(num)
        const numberInfo: NumberGridInfo = {coordinateList: [], value: num, id: numId++}

        for (let j=pointInLine; j < pointInLine + num.length; j++) {
          const coordinates: Coordinates = {x: j, y: i}
          numberInfo.coordinateList.push(coordinates)
        }
        pointInLine += num.length
        numberIndicesArray.push(numberInfo)
      }
    }

    if (gears !== null) {
      let pointInLine: number = 0

      for (const gear of gears) {
        pointInLine += line.slice(pointInLine).indexOf(gear) + 1
        const coordinatesOfGear: Coordinates = {x: pointInLine-1, y: i}
        gearIndicesArray.push(coordinatesOfGear)
      }
    }
  }
  for (let gearCoordinates of gearIndicesArray) {
    total += calculateGear(gearCoordinates, numberIndicesArray)
  }

  return total

  function calculateGear(gearIndex: Coordinates, numberIndicesArray: Array<NumberGridInfo>): number {
    const valuesToMultiply: any[] = []
    let indicesToCheck: Array<Coordinates> = [
      {x: gearIndex.x-1, y: gearIndex.y-1},
      {x: gearIndex.x, y: gearIndex.y-1},
      {x: gearIndex.x+1, y: gearIndex.y-1},
      {x: gearIndex.x-1, y: gearIndex.y},
      {x: gearIndex.x+1, y: gearIndex.y},
      {x: gearIndex.x-1, y: gearIndex.y+1},
      {x: gearIndex.x, y: gearIndex.y+1},
      {x: gearIndex.x+1, y: gearIndex.y+1},
    ]
    for (const index of indicesToCheck) {
      if (!!inputArray[index.x][index.y]) {
        const number: NumberGridInfo|undefined  = numberIndicesArray.find(
          (value) => {
            return value.coordinateList.some((coord) => coord.x === index.x && coord.y === index.y)
          })
        if (!!number) {
          let addToValuesToMultiply = true
          for (let value of valuesToMultiply) {
            if (value.id === number.id) {
              addToValuesToMultiply = false
            }
          }
          if (addToValuesToMultiply) {
            valuesToMultiply.push(number)
          }
        }
      }
    }
    if (valuesToMultiply.length === 2) {
      return Number(valuesToMultiply[0].value) * Number(valuesToMultiply[1].value)
    } else {
      return 0
    }
  }
}




main().then(console.log).catch(console.error)
