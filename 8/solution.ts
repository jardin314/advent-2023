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

  function assignToMap(value: string) {
    const mapKey = value.slice(0, 3)
    const left = value.slice(7, 10)
    const right = value.slice(12, 15)
    map.set(mapKey, {left, right})
  }
  let currentLocation: string|undefined = 'AAA'
  let counter = 0
  while (currentLocation !== 'ZZZ') {
    for (let i=0; i < leftRightInstructions.length; i++) {
      if (leftRightInstructions[i] === 'L') {
        currentLocation = map.get(currentLocation)?.left
      } else if (leftRightInstructions[i] === 'R') {
        currentLocation = map.get(currentLocation)?.right
      } else {
        throw Error('Left-right parsing error')
      }
      counter++
      if (currentLocation === 'ZZZ') {
       return counter
      }
    }
  }
  
  return undefined
}




main().then(console.log).catch(console.error)
