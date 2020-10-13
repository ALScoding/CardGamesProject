var suitsB = ["Clubs", "Spades"];
var suitsR = ["Hearts", "Diamonds"];
var values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
var deckB = new Array(); //black deck
var deckR = new Array(); //red deck
var players = new Array();
var currentPlayer = 0;

function createDeck(suits, deck) {
    //deck = new Array() remove this
    console.log(values.length + " " + suits.length)

    for (var i = 0; i < values.length; i++) {
        for (var x = 0; x < suits.length; x++) {
            var weight = parseInt(values[i]);
            if (values[i] == "J" || values[i] == "Q" || values[i] == "K")
                weight = 10;
            if (values[i] == "A")
                weight = 11;
            var card = {
                Weight: weight,
                Value: values[i],
                Suit: suits[x],
                Img: 'cards_png/' + values[i].charAt(0) + (values[i] == '10' ? '0' : '') + suits[x].charAt(0) + '.png'
            };
            deck.push(card);
            console.log(card);
        }
    }
}

function createPlayers(num) {
    players = new Array();
    for (var i = 1; i <= num; i++) {
        var hand = new Array();
        var player = {
            Name: 'Player ' + i,
            ID: i,
            Points: 0,
            Hand: hand
        };
        players.push(player);
    }
}

function createPlayersUI() {
    document.getElementById('players').innerHTML = '';
    for (var i = 0; i < players.length; i++) {
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}

function shuffle(deck) {
    // for 500 turns
    // switch the values of two random cards
    for (var i = 0; i < 500; i++) {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startblackjack() {
    if (document.getElementById('btnStart').value = 'Restart') {
        deckB = new Array()
        deckR = new Array()
    }
    document.getElementById("status").style.display = "none";
    // deal 2 cards to every player object
    currentPlayer = 0;
    createDeck(suitsB, deckB);
    shuffle(deckB);
    createDeck(suitsR, deckR);
    shuffle(deckR);
    createPlayers(2);
    createPlayersUI();
    dealHands(deckB, 0);
    dealHands(deckR, 1);
    document.getElementById('player_' + parseInt(currentPlayer)).classList.add('active');
}

function dealHands(deck, plyr) {
    // alternate handing cards to each player
    // 2 cards each
    for (var i = 0; i < 2; i++) {
        //    for (var x = 0; x < players.length; x++) {
        var card = deck.pop();
        players[plyr].Hand.push(card);
        renderCard(card, plyr);
        updatePoints();
        //    }
    }
    updateDeck(deck);
}

function renderCard(card, player) {
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

function getCardUI(card) {
    var el = document.createElement("IMG");
    el.setAttribute("src", card.Img);
    el.setAttribute("width", "86.5");
    el.setAttribute("height", "132");
    el.setAttribute("alt", "The " + card.Value + " of " + card.Suit);
    document.body.appendChild(el);
    return el;
}

// returns the number of points that a player has in hand
function getPoints(player) {
    var points = 0;
    for (var i = 0; i < players[player].Hand.length; i++) {
        points += players[player].Hand[i].Weight;
    }
    if (points > 21) {
        for (var i = 0; i < players[player].Hand.length; i++) {
            //if player hand contains A and points > 21 then -10 points
            if (players[player].Hand[i].Value.includes("A")) {
                //console.log('Player ' + (player + 1) + '\'s ace value changed to 1')
                points -= 10;
            }
        }
    }
    players[player].Points = points;
    return points;
}

function updatePoints() {
    for (var i = 0; i < players.length; i++) {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}

function hitMe() {
    // pop a card from the deck to the current player
    // check if current player new points are over 21
    var card = (currentPlayer === 0 ? deckB.pop() : deckR.pop());
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    check();
}

function stay() {
    // move on to next player, if any
    if (currentPlayer != players.length - 1) {
        document.getElementById('player_' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('player_' + currentPlayer).classList.add('active');
    } else {
        end();
    }
}

function end() {
    var winner = -1;
    var score = 0;

    for (var i = 0; i < players.length; i++) {
        if (players[i].Points > score && players[i].Points < 22) {
            winner = i;
        }
        score = players[i].Points;
    }

    document.getElementById('status').innerHTML = 'Winner: Player ' + players[winner].ID;
}

function check() {
    if (players[currentPlayer].Points > 21) {
        document.getElementById('status').innerHTML = 'Player: ' + players[currentPlayer].ID + ' LOST';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
}

function updateDeck(deck) {
    document.getElementById('deckcount').innerHTML = deck.length;
}

window.addEventListener('load', function () {
    createDeck(suitsB, deckB);
    shuffle(deckB);
    createDeck(suitsR, deckR);
    shuffle(deckR);
    createPlayers(1);
});