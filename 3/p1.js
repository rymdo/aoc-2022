const fs = require('fs')

const ASCII_UPPERCASE_OFFSET = 65
const ASCII_LOWERCASE_OFFSET = 97

const UPPERCASE_PRIORITY_BASE = 27
const LOWERCASE_PRIORITY_BASE = 1

function getRucksacks() {
  const input = fs.readFileSync("./input").toString()
  const lines = input.split(/\r?\n/)
  let rucksacks = []
  for (const line of lines) {
    const middle = line.length / 2
    rucksacks.push({
      compartment1: line.slice(0, middle),
      compartment2: line.slice(middle),
    })
  }
  return rucksacks
}

function getSharedItemTypes(rucksack) {
  const compartment1Types = Array.from(rucksack.compartment1)
  const compartment2Types = Array.from(rucksack.compartment2)
  let shared = []
  for (const compartment1Type of compartment1Types) {
    for (const compartment2Type of compartment2Types) {
      if (compartment1Type === compartment2Type) {
        shared.push(compartment1Type)
      }
    }
  }
  return Array.from(new Set(shared))
}

function getPriorityScore(type) {
  let result = 0
  if (type.toUpperCase() === type) {
    result = type.charCodeAt() - ASCII_UPPERCASE_OFFSET + UPPERCASE_PRIORITY_BASE
  } else {
    result = type.charCodeAt() - ASCII_LOWERCASE_OFFSET + LOWERCASE_PRIORITY_BASE
  }
  return result
}

const rucksacks = getRucksacks()

let sharedTypes = []
for (const rucksack of rucksacks) {
  const types = getSharedItemTypes(rucksack)
  if (types) {
    sharedTypes.push(...types)
  }
}

let priorityScores = []
for (const type of sharedTypes) {
  priorityScores.push(getPriorityScore(type))
}

let sum = 0
for (const score of priorityScores) {
  sum += score
}

console.log(`day3 - part1 - score: ${sum}`)