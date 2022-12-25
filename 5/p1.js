const fs = require('fs')

function getInputLines() {
  const input = fs.readFileSync("./input").toString()
  return input.split(/\r?\n/)
}

function lineToArray(line) {
  const boxes = []
  const sections = line.match(/.{1,4}/g)
  for (const section of sections) {
    if (section[0] === "[") {
      boxes.push(section[1])
    } else {
      boxes.push("")
    }
  }
  return boxes
}

function getStacks(inputLines) {
  // find last line for the stack description
  let partDelimeterIndex = 0
  for (const [index,line] of Object.entries(inputLines)) {
    if (line === "") {
      partDelimeterIndex = index
      break
    }
  }

  // setup stacks
  const stacks = []
  for (const char of inputLines[partDelimeterIndex-1]) {
    if (char !== " ") {
      stacks.push([])
    }
  }

  // load stack contents
  for (const [index,line] of Object.entries(inputLines)) {
    if (index >= partDelimeterIndex-1) {
      break
    }
    for(const [index, _] of Object.entries(stacks)) {
      if (lineToArray(line)[index] !== "") {
        stacks[index].push(lineToArray(line)[index])
      }
    }
  }

  return stacks
}

function getMoveOrders(inputLines) {
  // find stack description delimter
  let partDelimeterIndex = 0
  for (const [index,line] of Object.entries(inputLines)) {
    if (line === "") {
      partDelimeterIndex = Number(index)
      break
    }
  }

  const moves = []
  for (const [index,line] of Object.entries(inputLines)) {
    if (index < partDelimeterIndex + 1) {
      continue
    }
    moves.push({
      count: Number(line.split(" ")[1]),
      from: Number(line.split(" ")[3]),
      to: Number(line.split(" ")[5]),
    })
  }
  return moves
}

function stackMove(from, to) {
  to.unshift(from.shift())
}

function move(stacksStart, orders) {
  const stacks = [...stacksStart]
  for (const order of orders) {
    let count = order.count
    while (count > 0) {
      stackMove(stacks[order.from - 1], stacks[order.to - 1])
      count--
    }
  }
  return stacks
}

function getTopBoxes(stacks) {
  const top = []
  for (const stack of stacks) {
    top.push(stack[0])
  }
  return top
}

const inputLines = getInputLines()
const stacksStart = getStacks(inputLines)

const orders = getMoveOrders(inputLines)

const stacksEnd = move(stacksStart, orders)

const topBoxes = getTopBoxes(stacksEnd)

console.log(`day5 - part1 - result: ${topBoxes.join("")}`)