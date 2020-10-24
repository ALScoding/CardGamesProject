var leaderboard = require('..js/leaderboard.js')
var express = require('express')
var bodyParser = require('body-parser')
var app = express()

app.use(bodyParser())

const port = process.env.PORT || 3000

var server = app.listen(port, function () {
  console.log('The port is running!')
})

app.get('/api/leaderboard', function (req, res) {
  console.log('lead endpoint')

  var result = jjjjjj(req.query.pName, req.query.pAttempts) //JSON string

  res.send(result)
})

app.post('/api/v1/student', function (req, res, next) {
  console.log('Entro en post')
  var name = req.body.name || ''
  res.send(`El parametro mandado en el body es: ${name}`)
})

function jjjjjj (param1, param2) {
  var queryString = decodeURIComponent(window.location.search)
  queryString = queryString.substring(1)
  var queries = queryString.split('&')

  //return random number of 1 - 15
  function randomScore (num) {
    return num + Math.floor(Math.random() * 15) + 1
  }

  var namesOnly = [
    'GOD',
    'Mitch',
    'Betsy',
    'Edna',
    'Opal',
    'Janet',
    'Louis',
    'Hazel',
    'Dora',
    'Thomas',
    'Stan',
    'Connie',
    'Noel',
    'Keith',
    'Roxanne',
    'Gilbert',
    'Isabel',
    'Wilma',
    'Zack',
    'Paloma',
    'Frederic',
    'Alicia',
    'Cesar',
    'Loser'
  ]

  var initAtt = 15

  //score for GOD
  var attemptsOnly = [12]

  for (i = 1; i < namesOnly.length - 1; i++) {
    attemptsOnly.push(randomScore(initAtt))
    initAtt = initAtt + 3
  }

  //score for Loser
  attemptsOnly.push(999)

  //push data from queries
  if (queries[0] && queries[1]) {
    namesOnly.push('*' + queries[0] + '*')
    attemptsOnly.push(parseInt(queries[1]))
  }

  console.log(namesOnly)
  console.log(attemptsOnly)

  convertToJSON(namesOnly, attemptsOnly)

  function convertToJSON (arr1, arr2) {
    var tmp = new Array()
    for (i = 0; i < arr1.length; i++) {
      tmp[i] = new Player(arr1[i], arr2[i])
    }
    console.log(tmp)

    var order = arr2.sort()
    var tmp2 = mapOrder(tmp, order, 'pAttempts')

    // if (queries[0] && queries[1]) {
    //     displayMessage(tmp2)
    // } else {
    //     document.getElementById('results').innerHTML =
    //         'Your name will inserted into this leaderboard if you play and finish the memory game.'
    // }

    myDataObj = new Object()
    myDataObj.Players = tmp2

    objectJSON = JSON.stringify(myDataObj)
    console.log(objectJSON)
  }

  function Player (pName, attmpts) {
    this.pName = pName
    this.pAttempts = attmpts
  }

  function mapOrder (arr, order, key) {
    arr.sort(function (a, b) {
      var A = a[key],
        B = b[key]
      if (order.indexOf(A) > order.indexOf(B)) {
        return 1
      } else {
        return -1
      }
    })
    return arr
  }

  return objectJSON
}
