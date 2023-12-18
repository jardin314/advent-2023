import * as fs from 'node:fs/promises'
import 'dotenv/config'

type HandInfo = {
  hand: string,
  rank: number
  bid: number
}
const faceCardRankings: Map<string, number> = new Map()
faceCardRankings.set('T', 10).set('J', 0).set('Q', 11).set('K', 12).set('A', 13)

async function main() {
  const input: string = await fs.readFile(`${process.env.PATH_TO_ROOT}/7/input`, 'utf8')
  const hands: HandInfo[] = input.trim().split('\n').map((handInfo) => {
    const [
      cardsInHand,
      bid
    ] = handInfo.split(' ')
    return {hand: cardsInHand, rank: getRank(cardsInHand), bid: Number(bid)}
  })
  
  for (let i = hands.length-1; i >= 0; i--) {
    for (let j = 0; j < i; j++) {
      if (hands[j].rank > hands[j+1].rank || (hands[j].rank === hands[j+1].rank && compareIdenticalRanks(hands[j].hand, hands[j+1].hand) === 1)) {
        const hold = hands[j + 1]
        hands[j + 1] = hands[j]
        hands[j] = hold
      }
    }
  }
  const total: number = hands.reduce((accumulator, currentValue, index) => {return accumulator + currentValue.bid * (index + 1)}, 0)
  return total
}

function getRank(hand: string) {
  const numberOfEachCard: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

  for (let i = 0; i < hand.length; i++) {
    const card: string= hand[i]
    const cardValue: number|undefined = Number.isNaN(Number(card))? faceCardRankings.get(card) : Number(card)
    if (cardValue === undefined) {
      throw Error('Hand parsing error')
    }
    numberOfEachCard[cardValue]++
  }

  if (numberOfEachCard[0] > 0) {
    const mostDuplicates: number = numberOfEachCard.slice(1).reduce((previousValue, currentValue, index) => {
      return currentValue > previousValue ? currentValue : previousValue 
    }, 0)
    const cardWithMostDuplicates: number = numberOfEachCard.lastIndexOf(mostDuplicates)
    numberOfEachCard[cardWithMostDuplicates] += numberOfEachCard[0]
    numberOfEachCard[0] = 0
  }

  if (numberOfEachCard.includes(5)) {
    return 7
  } else if (numberOfEachCard.includes(4)) {
    return 6
  } else if (numberOfEachCard.includes(3)) {
    if (numberOfEachCard.includes(2)) {
      return 5
    } else {
      return 4
    }
  } else if (numberOfEachCard.includes(2)) {
    if (numberOfEachCard.indexOf(2) !== numberOfEachCard.lastIndexOf(2)) {
      return 3
    } else {
      return 2
    }
  } else {
    return 1
  }
}


function compareIdenticalRanks(hand1: string, hand2: string) {
  let numberedHand1: (number|undefined)[] = hand1.split('').map((card) => Number.isNaN(Number(card)) ? faceCardRankings.get(card) : Number(card))
  let numberedHand2: (number|undefined)[] = hand2.split('').map((card) => Number.isNaN(Number(card)) ? faceCardRankings.get(card) : Number(card))
   //numberedHand1.sort((a, b) => {if (a === undefined || b === undefined) {throw Error('card undefined')} else return a - b}).reverse()
  // numberedHand2.sort((a, b) => {if (a === undefined || b === undefined) {throw Error('card undefined')} else return a - b}).reverse()

  for (let i = 0; i < numberedHand1.length; i++) {
    const card1 = numberedHand1[i]
    const card2 = numberedHand2[i]
    if (card1 === undefined || card2 === undefined) {
      throw Error('Hand parsing error')
    }
    if (card1 > card2) {
      return 1
    } else if (card2 > card1) {
      return 2
    }
  }
  return 1
}


main().then(console.log).catch(console.error)
