import * as fs from 'node:fs/promises'
import 'dotenv/config'

async function main() {
  console.log(process.env.PATH_TO_ROOT)
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/3/input`, 'utf8')
  const inputArray: Array<string> = input.trim().split('\n')
  let total: number = 0

  for (let i=0; i < inputArray.length; i++) {
    const line = inputArray[i] ?? ''
    const previousLine = inputArray[i-1] ?? ''
    const nextLine = inputArray[i+1] ?? ''
    const nums: string[]|null = line.match(/\d+/)
    // const numIndexMap = new Map()

    if (nums === null) {
      continue
    }

    let pointInLine: number = 0

    for (let num of nums) {
      const numIndexInLine: number = pointInLine + line.slice(pointInLine).indexOf(num)
      // numIndexMap.set(numIndexInLine, num)
      pointInLine += numIndexInLine + num.length
      let addToTotal: boolean = false 
      for (let i=0; i < num.length; i++) {
        const nonSymbols: string[] = ['.', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
       if (nonSymbols.includes(line[numIndexInLine+i-1]) ||
           nonSymbols.includes(line[numIndexInLine+i+1]) ||
           nonSymbols.includes(previousLine[numIndexInLine+i-1]) ||
           nonSymbols.includes(previousLine[numIndexInLine+i]) ||
           nonSymbols.includes(previousLine[numIndexInLine+i+1]) ||
           nonSymbols.includes(nextLine[numIndexInLine+i-1]) ||
           nonSymbols.includes(nextLine[numIndexInLine+i]) ||
           nonSymbols.includes(nextLine[numIndexInLine+i+1])
          ) {
            addToTotal = true
            break
          }
      }
      if (addToTotal) {
        total+= Number(num)
      }
    }
  }
  return total
}


main().then(console.log).catch(console.error)
