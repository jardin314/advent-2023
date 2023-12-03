import * as fs from 'node:fs/promises'

async function main() {
 const input: string = await fs.readFile('/home/slug/Documents/advent-of-code/2/input', {encoding: 'utf8'})
 const inputArray: Array<string> = input.trim().split('\n')
 let result: number = 0;

 for (const game of inputArray) {
    const sets: Array<string> = game.slice(game.indexOf(':') + 1)
    .trim()
    .split(';')
    
    result += minimumCube(sets)
  }
  return result
}

function minimumCube(sets: Array<string>): number {
  const minimumAmounts: any = {red: 0, green: 0, blue: 0}

  for (const set of sets) {
    let pulls: Array<string> = set.trim().split(', ')
    pulls.forEach((pull) => {
      const key: string = pull.split(' ')[1]
      if (minimumAmounts[key] < parseInt(pull)) {
        minimumAmounts[key] = parseInt(pull)
      }
    })
  }
  return minimumAmounts.red * minimumAmounts.green * minimumAmounts.blue
}

main().then(console.log)
