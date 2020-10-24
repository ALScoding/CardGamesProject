var queryString = decodeURIComponent(window.location.search)
queryString = queryString.substring(1)
var queries = queryString.split('&')

// //return random number of 1 - 15
// function randomScore (num) {
//   return num + Math.floor(Math.random() * 15) + 1
// }

// var namesOnly = [
//   'GOD',
//   'Mitch',
//   'Betsy',
//   'Edna',
//   'Opal',
//   'Janet',
//   'Louis',
//   'Hazel',
//   'Dora',
//   'Thomas',
//   'Stan',
//   'Connie',
//   'Noel',
//   'Keith',
//   'Roxanne',
//   'Gilbert',
//   'Isabel',
//   'Wilma',
//   'Zack',
//   'Paloma',
//   'Frederic',
//   'Alicia',
//   'Cesar',
//   'Loser'
// ]

// var initAtt = 15

// //score for GOD
// var attemptsOnly = [12]

// for (i = 1; i < namesOnly.length - 1; i++) {
//   attemptsOnly.push(randomScore(initAtt))
//   initAtt = initAtt + 3
// }

// //score for Loser
// attemptsOnly.push(999)

// //push data from queries
// if (queries[0] && queries[1]) {
//   namesOnly.push('*' + queries[0] + '*')
//   attemptsOnly.push(parseInt(queries[1]))
// }

// console.log(namesOnly)
// console.log(attemptsOnly)

// convertToJSON(namesOnly, attemptsOnly)

// function convertToJSON (arr1, arr2) {
//   var tmp = new Array()
//   for (i = 0; i < arr1.length; i++) {
//     tmp[i] = new Player(arr1[i], arr2[i])
//   }
//   console.log(tmp)

//   var order = arr2.sort()
//   var tmp2 = mapOrder(tmp, order, 'pAttempts')

//   if (queries[0] && queries[1]) {
//     displayMessage(tmp2)
//   } else {
//     document.getElementById('results').innerHTML =
//       'Your name will inserted into this leaderboard if you play and finish the memory game.'
//   }

//   myDataObj = new Object()
//   myDataObj.Players = tmp2

//   objectJSON = JSON.stringify(myDataObj)
//   console.log(objectJSON)

//   return objectJSON
// }

// function Player (pName, attmpts) {
//   this.pName = pName
//   this.pAttempts = attmpts
// }

// function mapOrder (arr, order, key) {
//   arr.sort(function (a, b) {
//     var A = a[key],
//       B = b[key]
//     if (order.indexOf(A) > order.indexOf(B)) {
//       return 1
//     } else {
//       return -1
//     }
//   })
//   return arr
// }

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

  let placement = leaderArr.findIndex(rank => rank === '*' + queries[0] + '*')
  console.log('aaaa' + placement)

  //    for (i = 0; i < 24; i++) {
  //        if (leaderArr[i][0] == '*' + queries[0] + '*') {
  //            var placement = leaderArr[i][0]
  //            console.log('placement is ' + placement)
  //            break
  //        }
  //    }

  //IndexOf
  //var placement = leaderArr.indexOf(queries[0])

  //fetch('?????????' + queries[1]).then(response => response.json()).then(json => console.log(json))

  document.getElementById('results').innerHTML =
    placement == 0
      ? '...Really?! It took you only ' +
        attemptsOnly[0].sort() +
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
}
