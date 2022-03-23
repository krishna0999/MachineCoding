function ageInDays(){
    var ageYear = prompt("Write your birth year!");
    var countDays = (2021 - ageYear) * 365;
    var h1 = document.createElement('h1');
    h1.setAttribute('id','ageInDays');
    var textMessage = document.createTextNode('You are ' + countDays + 'days old.');
    h1.append(textMessage);
    document.getElementById('final-result').appendChild(h1);
    console.log(countDays);
}

function reset(){
    document.getElementById('ageInDays').remove();
}

function generateCats(){
    var image = document.createElement('img');
    var div = document.getElementById('cat-gen-div');
    image.src = "https://thecatapi.com/api/images/get?format=src&type=gif&size=small";
    div.appendChild(image);
}

function rpsGame(yourChoice){
    var humanChoice, botChoice;
    humanChoice = yourChoice.id;
    botChoice = getBotChoice();
    console.log(botChoice);
    results = getWinner(humanChoice, botChoice);
    console.log(results);
    message = giveMessage(results);
    console.log(message);
    rpsFrontend(humanChoice, botChoice, message);
}

function getBotChoice(){
    const pictures = ['rock', 'paper', 'scissor'];
    return pictures[Math.floor(Math.random() * 3)];
}

function getWinner(human, bot){
    var rpsDatabase = {
        'rock' : {'scissor' : 1, 'rock' : 0.5, 'paper' : 0},
        'paper' : {'rock' : 1, 'paper' : 0.5, 'scissor' : 0},
        'scissor' : {'paper' : 1, 'scissor' : 0.5, 'rock' : 0},
    }

    var humanScore = rpsDatabase[human][bot];
    var computerScore = rpsDatabase[bot][human];

    return [humanScore,computerScore];
}

function giveMessage([humanScore,computerScore]){
    if(humanScore === 0){
        return {'message' : 'You lost!', 'color' : 'red'};
    }else if(humanScore === 0.5){
        return {'message' : 'Match tied!', 'color' : 'yellow'};
    }else {
        return {'message' : 'You won!', 'color' : 'green'};
    }
}


function rpsFrontend(human, bot, messages){
    var imageDatabase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissor' : document.getElementById('scissor').src,
    }

    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();


    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[human] + "' style='box-shadow: 0px 10px 50px blue'>";
    messageDiv.innerHTML = "<h1 style='color: " + messages['color'] + "; font-size: 60px; padding: 30px; '>" + messages['message'] + "</h1>";
    botDiv.innerHTML = "<img src='" + imageDatabase[bot] + "' style='box-shadow: 0px 10px 50px red'>";


    document.getElementById('rps-div').appendChild(humanDiv);
    document.getElementById('rps-div').appendChild(messageDiv);
    document.getElementById('rps-div').appendChild(botDiv);
}

let allBtns = document.getElementsByTagName('button');
console.log(allBtns);

let copyBtns = [];
for (let i = 0; i < allBtns.length; i++) {
     copyBtns[i] = allBtns[i].classList[1];
}

function colorFunction(buttonchosen){
    if(buttonchosen.value === 'random'){
        randomColors();
    }else if(buttonchosen.value === 'red'){
        buttonsColorRed();
    }else if(buttonchosen.value === 'blue'){
        buttonsColorBlue()
    }else {
        resetColors();
    }
}

function randomColors(){
    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove(allBtns[i].classList[1]);
        allBtns[i].classList.add(random());
    }
}

function random(){
    return copyBtns[Math.floor(Math.random() * 4)];
}


function buttonsColorRed(){
    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove(allBtns[i].classList[1]);
        allBtns[i].classList.add('red');
    }
}


function buttonsColorBlue(){
    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove(allBtns[i].classList[1]);
        allBtns[i].classList.add('blue');
    }
}


function resetColors(){
    for (let i = 0; i < allBtns.length; i++) {
        allBtns[i].classList.remove(allBtns[i].classList[1]);
        allBtns[i].classList.add(copyBtns[i]);
    }
}


let blackjackGame = {
    'you' : {'scoreSpan' : '#your-score', 'div' : '.your-cards', 'score' : 0},
    'dealer' : {'scoreSpan' : '#dealer-score', 'div' : '.dealer-cards', 'score' : 0},
    'cards' : ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap' : {'2' : 2, '3' : 3, '4' : 4, '5' : 5, '6' : 6, '7' : 7, '8' : 8, '9' : 9, '10' : 10, 'K' : 10, 'Q' : 10, 'J' : 10, 'A' : [1,11]},
    'wins' : 0,
    'losses' : 0,
    'draws' : 0,
    'isStand' : false,
    'turnsOver': false,
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const swish = new Audio('sounds/swish.m4a');
const aww = new Audio('sounds/aww.mp3');
const cash = new Audio('sounds/cash.mp3');


//Hit button clicked...
function showCards(){
    if(blackjackGame['isStand'] === false){
        showCard();
    }
}

//Sleep function to move the cards slowly for the dealer
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve,ms));
}

//Stand button clicked...
async function standDeclare(){
    blackjackGame['isStand'] = true;
    while(DEALER['score'] < 16 && blackjackGame['isStand'] == true){
        standFun();
        await sleep(1000);
    }

        blackjackGame['turnsOver'] = true;
        let winner = decideWinner();
        showResult(winner);
}


//Deal button clicked...
function breakDeal(){
    if(blackjackGame['turnsOver']){
        blackjackGame['isStand'] = false;
        deleteImages();
        deleteText();
        YOU['score'] = 0;
        DEALER['score'] = 0;
        document.querySelector(YOU['scoreSpan']).style.color = 'white'
        document.querySelector(DEALER['scoreSpan']).style.color = 'white'
        document.querySelector('#play-text').textContent = "Let's Play";
        document.querySelector('#play-text').style.color = 'black';
    }

    blackjackGame['turnsOver'] = false;
}

// Display cards on the table for the dealer
function standFun(){
    if(DEALER['score'] <= 21){
        let image = blackjackGame['cards'][Math.floor(Math.random() * 13)];
        let img = document.createElement('img');
        img.setAttribute('id','imageCard');
        img.src = `images/${image}.png`;
        document.querySelector(DEALER['div']).appendChild(img);
        swish.play();
        changeSpan(image,DEALER);
    }
}


// Display cards on the table for you
function showCard(){
    if(YOU['score'] <= 21){
        let image = blackjackGame['cards'][Math.floor(Math.random() * 13)];
        let img = document.createElement('img');
        img.setAttribute('id','imageCard');
        img.src = `images/${image}.png`;
        document.querySelector(YOU['div']).appendChild(img);
        swish.play();
        changeSpan(image, YOU);
 }
}


// Delete all the images from both sides of table
function deleteImages(){
    let allImages = document.querySelector('.your-cards').querySelectorAll('img');
    for (let i = 0; i < allImages.length; i++) {
        allImages[i].remove();
    }

    let allImages2 = document.querySelector('.dealer-cards').querySelectorAll('img');
    for (let i = 0; i < allImages2.length; i++) {
        allImages2[i].remove();
    }
}


// Set the score text back to 0 for another game
function deleteText(){
    document.querySelector('#your-score').innerHTML = '0';
    document.querySelector('#dealer-score').innerHTML = '0';
}


// Change the score everytime any card is displayed
function changeSpan(number, currentPlayer){
    if(number === 'A'){
        if(currentPlayer['score'] + blackjackGame['cardsMap'][number][1] <= 21){
            currentPlayer['score'] += blackjackGame['cardsMap'][number][1];
        }else {
            currentPlayer['score'] += blackjackGame['cardsMap'][number][0];
        }
    }
    else {
        currentPlayer['score'] += blackjackGame['cardsMap'][number];
    }

    if(currentPlayer['score'] > 21){
        document.querySelector(currentPlayer['scoreSpan']).textContent = 'BUSTED!'
        document.querySelector(currentPlayer['scoreSpan']).style.color = 'red'
    }else {
        document.querySelector(currentPlayer['scoreSpan']).innerHTML = currentPlayer['score'];
    }
    console.log(currentPlayer['score']);
}

function decideWinner(){
    let winner;
    if(YOU['score'] <= 21){
        if(YOU['score'] > DEALER['score'] || DEALER['score'] > 21){
            blackjackGame['wins']++;
            winner = YOU;
        }else if(YOU['score'] < DEALER['score'] && DEALER['score'] <= 21){
            blackjackGame['losses']++;
            winner = DEALER;
        }else if(YOU['score'] === DEALER['score']){
            blackjackGame['draws']++;
            winner = undefined;
        }
    }else if(YOU['score'] > 21 && DEALER['score'] <= 21){
        blackjackGame['losses']++;
        winner = DEALER;
    }else if(YOU['score'] > 21 && DEALER['score'] > 21){
        blackjackGame['draws']++;
        winner = undefined;
    }

    console.log('Winner is ', winner);
    return winner;
}


function showResult(winner){
    let message, messageColor;

    if(blackjackGame['turnsOver']){
    if(winner === YOU){
        document.querySelector('#wins-score').textContent = blackjackGame['wins'];
        message = 'You Won!';
        messageColor = 'green';
        cash.play();
    }else if(winner === DEALER){
        document.querySelector('#losses-score').textContent = blackjackGame['losses'];
        message = 'You Lost!';
        messageColor = 'red';
        aww.play();
    }else {
        document.querySelector('#draws-score').textContent = blackjackGame['draws'];
        message = 'You Drew!';
        messageColor = 'black';
    }


    document.querySelector('#play-text').textContent = message;
    document.querySelector('#play-text').style.color = messageColor;
  }
}