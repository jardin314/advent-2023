import * as fs from 'node:fs/promises';

const numberStrings = {'one': '1', 'two': '2', 'three': '3', 'four': '4', 'five': '5', 'six': '6', 'seven': '7', 'eight': '8', 'nine': '9'}

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
      const reverseIndex: number = str.length - i - 1
      const numberString: string|null = getNumberString(str, i) 
      const numberStringBackwards: string|null = getNumberString(str, reverseIndex)

      if (num1 === undefined && !isNaN(str[i])) {
        num1 = str[i]
      }
      if (num1 === undefined && numberString !== null) {
        num1 = numberString
      }
      if (num2 === undefined && !isNaN(str[reverseIndex])) {
        num2 = str[reverseIndex]
      }
      if (num2 === undefined && numberStringBackwards !== null) {
        num2 = numberStringBackwards
      }
    }
    total += Number(num1 + num2)
  }
  return total
}

main().then(console.log).catch(console.error)


function getNumberString(str: string, index: number): string|null {
  let returnValue = ''
  for (let i = index; i < str.length; i++) {
    returnValue += str[i]
    if (Object.keys(numberStrings).includes(returnValue)) {
      return numberStrings[returnValue]
    }
  }
  return null
}
