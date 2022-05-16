/*
    js campo minato
*/

// seleziono elementi html
const livello = document.getElementById('livello');
const button = document.getElementById('play-button');
const gridGame = document.getElementById('game');
const risultato = document.getElementById('risultato');

// inizio gioco
var myArrRandom;
var myArrDivEl = [];
button.addEventListener('click',
    function(){
        myArrRandom = [];
        gridGame.innerHTML = '';
        gridGame.className = '';
        risultato.innerText = '';
        risultato.className ='d-none';
        let difficoltà = parseInt(livello.value);
        let classeDiff;
        let bombeArr = [];
        let conterPunti = 0;
        let maxPunti;
        let numberSquare;
        if(difficoltà===1){
            numberSquare = 100;
            classeDiff = 'square-1';
            maxPunti = 84;
        } else if(difficoltà===2){
            numberSquare = 81;
            classeDiff = 'square-2';
            maxPunti = 65;
        } else {
            numberSquare = 49;
            classeDiff = 'square-3';
            maxPunti = 33;
        }
        myArrRandom = arrayRandomUniqueNum(numberSquare,1,numberSquare);
        bombeArr = arrayRandomUniqueNum(16,1,numberSquare);
        for (let i=0; i<myArrRandom.length; i++){
            myArrDivEl[i] = createMyElement(classeDiff);
            let arrItem = myArrRandom[i];
            myArrDivEl[i].append(arrItem);
            myArrDivEl[i].addEventListener('click',
                function(){
                    if(bombeArr.includes(arrItem)){
                        this.classList.add('active-bomb');  
                        gridGame.className = 'disable';
                        risultato.className = '';
                        risultato.innerHTML = `<h4>Hai preso una bomba!!! Il tuo punteggio finale è ${conterPunti}</h4>`;
                        stampaBombe(bombeArr,numberSquare);

                    } else {
                        this.classList.add('active');
                        conterPunti++;
                        if (conterPunti===maxPunti){
                            gridGame.className = 'disable';
                            risultato.className = '';
                            risultato.innerHTML = `<h4>Complimenti hai vinto!!!</h4>`;
                            stampaBombe(bombeArr,numberSquare);
                        }
                    }
                }
            );
            gridGame.append(myArrDivEl[i]);
        }
    }
);

//funzioni gioco
const createMyElement = (classAdd) => {
    const node = document.createElement('div');
    node.classList.add('square');
    node.classList.add(classAdd);
    return node;
}

function stampaBombe(arrBombe,max){
    for (let i=0; i<max; i++){
        if(arrBombe.includes(parseInt(myArrDivEl[i].innerText))){
            console.log(myArrDivEl[i].innerText);
            myArrDivEl[i].classList.add('active-bomb');
        }
    }
}

//funzioni generiche
function arrayRandomUniqueNum(numItems,min,max){
    const arrInt = [];
    while(arrInt.length<numItems){
        let randNumInt = numeroRandom(min,max);
        if(!arrInt.includes(randNumInt)){
            arrInt.push(randNumInt);
        }
    }
    return arrInt;
}

function numeroRandom (min,max){
    let numero = Math.floor(Math.random() * (max-min+1) + min);
    return numero;
}