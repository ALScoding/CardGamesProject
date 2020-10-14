// color of suits is determined by user input
const chooseColor = document.querySelector('#chooseColor')
chooseColor.onclick = function () {
  const rbs = document.querySelectorAll('input[name="choice"]')
  let selectedValue, choice
  for (const rb of rbs) {
    if (rb.checked) {
      selectedValue = rb.value
      break
    }
  }

  switch (parseInt(selectedValue)) {
    case 1:
      choice = 'black'
      break
    case 2:
      choice = 'red'
      break
    case 3:
      choice = 'random'
      break
    default:
      choice = 'none'
      alert('You did not choose a color!')
  }
  var queryString = '?' + choice
  if (choice != 'none') {
    window.location.href = 'memory.html' + queryString
  }
}

var queryString2 = decodeURIComponent(window.location.search)
queryString2 = queryString2.substring(1)
var queries = queryString2.split('&')

var username
// saves inputted username
function saveName () {
  var txtname = document.getElementById('uname')
  username = txtname.value
  if (username) {
    alert('Your name ' + username + ' was saved.')
  }
}

//prompt if no username is inputted
function noName () {
  var yourname = prompt('Please submit your name:')
  if (yourname == null || yourname == '') {
    noName()
  } else {
    username = yourname
  }
}

//deck does not include aces in this game
var suitsB = ['Clubs', 'Spades']
var suitsR = ['Hearts', 'Diamonds']
var values = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King'
]
var deck = new Array()

function createDeck (suits) {
  deck = new Array()
  for (var i = 0; i < values.length; i++) {
    for (var x = 0; x < suits.length; x++) {
      var card = {
        Name: values[i] + ' of ' + suits[x],
        Facevalue: values[i],
        Img:
          'cards_png/' +
          values[i].charAt(0) +
          (values[i] == '10' ? '0' : '') +
          suits[x].charAt(0) +
          '.png'
      }
      deck.push(card)
      //console.log(card)
    }
  }
  return deck
}
//*******************************************************//

let gameGrid,
  message1,
  message2,
  backcolor,
  chosencolor = queries[0]

//show username input field
var x = document.getElementById('yourName')
if (chosencolor) {
  x.style.display = 'block'
}
// set up the grid, add card suits with the same color,
// message that mentions the color, and back color
if (chosencolor == 'random') {
  chosencolor = Math.round(Math.random()) == 0 ? 'black' : 'red'
}

if (chosencolor == 'black') {
  gameGrid = createDeck(suitsB)
  message1 = 'Match the black cards!'
  message2 = 'Attempts: 0'
  backcolor = `url('cards_png/gray_back.png')`
} else if (chosencolor == 'red') {
  gameGrid = createDeck(suitsR)
  message1 = 'Match the red cards!'
  message2 = 'Attempts: 0'
  backcolor = `url('cards_png/red_back.png')`
} else {
  message1 = 'Please select a card color before you begin'
  document.getElementById('message').style.color = 'gold'
}
console.log(message1)
document.getElementById('message').innerHTML = message1
if (message2) {
  document.getElementById('attempts').innerHTML = message2
}

// text color is also changed
if (chosencolor) {
  document.getElementById('message').style.color = chosencolor
  document.getElementById('attempts').style.color = chosencolor
}
// randomize the game grid on each refresh
gameGrid.sort(() => 0.5 - Math.random())

let firstGuess = '',
  secondGuess = '',
  count = 0,
  pairs = 0,
  attempts = 0, //accessed from leaderboard.js ?
  previousTarget = null,
  delay = 750

// grab the div with an id of game
const game = document.getElementById('game')

// create a section with a class of grid
const grid = document.createElement('section')
grid.setAttribute('class', 'grid')

// append the grid section to the game div
game.appendChild(grid)

// for each item in the deck arrays...
gameGrid.forEach(item => {
  // create card element with the name dataset
  const card = document.createElement('div')
  card.classList.add('card')
  card.dataset.Name = item.Name

  // create back of card
  const back = document.createElement('div')
  back.classList.add('back')
  back.style.backgroundImage = backcolor

  // apply a card class to that div
  card.classList.add('card')

  // set the data-name attribute of the div to the deck name
  card.dataset.Name = item.Name
  card.dataset.Facevalue = item.Facevalue

  // create front of card, which contains the image
  const front = document.createElement('div')
  front.classList.add('front')
  front.style.backgroundImage = `url(${item.Img})`

  // append card to grid, and back and front to each card
  grid.appendChild(card)
  card.appendChild(back)
  card.appendChild(front)
})

// whenever the selected cards share the same value
const match = () => {
  var selected = document.querySelectorAll('.selected')

  // back of cards will become green and cannot be flipped over again
  selected.forEach(card => {
    card.classList.add('match')
    var innerContent = card.innerHTML
    card.innerHTML =
      chosencolor === 'red'
        ? innerContent.replace('red_back.png', 'green_back.png')
        : innerContent.replace('gray_back.png', 'green_back.png')
  })

  // increment pairs and mention in console
  pairs++
  console.log(
    "The face values match. That's " +
      pairs +
      ' pair' +
      (pairs > 1 ? 's' : '') +
      '!'
  )
  // change messages and text color when all 12 pairs are found
  if (pairs === 12) {
    document.getElementById('message').innerHTML = 'You Finished!'
    document.getElementById('message').style.color = 'gold'
    document.getElementById('attempts').style.color = 'gold'
    playSound(3)

    //send over the # of attempts

    //export attempts something

    //page changes after 4 seconds
    setTimeout(() => {
      if (username === undefined) {
        noName()
      }
      var queryString3 = '?' + username + '&' + attempts
      window.location.href = 'leaderboard.html' + queryString3
    }, 4000)
  }
}

// code always executes after two cards are chosen
const resetGuesses = () => {
  // reset guesses and count, increment attempts
  ;(firstGuess = ''),
    (secondGuess = ''),
    (count = 0),
    (previousTarget = null),
    attempts++

  // unselect cards
  var selected = document.querySelectorAll('.selected')
  selected.forEach(card => {
    card.classList.remove('selected')
  })

  // update the attempts number
  document.getElementById('attempts').innerHTML = 'Attempts: ' + attempts

  console.log('')
}

// function that plays a sound effect
function playSound (sound) {
  switch (sound) {
    case 1:
      var audio = new Audio('sounds/flip.wav')
      break
    case 2:
      var audio = new Audio('sounds/matched.wav')
      break
    case 3:
      var audio = new Audio('sounds/tada.wav')
  }
  audio.play()
}

// add event listener to grid
grid.addEventListener('click', event => {
  const clicked = event.target

  // invalid clicks
  if (
    clicked.nodeName === 'section' ||
    clicked === previousTarget ||
    clicked.parentNode.dataset.Name === undefined ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return
  }

  // flipping card sound whenever click is valid
  playSound(1)

  if (count < 2) {
    count++
    // assign the guess, using the face value
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.Facevalue
    } else {
      secondGuess = clicked.parentNode.dataset.Facevalue
    }
    // name of card is mentioned in console
    // selected card cannot be selected again
    console.log('The ' + clicked.parentNode.dataset.Name + ' was selected.')
    clicked.parentNode.classList.add('selected')

    // if both guesses are not empty...
    if (firstGuess !== '' && secondGuess !== '') {
      // and the first guess matches the second guess...
      if (firstGuess === secondGuess) {
        playSound(2)
        // there is a brief delay before cards are flipped over again
        setTimeout(match, delay)
        setTimeout(resetGuesses, delay)
      } else {
        setTimeout(resetGuesses, delay)
      }
    }
  }
})
