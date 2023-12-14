import * as fs from 'node:fs/promises'
import 'dotenv/config'

async function main() {
  let total: number = 0
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/4/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')

  for (let i=0; i < inputArray.length; i++) {
    let matches: number = 0
    const line: string = inputArray[i].slice(inputArray[i].indexOf(':') + 1)
    const winningNumbers: string[]|null = line.split('|')[0].match(/\d+/g)
    const myNumbers: string[]|null = line.split('|')[1].match(/\d+/g)
    
    for (const number of myNumbers?? '') {
      if (winningNumbers?.indexOf(number) !== -1) {
        matches++
      }
    }
    for (let j=0; j < matches; j++) {
      let locationToAdd = i + j + 1
      inputArray.splice(locationToAdd, 0, inputArray[locationToAdd+1])
    }
    break
  }

  return inputArray.length
}


main().then(console.log).catch(console.error)
