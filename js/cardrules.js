const numMap = new Map([
  [1, 'One'],
  [2, 'Two'],
  [3, 'Three'],
  [4, 'Four'],
  [5, 'Five'],
  [6, 'Six'],
  [7, 'Seven'],
  [8, 'Eight'],
  [9, 'Nine'],
  [10, 'Ten']
])

//for each Collapsible Group Item
$('.card1').on('click', cardImage(2))
$('.card2').on('click', cardImage(3))
$('.card3').on('click', cardImage(4))
$('.card4').on('click', cardImage(5))
$('.card5').on('click', cardImage(6))
$('.card6').on('click', cardImage(7))
$('.card7').on('click', cardImage(8))
$('.card8').on('click', cardImage(9))
$('.card9').on('click', cardImage(10))
$('.card10').on('click', cardImage(11))

for (i = 1; i < 11; i++) {
  $('.card-link-' + i).append(
    'Which playing cards have a value of ' + (i + 1) + '?'
  )
  $('.card-link-' + i).css('color', 'white')
}

function cardImage (num) {
  $('#collapse' + numMap.get(num - 1)).append(
    num == 11
      ? "Normally Aces have a value of 11, but the value <br> may change to 1 if the player's score exceeds 21: <br>"
      : 'The following cards have a value of ' + num + ': <br>'
  )

  let suits = ['C', 'S', 'H', 'D']

  if (num == 10) {
    let faces = ['10', 'J', 'Q', 'K']
    for (j = 0; j < faces.length; j++) {
      if (j == 2) {
        $('#collapseNine').append('<br>')
      }
      for (i = 0; i < suits.length; i++) {
        let image = document.createElement('img')
        image.src = 'cards_png/' + faces[j] + suits[i] + '.png'
        image.setAttribute('width', '86.5')
        image.setAttribute('height', '132')
        $('#collapseNine').append(image)
      }
    }
  } else {
    for (i = 0; i < suits.length; i++) {
      let image = document.createElement('img')
      image.src = 'cards_png/' + (num == 11 ? 'A' : num) + suits[i] + '.png'
      image.setAttribute('width', '86.5')
      image.setAttribute('height', '132')
      $('#collapse' + numMap.get(num - 1)).append(image)
    }
  }
}
