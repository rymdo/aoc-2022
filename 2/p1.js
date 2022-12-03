const fs = require('fs')

const ROCK = "rock"
const PAPER = "paper"
const SCISSORS = "scissors"

const ROCK_EXTRA = 1
const PAPER_EXTRA = 2
const SCISSORS_EXTRA = 3

const WIN = 6
const DRAW = 3
const LOST = 0

// Rock - A,X
// Paper - B,Y
// Scissors - C,Z
const moves = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
}

function getRounds() {
  const input = fs.readFileSync("./input").toString()
  const lines = input.split(/\r?\n/)
  let rounds = []
  for (const line of lines) {
    const data = line.split(" ")
    rounds.push({
      opponent: moves[data[0]],
      you: moves[data[1]]
    })
  }
  return rounds
}

function getScore(round) {
  let score = 0

  const {
    opponent,
    you,
  } = round

  if (you === ROCK) {
    score += ROCK_EXTRA
    if (opponent === ROCK) {
      score += DRAW
    }
    if (opponent === PAPER) {
      score += LOST
    }
    if (opponent === SCISSORS) {
      score += WIN
    }
  }
  if (you === PAPER) {
    score += PAPER_EXTRA
    if (opponent === ROCK) {
      score += WIN
    }
    if (opponent === PAPER) {
      score += DRAW
    }
    if (opponent === SCISSORS) {
      score += LOST
    }
  }
  if (you === SCISSORS) {
    score += SCISSORS_EXTRA
    if (opponent === ROCK) {
      score += LOST
    }
    if (opponent === PAPER) {
      score += WIN
    }
    if (opponent === SCISSORS) {
      score += DRAW
    }
  }

  return score
}

const rounds = getRounds()

let totalScore = 0
for (const round of rounds) {
  totalScore += getScore(round)
}

console.log(`day2 - part1 - score: ${totalScore}`)
