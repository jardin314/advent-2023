import * as fs from 'node:fs/promises'
import 'dotenv/config'

async function main() {
  let total: number = 0
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/4/input`, 'utf8')
  const inputArray: Array<string> = input.trim().split('\n')
  for (let line of inputArray) {
    let score: number = 0
    line = line.slice(line.indexOf(':') + 1)
    const winningNumbers: string[]|null = line.split('|')[0].match(/\d+/g)
    const myNumbers: string[]|null = line.split('|')[1].match(/\d+/g)
    
    for (const number of myNumbers?? '') {
      if (winningNumbers?.indexOf(number) !== -1) {
        score = score === 0 ? 1 : score*2
      }
    }
    total += score
  }

  return total
}


main().then(console.log).catch(console.error)
