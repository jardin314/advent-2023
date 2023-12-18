import * as fs from 'node:fs/promises'
import 'dotenv/config'

type leftRightDirections = {left: string, right: string}
type MapDirections = Map<string|undefined, leftRightDirections>

async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/8/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
}




main().then(console.log).catch(console.error)
