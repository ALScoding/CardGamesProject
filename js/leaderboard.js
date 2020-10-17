var queryString = decodeURIComponent(window.location.search)
queryString = queryString.substring(1)
var queries = queryString.split('&')

//return random number of 1 - 15
function randomScore (num) {
  return num + Math.floor(Math.random() * 15) + 1
}

//fake leaderboard names
var leaderboard = [
  ['GOD', 12],
  ['Mitch', randomScore(15)], //
  ['Betsy', randomScore(18)], //
  ['Edna', randomScore(21)], //
  ['Opal', randomScore(24)], //
  ['Janet', randomScore(27)], //
  ['Louis', randomScore(30)], //
  ['Hazel', randomScore(33)], //
  ['Dora', randomScore(36)], //
  ['Thomas', randomScore(39)], //
  ['Stan', randomScore(42)], //
  ['Connie', randomScore(45)], //
  ['Noel', randomScore(48)], //
  ['Keith', randomScore(51)], //
  ['Roxanne', randomScore(54)], //
  ['Gilbert', randomScore(57)], //
  ['Isabel', randomScore(60)], //
  ['Wilma', randomScore(63)], //
  ['Zack', randomScore(66)], //
  ['Paloma', randomScore(69)], //
  ['Frederic', randomScore(72)], //
  ['Alicia', randomScore(75)], //
  ['Cesar', randomScore(78)], //
  ['Loser', 999]
]

if (queries[0] && queries[1]) {
  leaderboard.push([queries[0], queries[1]])
}

//You can sort it sort it by number(second index)
leaderboard.sort(function (a, b) {
  return a[1] - b[1]
})

leaderboard.sort((a, b) => a[1] - b[1])
//console.log(leaderboard)

var counting = 0
var newrow = 0

leaderboard.forEach(fillTable)

function fillTable (item) {
  var table = document.getElementById('myTable')
  var row = table.insertRow(++newrow)
  var cell0 = row.insertCell(0)
  var cell1 = row.insertCell(1)
  var cell2 = row.insertCell(2)
  cell0.innerHTML = '#' + ++counting
  cell1.innerHTML = item[0]
  cell2.innerHTML = item[1]
}

if (queries[0] && queries[1]) {
  var namesOnly = []
  var attemptsOnly = []

  for (i = 0; i < leaderboard.length; i++) {
    namesOnly.push(leaderboard[i][0])
    attemptsOnly.push(leaderboard[i][1])
  }

  //IndexOf
  var placement = namesOnly.indexOf(queries[0])

  //    // Find method (return element < your attempts)
  //    var found = attemptsOnly.find(element => element < queries[1])

  document.getElementById('results').innerHTML =
    placement == 0
      ? '...Really?! It took you only ' +
        attemptsOnly[0] +
        " attempts?! That's impossible. You must be a cheater!"
      : 'You placed #' +
        (placement + 1) +
        ' on the leaderboard. ' +
        (queries[1] == attemptsOnly[placement - 1]
          ? 'You tied with '
          : 'You placed behind ') +
        namesOnly[placement - 1] +
        ' who has ' +
        attemptsOnly[placement - 1] +
        ' attempts. Try again soon!'
} else {
  document.getElementById('results').innerHTML =
    'Your name will inserted into this leaderboard if you play and finish the memory game.'
}
