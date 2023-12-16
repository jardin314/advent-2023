import * as fs from 'node:fs/promises'
import 'dotenv/config'

async function main() {
  let total: number = 0
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/4/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  const matchArray: number[] = []
  const copies: number[] = []
  inputArray.forEach((value) => copies.push(1))

  for (let i: number =0; i < inputArray.length; i++) {
    let matches: number = 0
    const line: string = inputArray[i].slice(inputArray[i].indexOf(':') + 1)
    const winningNumbers: string[]|null = line.split('|')[0].match(/\d+/g)
    const myNumbers: string[]|null = line.split('|')[1].match(/\d+/g)
    
    for (const number of myNumbers?? '') {
      if (winningNumbers?.indexOf(number) !== -1) {
        matches++
      }
    }
    matchArray.push(matches)
  }
  console.log(JSON.stringify(copies))

  for (let i=0; i < matchArray.length; i++) {
    const numberToCopy = matchArray[i]
    for (let j=1; j <= numberToCopy; j++) {
      if (copies[i+j] !== undefined) {
        copies[i+j] += copies[i]
      }
    }
  }

  console.log(JSON.stringify(copies))

  const sum: number = copies.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    },0)


  return sum
}



main().then(console.log).catch(console.error)
