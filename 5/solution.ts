import * as fs from 'node:fs/promises'
import 'dotenv/config'
type MapRules = {
  bottom: number,
  top: number,
  shift: number
}

async function main() {
  let total: number = 0
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/5/input`, 'utf8')
  const inputArray: string[] = input.trim().split('\n')
  const seedString = inputArray[0]
  const seedArray: string[] = seedString.slice(seedString.indexOf(':') + 1).trim().split(' ')
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


  for (let seed of seedArray) {
    const seedNumber = Number(seed)
    const soil = mapKey(seedNumber, seedToSoil)
    const fertilizer = mapKey(soil, soilToFertilizer)
    const water = mapKey(fertilizer, fertilizerToWater)
    const light = mapKey(water, waterToLight)
    const temperature = mapKey(light, lightToTemperature)
    const humidity = mapKey(temperature, temperatureToHumidity)
    const location = mapKey(humidity, humidityToLocation)
    console.log(`soil: ${soil}, fertilizer: ${fertilizer}, water: ${water}, light: ${light}, temperature, ${temperature}, humidity: ${humidity}, location: ${location}`)
    locations.push(location)
  }

  let smallestLocation: number = Math.min(...locations)
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



main().then(console.log).catch(console.error)
