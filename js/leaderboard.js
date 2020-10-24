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
  displayMessage(leaderArr)
} else {
  document.getElementById('results').innerHTML =
    'Your name will inserted into this leaderboard if you play and finish the memory game.'
}

function displayMessage (leaderArr) {
  console.log(leaderArr)

  for (i = 0; i < leaderArr.length; i++) {
    if (leaderArr[i]['pName'] == queries[0]) {
      var uAttempts = leaderArr[i]['pAttempts']
      var uPlacement = i + 1
      break
    }
  }

  document.getElementById('results').innerHTML =
    uPlacement == 0
      ? '...Really?! It took you only ' +
        uAttempts +
        " attempts?! That's impossible. You must be a cheater!"
      : 'You placed #' +
        uPlacement +
        ' on the leaderboard. ' +
        (uAttempts == leaderArr[i - 1]['pAttempts']
          ? 'You tied with '
          : 'You placed behind ') +
        leaderArr[i - 1]['pName'] +
        ' who has ' +
        leaderArr[i - 1]['pAttempts'] +
        ' attempts. Try again soon!'
}
