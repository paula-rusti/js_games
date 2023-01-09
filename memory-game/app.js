//12 cards, 2 matching each time
const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())               // randomly shuffle the elements of the array
const gridDisplay = document.querySelector('#grid')      // scans the whole doc for an elemnt with the id=grid

function createBoard() {
    // create a dom element of type image for each card
    cardArray.forEach( (el, index) => {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute("data-id", index)
        card.addEventListener('click', flipCard)
        console.log(card, index)
        gridDisplay.appendChild(card)
    } )
}

function flipAllCards() {
    let cards = document.querySelectorAll('img')
    cards.forEach( (element, index) => {
        element.setAttribute('src', cardArray[index]['img'])
        console.log(`setting image attribute to ${cardArray[index]['img']}` )
    } )
}

createBoard()

// flipAllCards()

let chosenCards = []        // array with the names of the cards
let chosenCardsIds = []   // array with the ids of the cards
let score = 0

function checkMatch() {
    const cards = document.querySelectorAll('img')
    if (chosenCards[0] === chosenCards[1])
    {
        alert("Match found")
        cards.forEach((e) => {
            if (e.getAttribute('data-id') === chosenCardsIds[1])
            {
                e.setAttribute('src', "images/white.png")
            }
        })
    } else {
        cards.forEach((e) => {
            if (e.getAttribute('data-id') === chosenCardsIds[1] ||
                e.getAttribute('data-id') === chosenCardsIds[0])
            {
                e.setAttribute('src', "images/blank.png")
            }
        })
    }

    // final step
    chosenCards.shift()     // remove first element of array
    chosenCardsIds.shift()
}

function isMatch() {
    const cards = document.querySelectorAll('img')
    alert("Match found")
    cards.forEach((e) => {
        if (e.getAttribute('data-id') === chosenCardsIds[chosenCardsIds.length-1])
        {
            e.setAttribute('src', "images/white.png")
            e.style.pointerEvents = "none"
        }
    })
    // pop the elements from the 2 arrays
    chosenCards.pop()
    chosenCardsIds.pop()
}

function unflip_both() {
    const cards = document.querySelectorAll('img');
    cards.forEach((element, index) => {
        if (element.getAttribute("data-id") === chosenCardsIds[chosenCardsIds.length-1] ||
            element.getAttribute("data-id") === chosenCardsIds[chosenCardsIds.length-2]) {
            element.setAttribute('src', "images/blank.png")
        }
    })
    chosenCards = []
    chosenCardsIds = []
}


function flipCard() {
    const cards = document.querySelectorAll('img');     // get all card from the image

    const cardId = this.getAttribute('data-id')
    const cardName = cardArray[cardId]['name']
    const cardSrc = cardArray[cardId]['img']

    chosenCardsIds.push(cardId)
    chosenCards.push(cardName)
    console.log(`clicked card with id:  ${cardId}, name: ${cardName}, source: ${cardSrc}`)

    this.setAttribute('src', cardSrc)
    //
    if (chosenCards.length >= 2) {
        if (chosenCards[chosenCards.length-1] === chosenCards[chosenCards.length-2]
            && chosenCardsIds[chosenCards.length-1] !== chosenCardsIds[chosenCards.length-2]) {
            score ++
            document.getElementById("result").innerHTML = score.toString()
            setTimeout(isMatch, 500)
        } else {
            // unflip both
            setTimeout(unflip_both, 500)

        }
    }
}