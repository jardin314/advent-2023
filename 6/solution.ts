import * as fs from 'node:fs/promises'
import 'dotenv/config'


async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/6/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  const time: string|undefined = inputArray[0].match(/\d+/g)?.join('')
  const distance: string|undefined = inputArray[1].match(/\d+/g)?.join('')

  if (time === undefined || distance === undefined) {
    throw Error('String parsing error')
  }

  const numberOfWaysToWin: number = getWins(Number(time), Number(distance))

  return numberOfWaysToWin
}

function getWins(time: number, distanceToBeat: number): number {
  let waysToWin: number = 0

  for (let hold = 1; hold < time; hold++) {
    const distanceTraveled = hold * (time - hold) 
    if (distanceTraveled > distanceToBeat) {
      waysToWin++
    }
  }

  return waysToWin
}


main().then(console.log).catch(console.error)
