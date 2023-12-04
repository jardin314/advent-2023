import * as fs from 'node:fs/promises'
import 'dotenv/config'

async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/3/input`, 'utf8')
  const inputArray: Array<string> = input.trim().split('\n')
  let total: number = 0

  for (let i=0; i < inputArray.length; i++) {
    const line = inputArray[i] ?? ''
    const previousLine = inputArray[i-1] ?? ''
    const nextLine = inputArray[i+1] ?? ''
    const nums: string[]|null = line.match(/\d+/g)

    if (nums === null) {
      continue
    }

    let pointInLine: number = 0

    for (let num of nums) {
      pointInLine += line.slice(pointInLine).indexOf(num)

      let addToTotal: boolean = false 

      for (let j=0; j < num.length; j++) {
        const nonSymbols: string[] = ['.', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']

       if (
           (pointInLine !== 0 && !nonSymbols.includes(line[pointInLine-1])) ||
           (pointInLine !== line.length-1 && !nonSymbols.includes(line[pointInLine+1])) ||
           (
            !!previousLine &&
            ((pointInLine !== 0 && !nonSymbols.includes(previousLine[pointInLine-1])) ||
            !nonSymbols.includes(previousLine[pointInLine]) ||
            (pointInLine !== line.length-1 && !nonSymbols.includes(previousLine[pointInLine+1])))
           )
             ||
           (
            !!nextLine &&
            ((pointInLine !== 0 && !nonSymbols.includes(nextLine[pointInLine-1])) ||
            !nonSymbols.includes(nextLine[pointInLine]) ||
            (pointInLine !== line.length-1 && !nonSymbols.includes(nextLine[pointInLine+1])))
           )
          ) {
            addToTotal = true
          }
        pointInLine++
      }
      if (addToTotal) {
        total+= Number(num)
      }
    }
  }
  return total
}


main().then(console.log).catch(console.error)
