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

function createDeck (color) {
  var deck = new Array()

  var suits = color == 1 ? suitsB : suitsR

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
    }
  }
  return deck
}

// expected output of createDeck function when argument is 0
const redDeck = [
  { Facevalue: '2', Img: 'cards_png/2H.png', Name: '2 of Hearts' },
  { Facevalue: '2', Img: 'cards_png/2D.png', Name: '2 of Diamonds' },
  { Facevalue: '3', Img: 'cards_png/3H.png', Name: '3 of Hearts' },
  { Facevalue: '3', Img: 'cards_png/3D.png', Name: '3 of Diamonds' },
  { Facevalue: '4', Img: 'cards_png/4H.png', Name: '4 of Hearts' },
  { Facevalue: '4', Img: 'cards_png/4D.png', Name: '4 of Diamonds' },
  { Facevalue: '5', Img: 'cards_png/5H.png', Name: '5 of Hearts' },
  { Facevalue: '5', Img: 'cards_png/5D.png', Name: '5 of Diamonds' },
  { Facevalue: '6', Img: 'cards_png/6H.png', Name: '6 of Hearts' },
  { Facevalue: '6', Img: 'cards_png/6D.png', Name: '6 of Diamonds' },
  { Facevalue: '7', Img: 'cards_png/7H.png', Name: '7 of Hearts' },
  { Facevalue: '7', Img: 'cards_png/7D.png', Name: '7 of Diamonds' },
  { Facevalue: '8', Img: 'cards_png/8H.png', Name: '8 of Hearts' },
  { Facevalue: '8', Img: 'cards_png/8D.png', Name: '8 of Diamonds' },
  { Facevalue: '9', Img: 'cards_png/9H.png', Name: '9 of Hearts' },
  { Facevalue: '9', Img: 'cards_png/9D.png', Name: '9 of Diamonds' },
  { Facevalue: '10', Img: 'cards_png/10H.png', Name: '10 of Hearts' },
  { Facevalue: '10', Img: 'cards_png/10D.png', Name: '10 of Diamonds' },
  { Facevalue: 'Jack', Img: 'cards_png/JH.png', Name: 'Jack of Hearts' },
  { Facevalue: 'Jack', Img: 'cards_png/JD.png', Name: 'Jack of Diamonds' },
  { Facevalue: 'Queen', Img: 'cards_png/QH.png', Name: 'Queen of Hearts' },
  { Facevalue: 'Queen', Img: 'cards_png/QD.png', Name: 'Queen of Diamonds' },
  { Facevalue: 'King', Img: 'cards_png/KH.png', Name: 'King of Hearts' },
  { Facevalue: 'King', Img: 'cards_png/KD.png', Name: 'King of Diamonds' }
]

// expected output of createDeck function when argument is 1
const blackDeck = [
  { Facevalue: '2', Img: 'cards_png/2C.png', Name: '2 of Clubs' },
  { Facevalue: '2', Img: 'cards_png/2S.png', Name: '2 of Spades' },
  { Facevalue: '3', Img: 'cards_png/3C.png', Name: '3 of Clubs' },
  { Facevalue: '3', Img: 'cards_png/3S.png', Name: '3 of Spades' },
  { Facevalue: '4', Img: 'cards_png/4C.png', Name: '4 of Clubs' },
  { Facevalue: '4', Img: 'cards_png/4S.png', Name: '4 of Spades' },
  { Facevalue: '5', Img: 'cards_png/5C.png', Name: '5 of Clubs' },
  { Facevalue: '5', Img: 'cards_png/5S.png', Name: '5 of Spades' },
  { Facevalue: '6', Img: 'cards_png/6C.png', Name: '6 of Clubs' },
  { Facevalue: '6', Img: 'cards_png/6S.png', Name: '6 of Spades' },
  { Facevalue: '7', Img: 'cards_png/7C.png', Name: '7 of Clubs' },
  { Facevalue: '7', Img: 'cards_png/7S.png', Name: '7 of Spades' },
  { Facevalue: '8', Img: 'cards_png/8C.png', Name: '8 of Clubs' },
  { Facevalue: '8', Img: 'cards_png/8S.png', Name: '8 of Spades' },
  { Facevalue: '9', Img: 'cards_png/9C.png', Name: '9 of Clubs' },
  { Facevalue: '9', Img: 'cards_png/9S.png', Name: '9 of Spades' },
  { Facevalue: '10', Img: 'cards_png/10C.png', Name: '10 of Clubs' },
  { Facevalue: '10', Img: 'cards_png/10S.png', Name: '10 of Spades' },
  { Facevalue: 'Jack', Img: 'cards_png/JC.png', Name: 'Jack of Clubs' },
  { Facevalue: 'Jack', Img: 'cards_png/JS.png', Name: 'Jack of Spades' },
  { Facevalue: 'Queen', Img: 'cards_png/QC.png', Name: 'Queen of Clubs' },
  { Facevalue: 'Queen', Img: 'cards_png/QS.png', Name: 'Queen of Spades' },
  { Facevalue: 'King', Img: 'cards_png/KC.png', Name: 'King of Clubs' },
  { Facevalue: 'King', Img: 'cards_png/KS.png', Name: 'King of Spades' }
]

// testing createDeck function
describe('creating deck', () => {
  it('tests the output of create deck', () => {
    // test red deck
    const result1 = createDeck(0)
    expect(result1).toStrictEqual(redDeck)

    // test black deck
    const result2 = createDeck(1)
    expect(result2).toStrictEqual(blackDeck)
  })
})
