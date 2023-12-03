import * as fs from 'node:fs/promises'

async function main() {
 const input: string = await fs.readFile('/home/slug/Documents/advent-of-code/2/input', {encoding: 'utf8'})
 const inputArray: Array<string> = input.trim().split('\n')
 let result: number = 0;

 for (const game of inputArray) {
  const sets: Array<string> = game.slice(game.indexOf(':') + 1)
  .trim()
  .split(';')

  if (returnValid(sets)) {
    result += parseInt(game.slice(5))
    }
  }
  return result
}

function returnValid(sets: Array<string>): boolean {
  for (const set of sets) {
    const totals: any = {red: 0, green: 0, blue: 0}
    let pulls: Array<string> = set.trim().split(', ')
    pulls.forEach((pull) => totals[pull.split(' ')[1]] += parseInt(pull))

    if (totals.red > 12 || totals.green > 13 || totals.blue > 14) {
      return false
    } 
  }

  return true
}

main().then(console.log)
