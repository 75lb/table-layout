export const primatives = {
  options: {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  },
  data: [
    { one: 'row 1 column one .. .. ..', two: 3000 },
    { one: true, two: null },
    { one: { yeah: true } }
  ]
}

export const simpleMaxWidth = {
  options: {
    maxWidth: 40,
    padding: { left: '<', right: '>' }
  },
  data: [
    { one: 'row 1 column one .. .. ..', two: 'r1 c2' },
    { one: 'r2 c1', two: 'row two column 2' }
  ]
}
