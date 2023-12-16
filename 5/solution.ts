import * as fs from 'node:fs/promises'
import 'dotenv/config'

async function main() {
  let total: number = 0
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/5/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
}



main().then(console.log).catch(console.error)
