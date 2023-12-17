import * as fs from 'node:fs/promises'
import 'dotenv/config'


async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/6/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')


}


main().then(console.log).catch(console.error)
