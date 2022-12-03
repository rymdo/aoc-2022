const fs = require('fs')

const MOVE_ROCK = "rock"
const MOVE_PAPER = "paper"
const MOVE_SCISSORS = "scissors"

const MOVE_WIN = "win"
const MOVE_DRAW = "draw"
const MOVE_LOSS = "loss"

const SCORE_ROCK = 1
const SCORE_PAPER = 2
const SCORE_SCISSORS = 3

const SCORE_WIN = 6
const SCORE_DRAW = 3
const SCORE_LOST = 0

const moves = {
  A: MOVE_ROCK,
  B: MOVE_PAPER,
  C: MOVE_SCISSORS,
  X: MOVE_LOSS,
  Y: MOVE_DRAW,
  Z: MOVE_WIN,
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

  if (opponent === MOVE_ROCK) {
    if (you === MOVE_LOSS) {
      score += SCORE_LOST
      score += SCORE_SCISSORS
    }
    if (you === MOVE_DRAW) {
      score += SCORE_DRAW
      score += SCORE_ROCK
    }
    if (you === MOVE_WIN) {
      score += SCORE_WIN
      score += SCORE_PAPER
    }
  }

  if (opponent === MOVE_PAPER) {
    if (you === MOVE_LOSS) {
      score += SCORE_LOST
      score += SCORE_ROCK
    }
    if (you === MOVE_DRAW) {
      score += SCORE_DRAW
      score += SCORE_PAPER
    }
    if (you === MOVE_WIN) {
      score += SCORE_WIN
      score += SCORE_SCISSORS
    }
  }

  if (opponent === MOVE_SCISSORS) {
    if (you === MOVE_LOSS) {
      score += SCORE_LOST
      score += SCORE_PAPER
    }
    if (you === MOVE_DRAW) {
      score += SCORE_DRAW
      score += SCORE_SCISSORS
    }
    if (you === MOVE_WIN) {
      score += SCORE_WIN
      score += SCORE_ROCK
    }
  }

  return score
}

const rounds = getRounds()

let totalScore = 0
for (const round of rounds) {
  totalScore += getScore(round)
}

console.log(`day2 - part2 - score: ${totalScore}`)
