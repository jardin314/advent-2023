import * as fs from 'node:fs/promises'
import 'dotenv/config'
type MapRules = {
  bottom: number,
  top: number,
  shift: number
}
type Seed = {
  initialValue: number,
  range: number
}

async function main() {
  let total: number = 0
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/5/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  const seedString = inputArray[0]
  const seeds: Array<Seed> = getSeedFromInputString(seedString)
  const locations: number[] = []
  const seedToSoil: Array<MapRules>  = []
  const soilToFertilizer: Array<MapRules> = []
  const fertilizerToWater: Array<MapRules> = []
  const waterToLight: Array<MapRules> = []
  const lightToTemperature: Array<MapRules> = []
  const temperatureToHumidity: Array<MapRules> = []
  const humidityToLocation: Array<MapRules> = []

  let currentRules: Array<MapRules> = []

  for (let i=2; i < inputArray.length; i++) {
    switch (inputArray[i]) {
      case 'seed-to-soil map:': currentRules = seedToSoil
      break
      case 'soil-to-fertilizer map:': currentRules = soilToFertilizer
      break
      case 'fertilizer-to-water map:': currentRules = fertilizerToWater
      break
      case 'water-to-light map:': currentRules = waterToLight
      break
      case 'light-to-temperature map:': currentRules = lightToTemperature
      break
      case 'temperature-to-humidity map:': currentRules = temperatureToHumidity
      break
      case 'humidity-to-location map:': currentRules = humidityToLocation
      break
      default: setRules(inputArray[i], currentRules)
      break
    }
  }

  let smallestLocation = -1

  for (let seed of seeds) {
    for (let i = 0; i < seed.range; i++) {
      const soil = mapKey(seed.initialValue + i, seedToSoil)
      const fertilizer = mapKey(soil, soilToFertilizer)
      const water = mapKey(fertilizer, fertilizerToWater)
      const light = mapKey(water, waterToLight)
      const temperature = mapKey(light, lightToTemperature)
      const humidity = mapKey(temperature, temperatureToHumidity)
      const location = mapKey(humidity, humidityToLocation)
      if (location < smallestLocation || smallestLocation === -1) {
        smallestLocation = location
      }
    }
  }

  return smallestLocation
}

function setRules(input: string, rules: Array<MapRules>) {
  const destinationSourceRange = input.split(' ')
  const destination = Number(destinationSourceRange[0]) ?? ''
  const source = Number(destinationSourceRange[1]) ?? ''
  const range = Number(destinationSourceRange[2]) ?? ''
  rules.push({
    bottom: source,
    top: source + range - 1,
    shift: destination - source
  })
}

function mapKey(input: number, rules: Array<MapRules>) {
  for (let range of rules) {
    if (input >= range.bottom && input <= range.top) {
      return range.shift + input
    }
  }
  return input
}

function getSeedFromInputString(input: string): Array<Seed> {
  const inputArray = input.slice(input.indexOf(':') + 1).trim().split(' ')
  const returnValue: Array<Seed> = []
  for (let i=0; i < inputArray.length; i+=2) {
    returnValue.push({initialValue: Number(inputArray[i]), range: Number(inputArray[i + 1])})
  }
  return returnValue
}


main().then(console.log).catch(console.error)
