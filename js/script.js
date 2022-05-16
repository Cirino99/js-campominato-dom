/*
    js campo minato
*/

// seleziono elementi html
const livello = document.getElementById('livello');
const button = document.getElementById('play-button');
const gridGame = document.getElementById('game');

// inizio gioco
var myArrRandom;
button.addEventListener('click',
    function(){
        myArrRandom = [];
        gridGame.innerHTML = '';
        let difficoltà = parseInt(livello.value);
        let classeDiff;
        if(difficoltà===1){
            myArrRandom = arrayRandomUniqueNum(100,1,100);
            classeDiff = 'square-1';
        } else if(difficoltà===2){
            myArrRandom = arrayRandomUniqueNum(81,1,81);
            classeDiff = 'square-2';
        } else {
            myArrRandom = arrayRandomUniqueNum(49,1,49);
            classeDiff = 'square-3';
        }
        for (let i=0; i<myArrRandom.length; i++){
            const divEl = createMyElement(classeDiff);
            let arrItem = myArrRandom[i];
            divEl.append(arrItem);
            divEl.addEventListener('click',
                function(){
                    this.classList.add('active');
                }
            );
            gridGame.append(divEl);
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