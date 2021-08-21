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

export const transformTest = {
  options: {
    columns: [{
      name:"two",
      transform: function(two) {
        return two + 2;
      }
    }]
  },
  data: [
    { one: 'a', two: 3 },
    { one: 'b', two: 5 },
    { one: 'c', two: 7 },
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
