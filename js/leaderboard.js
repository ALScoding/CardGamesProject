var queryString = decodeURIComponent(window.location.search)
queryString = queryString.substring(1)
var queries = queryString.split('&')

var leaderArr = []
var ranking = 0

fetch('https://my-leaderboard-api.herokuapp.com/api/leaderboard')
  .then(response => (leaderboardData = response.json()))
  .then(function (result) {
    leaderArr = result.Players
    for (var i = 0; i <= leaderArr.length - 1; i++) {
      $('#myTable').append(
        '<tr>' +
          '<td>' +
          ('#' + ++ranking) +
          '<td>' +
          leaderArr[i].pName +
          '</td>' +
          '<td>' +
          leaderArr[i].pAttempts +
          '</td>' +
          '</tr>'
      )
    }
  })

if (queries[0] && queries[1]) {
  setTimeout(() => {
    displayMessage(leaderArr)
  }, 1000)
} else {
  document.getElementById('results').innerHTML =
    'If the Leaderboard API is running, your name will be inserted into this leaderboard when you play and finish the memory game.'
}

function displayMessage (leaderArr) {
  console.log(leaderArr)

  for (i = 0; i < leaderArr.length; i++) {
    if (leaderArr[i]['pName'] == queries[0]) {
      var uAttempts = leaderArr[i]['pAttempts']
      var uPlace = i
      break
    }
  }

  document.getElementById('results').innerHTML =
    uPlace == 0
      ? '...Really?! It took you only ' +
        uAttempts +
        " attempts?! That's impossible. You must be a cheater!"
      : 'You placed #' +
        (uPlace + 1) +
        ' on the leaderboard. ' +
        (uAttempts == leaderArr[uPlace - 1]['pAttempts']
          ? 'You tied with '
          : 'You placed behind ') +
        leaderArr[uPlace - 1]['pName'] +
        ' who has ' +
        leaderArr[uPlace - 1]['pAttempts'] +
        ' attempts. Try again soon!'
}
