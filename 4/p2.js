const fs = require('fs')

function getInputLines() {
  const input = fs.readFileSync("./input").toString()
  return input.split(/\r?\n/)
}

function mapSectionRange(range) {
  const limits = range.split("-")
  const start = Number(limits[0]);
  const end = Number(limits[1]);
  const result = [...Array(end - start + 1).keys()].map(x => x + start);
  return result
}

function getSectionPairs(lines) {
  const result = []
  for (const line of lines) {
    const sections = line.split(",")
    result.push({
      section1: mapSectionRange(sections[0]),
      section2: mapSectionRange(sections[1])
    })
  }
  return result
}

function isContained(sectionPair) {
  const {
    section1,
    section2
  } = sectionPair
  const intersection = section1.filter(value => section2.includes(value));
  if (intersection.length > 0) {
    return true
  }
  return false
}

const inputLines = getInputLines()
const sectionPairs = getSectionPairs(inputLines)

let containedCount = 0
for (const sectionPair of sectionPairs) {
  const contained = isContained(sectionPair)
  if (contained) {
    containedCount += 1
  }
}

console.log(`day4 - part2 - count: ${containedCount}`)