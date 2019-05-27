export const shouldBeConspiracy = numPlayers => (
  Math.random() <= (numPlayers / (numPlayers + 1))
)