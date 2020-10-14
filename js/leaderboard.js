var queryString = decodeURIComponent(window.location.search)
queryString = queryString.substring(1)
var queries = queryString.split('&')
//for (var i = 0; i < queries.length; i++) {
//    document.write(queries[i] + '<br>')
//}

//return random number of 1 - 20
function randomScore(num) {
    return num + Math.floor(Math.random() * 20) + 1
}

//cool stuff
var leaderboard = [
    ['God', 12],
    ['Cherry', randomScore(17)],
    ['Lolly', randomScore(29)],
    ['Danny', randomScore(31)],
    ['Jeff', randomScore(43)],
    ['Ron', randomScore(55)],
    ['Zack', randomScore(67)],
    ['Merry', randomScore(79)],
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

function fillTable(item) {
    var table = document.getElementById('myTable');
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

    var placement = namesOnly.indexOf(queries[0])

    //IndexOf
    document.write('You placed #' + (placement + 1) + ' on the leaderboard. ')

//    // Find method (return element < your attempts)
//    var found = attemptsOnly.find(element => element < queries[1])

    document.write(placement == 0 ? 'It took you only ' + attemptsOnly[0] + ' attempts? That\'s impossible. You must be a cheater!' :
        ((queries[1] == attemptsOnly[placement - 1] ? 'You tied with ' : 'You placed behind ') + namesOnly[placement - 1] + ' who has ' + attemptsOnly[placement - 1] + ' attempts. Try again soon!'))
} else {
    document.write('Your name will inserted into this leaderboard if you play and finish the game.')
}