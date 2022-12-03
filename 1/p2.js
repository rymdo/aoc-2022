const fs = require('fs')

const input = fs.readFileSync("./input").toString()

const lines = input.split(/\r?\n/)

let elfs = []

let currentElf = []
lines.forEach(line => {
  if (line == "") {
    let sum = 0
    currentElf.forEach(value => sum += value)
    elfs.push(sum)
    currentElf = []
  } else {
    currentElf.push(Number(line))
  }
})

const sorted = elfs.sort((a, b) => {
  return b - a
})

let sumTopThree = elfs[0] + elfs[1] + elfs[2]

console.log(`day1 - part2 - top 3 total calories: ${sumTopThree}`)
