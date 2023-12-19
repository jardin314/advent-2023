import * as fs from 'node:fs/promises'
import 'dotenv/config'


async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/9/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  let sumOfAllNextValues: number = 0
  for (let line of inputArray) {
    const sequence: number[] = line.split(' ').map((value) => Number(value))
    const previousInSequence = getNextValue(line, sequence)   
    sumOfAllNextValues += previousInSequence
  }
  return sumOfAllNextValues
}

function getNextValue(line: string, sequence: number[]) {
  const sequences: Array<number[]> = [sequence]
  if (sequences.at(-1) === undefined) {
    throw Error('Nothing in sequences')
  }
  let currentIndex: number = 0
  while (sequences.at(-1)?.some((value) => value !== 0)) {
    const currentSequence: number[] = sequences[currentIndex]
    const nextSequence: number[] = []
    for (let i = 1; i < currentSequence.length; i++) {
      nextSequence.push(currentSequence[i] - currentSequence[i-1])
    }
    sequences.push(nextSequence)
    currentIndex++
  }
  for (let i = sequences.length-2; i >=0; i--) {
    const valueToSubtract = sequences[i+1][0] ?? NaN
    const currentFirstInSequence = sequences[i][0] ?? NaN
    const newFirstInSequence = currentFirstInSequence - valueToSubtract
    if (isNaN(newFirstInSequence)) {
      throw Error('Number in sequence is not a number')
    }
    sequences[i].unshift(newFirstInSequence)
  }
  const newFirstInFirstSequence = sequences[0][0] ?? NaN

  return newFirstInFirstSequence
}


main().then(console.log).catch(console.error)
