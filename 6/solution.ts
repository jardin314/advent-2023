import * as fs from 'node:fs/promises'
import 'dotenv/config'


async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/6/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  const times: RegExpMatchArray|null = inputArray[0].match(/\d+/g)
  const distances: RegExpMatchArray|null = inputArray[1].match(/\d+/g)

  if (times === null || distances === null) {
    throw Error('No matches')
  }
  if (times.length !== distances.length) {
    throw Error('Times and distances don\'t match')
  }

  const waysToWinPerRace: number[] = []
  for (let i = 0; i < times.length; i++) {
    const numberOfWaysToWin: number = getWins(Number(times[i]), Number(distances[i]))
    waysToWinPerRace.push(numberOfWaysToWin)
  }

  return waysToWinPerRace.reduce((accumulator, currentValue) => {return accumulator * currentValue}, 1)
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
