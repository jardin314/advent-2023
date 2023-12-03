import { reverse } from 'node:dns';
import * as fs from 'node:fs/promises';

async function main() {
  const input : fs.FileHandle = await fs.open('/home/slug/Documents/advent-of-code/1/input')

  const inputString: string = await input.readFile({encoding: 'utf8'}) 
  
  const inputArray = inputString.split('\n')

  let total: number = 0

  for (const str of inputArray) {
    if (str.length < 1) {
      continue
    }
    let num1: string
    let num2: string

    for (let i = 0; i < str.length; i ++) {
      const reversed: string = str.split('').reverse().join('')

      if (num1 === undefined && !isNaN(str[i])) {
        num1 = str[i]
      }

      if (num2 === undefined && !isNaN(reversed[i])) {
        num2 = reversed[i]
      }
    }
    total += Number(num1 + num2)
  }
  return total
}

main().then(console.log).catch(console.error)

