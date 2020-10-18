var suitsB = ['Clubs', 'Spades']
var suitsR = ['Hearts', 'Diamonds']
var values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
var deckB = new Array() //black deck
var deckR = new Array() //red deck
var players = new Array()
var currPlayer = 0

function createDeck (suits, deck) {
  //deck = new Array() remove this
  console.log(values.length + ' ' + suits.length)

  for (var i = 0; i < values.length; i++) {
    for (var x = 0; x < suits.length; x++) {
      var weight = parseInt(values[i])
      if (values[i] == 'J' || values[i] == 'Q' || values[i] == 'K') weight = 10
      if (values[i] == 'A') weight = 11
      var card = {
        Weight: weight,
        Value: values[i],
        Suit: suits[x],
        Img:
          'cards_png/' +
          values[i].charAt(0) +
          (values[i] == '10' ? '0' : '') +
          suits[x].charAt(0) +
          '.png'
      }
      deck.push(card)
      console.log(card)
    }
  }
}

function createPlayers (num) {
  players = new Array()
  for (var i = 1; i <= num; i++) {
    var hand = new Array()
    var player = {
      Name: 'Player ' + i,
      ID: i,
      Points: 0,
      Hand: hand
    }
    players.push(player)
  }
}

function createPlayersUI () {
  document.getElementById('players').innerHTML = ''
  for (var i = 0; i < players.length; i++) {
    var div_player = document.createElement('div')
    var div_playerid = document.createElement('div')
    var div_hand = document.createElement('div')
    var div_points = document.createElement('div')

    div_points.className = 'points'
    div_points.id = 'points_' + i
    div_player.id = 'player_' + i
    div_player.className = 'player'
    div_hand.id = 'hand_' + i

    div_playerid.innerHTML = 'Player ' + players[i].ID
    div_player.appendChild(div_playerid)
    div_player.appendChild(div_hand)
    div_player.appendChild(div_points)
    document.getElementById('players').appendChild(div_player)
  }
}

function shuffle (deck) {
  // for 500 turns
  // switch the values of two random cards
  for (var i = 0; i < 500; i++) {
    var location1 = Math.floor(Math.random() * deck.length)
    var location2 = Math.floor(Math.random() * deck.length)
    var tmp = deck[location1]

    deck[location1] = deck[location2]
    deck[location2] = tmp
  }
}

function startblackjack () {
  if ((document.getElementById('btnStart').value = 'Restart')) {
    deckB = new Array()
    deckR = new Array()

    document.getElementById('btnHitMe').disabled = false
    document.getElementById('btnStay').disabled = false
  }
  playSound(1)

  document.getElementById(
    'status'
  ).innerHTML = `It is now Player ${players[currPlayer].ID}'s turn...`
  // deal 2 cards to every player object
  currPlayer = 0
  createDeck(suitsB, deckB)
  shuffle(deckB)
  createDeck(suitsR, deckR)
  shuffle(deckR)
  createPlayers(2)
  createPlayersUI()
  dealHands(deckB, 0)
  dealHands(deckR, 1)
  document.getElementById('player_' + currPlayer).classList.add('active')
}

function dealHands (deck, plyr) {
  // alternate handing cards to each player
  // 2 cards each
  for (var i = 0; i < 2; i++) {
    var card = deck.pop()
    players[plyr].Hand.push(card)
    renderCard(card, plyr)
    updatePoints()
  }
}

function renderCard (card, player) {
  var hand = document.getElementById('hand_' + player)
  hand.appendChild(getCardUI(card))
}

function getCardUI (card) {
  var el = document.createElement('IMG')
  el.setAttribute('src', card.Img)
  el.setAttribute('width', '86.5')
  el.setAttribute('height', '132')
  el.setAttribute('alt', 'The ' + card.Value + ' of ' + card.Suit)
  document.body.appendChild(el)
  return el
}

// returns the number of points that a player has in hand
function getPoints (player) {
  var points = 0
  for (var i = 0; i < players[player].Hand.length; i++) {
    points += players[player].Hand[i].Weight
  }

  players[player].Points = points

  if (points == 21) {
    end(1)
  } else if (points > 21) {
    for (var i = 0; i < players[player].Hand.length; i++) {
      //if player hand contains A and points > 21 then -10 points
      if (players[player].Hand[i].Value.includes('A')) {
        //console.log('Player ' + (player + 1) + '\'s ace value changed to 1')
        points -= 10
      }
    }
  }
  return points
}

function checkAces () {}
function updatePoints () {
  for (var i = 0; i < players.length; i++) {
    getPoints(i)
    document.getElementById('points_' + i).innerHTML =
      'Sum: ' + players[i].Points
  }
}

function hitMe () {
  playSound(1)
  // pop a card from the deck to the current player
  // check if current player new points are over 21
  var card = currPlayer === 0 ? deckB.pop() : deckR.pop()
  players[currPlayer].Hand.push(card)
  renderCard(card, currPlayer)
  updatePoints()
  check()
}

function stay () {
  // move on to next player, if any
  if (currPlayer != players.length - 1) {
    document.getElementById('player_' + currPlayer).classList.remove('active')
    currPlayer += 1
    document.getElementById('player_' + currPlayer).classList.add('active')
    document.getElementById(
      'status'
    ).innerHTML = `It is now Player ${players[currPlayer].ID}'s turn`
  } else {
    end(2)
  }
}

//condition 1: at least one of the players got a blackjack
//condition 2: both players stay with a hand below 21
//condition 3: the current player's hand exceeds 21
//condition 4: there is a tie
function end (condition) {
  document.getElementById('btnHitMe').disabled = true
  document.getElementById('btnStay').disabled = true

  playSound(2)

  if (condition != 3) {
    var winner = -1
    var score = 0

    for (var i = 0; i < players.length; i++) {
      //to settle ties
      if (players[0].Points === players[1].Points) {
        document.getElementById('status').innerHTML =
          'It is a tie!  Neither player wins.'
        condition = 4
        break
      }

      if (players[i].Points > score && players[i].Points < 22) {
        winner = i
      }
      score = players[i].Points
    }
    if (condition != 4) {
      document.getElementById('status').innerHTML =
        `Player ${players[winner].ID}` +
        (condition == 1 ? ' got a Blackjack! ' : "'s hand is higher.") +
        `  Player ${players[winner].ID} wins!`
    }
  }
}

function check () {
  if (players[currPlayer].Points == 21) {
    end(1)
  } else if (players[currPlayer].Points > 21) {
    document.getElementById('status').innerHTML =
      `Player ${players[currPlayer].ID}'s hand exceeds 21.  Player ` +
      (players[currPlayer].ID == 1 ? 2 : 1) +
      ' wins!'
    end(3)
  }
}

// function that plays a sound effect
function playSound (sound) {
  switch (sound) {
    case 1:
      var audio = new Audio('sounds/flip.wav')
      break
    case 2:
      var audio = new Audio('sounds/dingding.wav')
  }
  audio.play()
}

window.addEventListener('load', function () {
  createDeck(suitsB, deckB)
  shuffle(deckB)
  createDeck(suitsR, deckR)
  shuffle(deckR)
  createPlayers(1)
})
