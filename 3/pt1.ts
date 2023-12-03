import * as fs from 'node:fs/promises'

async function main() {
  const input: string = await fs.readFile('input', 'utf8')
  const inputArray: Array<string> = input.trim().split('\n')

  for (let i=0; i < inputArray.length; i++) {
    const line = inputArray[i]
    const nums: string[]|null = line.match(/\d+/)
    const numIndexMap = new Map()
    let pointInLine: number = 0

    for (let num of nums) {
      const numIndexInLine: number = pointInLine + line.slice(pointInLine).indexOf(num)
      numIndexMap.set(numIndexInLine, num)
      pointInLine += numIndexInLine + num.length
    }
  }
}
