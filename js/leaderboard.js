var queryString = decodeURIComponent(window.location.search)
queryString = queryString.substring(1)
var queries = queryString.split('&')

//return random number of 1 - 15
function randomScore(num) {
    return num + Math.floor(Math.random() * 15) + 1
}

var namesOnly = ['GOD', 'Mitch', 'Betsy', 'Edna', 'Opal', 'Janet', 'Louis', 'Hazel', 'Dora', 'Thomas', 'Stan', 'Connie', 'Noel', 'Keith', 'Roxanne', 'Gilbert', 'Isabel', 'Wilma', 'Zack', 'Paloma', 'Frederic', 'Alicia', 'Cesar', 'Loser']

var initAtt = 15

//score for GOD
var attemptsOnly = [12]

for (i = 1; i < namesOnly.length - 1; i++) {
    attemptsOnly.push(randomScore(initAtt))
    initAtt = initAtt + 3
}

//push data from queries
if (queries[0] && queries[1]) {
    namesOnly.push(queries[0])
    attemptsOnly.push(queries[1])
}

//score for Loser
attemptsOnly.push(999)

//sort both arrays by # of attempts
attemptsOnly.sort()

namesOnly.sort(function (a, b) {
    return attemptsOnly.indexOf(a) - attemptsOnly.indexOf(b)
})

convertToJSON(namesOnly, attemptsOnly)

function convertToJSON() {
    var tmp = new Array()
    for (i = 0; i < namesOnly.length; i++) {
        tmp[i] = new Player(namesOnly[i], attemptsOnly[i])
    }
    console.log(tmp)

    myDataObj = new Object
    myDataObj.Players = tmp

    objectJSON = JSON.stringify(myDataObj)
    console.log(objectJSON)
}

function Player(pName, attmpts) {
    this.pName = pName
    this.pAttempts = attmpts
}

var ranking = 0

fetch('http://dummy.restapiexample.com/api/v1/employees')
    .then(response => leaderboardData = response.json())
    .then(function (result) {
        var data = result.data;
        for (var i = 0; i <= data.length - 1; i++) {
            $('#myTable')
                .append('<tr>' + '<td>' + ('#' + ++ranking) +
                    '<td>' + (data[i].pName) + '</td>' +
                    '<td>' + (data[i].pAttempts) + '</td>' +
                    '</tr>');
        }
    })

if (queries[0] && queries[1]) {
    //IndexOf
    var placement = namesOnly.indexOf(queries[0])

    document.getElementById('results').innerHTML =
        placement == 0 ?
        '...Really?! It took you only ' +
        attemptsOnly[0] +
        " attempts?! That's impossible. You must be a cheater!" :
        'You placed #' +
        (placement + 1) +
        ' on the leaderboard. ' +
        (queries[1] == attemptsOnly[placement - 1] ?
            'You tied with ' :
            'You placed behind ') +
        namesOnly[placement - 1] +
        ' who has ' +
        attemptsOnly[placement - 1] +
        ' attempts. Try again soon!'
} else {
    document.getElementById('results').innerHTML =
        'Your name will inserted into this leaderboard if you play and finish the memory game.'
}