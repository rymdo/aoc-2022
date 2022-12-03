const fs = require('fs')

const input = fs.readFileSync("./input").toString()

const lines = input.split(/\r?\n/)

let elfs = []

let currentElf = []
lines.forEach(line => {
  if (line == "") {
    elfs.push(currentElf)
    currentElf = []
  } else {
    currentElf.push(Number(line))
  }
})

let mostCalories = 0
elfs.forEach(elf => {
  let sum = 0
  elf.forEach(value => sum += value)
  if (sum > mostCalories) {
    mostCalories = sum
  }
})

console.log(`day1 - part1 - mostCalories: ${mostCalories}`)
