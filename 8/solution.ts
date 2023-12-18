import * as fs from 'node:fs/promises'
import 'dotenv/config'

type leftRightDirections = {left: string, right: string}
type MapDirections = Map<string|undefined, leftRightDirections>

async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/8/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  const leftRightInstructions: string[]= inputArray[0].split('')
  const map: MapDirections= new Map()
  inputArray.slice(2).forEach(assignToMap)
  const startingLocation: any[] = inputArray.slice(2).filter((value) => value[2] === 'A') 
  let currentLocation: any[] = startingLocation.map((value) => value.slice(0, 3))
  let stepsToDestination: number[] = []
  let counter = 0

  while (currentLocation.length > 0) {
    for (let i=0; i < leftRightInstructions.length; i++) {
      if (leftRightInstructions[i] === 'L') {
        currentLocation = currentLocation.map((location) => map.get(location)?.left)
      } else if (leftRightInstructions[i] === 'R') {
        currentLocation = currentLocation.map((location) => map.get(location)?.right)
      } else {
        throw Error('Left-right parsing error')
      }
      counter++
      if (currentLocation.some((value) => value[2] === 'Z')) {
        const valuesToRemove: string[] = currentLocation.filter((value) => value[2] === 'Z')
        valuesToRemove.forEach(spliceFromLocations)
      }
    }
  }

  const lowestCommonMultiple: number = stepsToDestination.reverse().reduce((currentLowestCommon, currentValue) => {
    let newLowestCommon = currentLowestCommon
    while (newLowestCommon % currentValue !== 0) {
      newLowestCommon += currentLowestCommon
    }
    return newLowestCommon
  }, stepsToDestination[0])
  
  return lowestCommonMultiple

  function assignToMap(value: string) {
    const mapKey = value.slice(0, 3)
    const left = value.slice(7, 10)
    const right = value.slice(12, 15)
    map.set(mapKey, {left, right})
  }

  function spliceFromLocations(value: string) {
    const indexToSplice: number = currentLocation.indexOf(value)
    currentLocation.splice(indexToSplice, 1)
    stepsToDestination.push(counter)
  }
}




main().then(console.log).catch(console.error)
