const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
const playerCharacter = '8';
let gameEnd= false;

class Field {
    constructor(fieldArray){
        this.fieldArray = fieldArray;
    }

    print() {
        //console.log(this.fieldArray);
        this.fieldArray.forEach(function(row){
            console.log(row.join(''));
        });
    }

    static generateField(height, width, holePercent){
        let newField = [];
        //Generate Holes
        for (let i= 0; i < height; i++){
            let currRow = [];
            for (let j=0; j < width; j++){
                
                let isHole = Math.random();
                if (isHole < holePercent) {
                    currRow.push(hole);
                } else {
                    currRow.push(fieldCharacter);
                };
                
            }
            newField.push(currRow);

        };

        //Generate Hat
        let hatX;
        let hatY;
        do {
        hatX = Math.floor(Math.random()*width);
        hatY = Math.floor(Math.random()*height);
        } while (hatX ===0 && hatY===0);
        
        
        newField[hatY][hatX] = hat;

        //Generate Player

        newField[0][0] = playerCharacter;
        return newField;

    }

    cheater () {
        
        this.fieldArray.map(row =>{
            for (let i=0; i < row.length; i++){
                if (row[i]===hole){
                    row[i]=fieldCharacter;
                };
            };
               
            });
        
        
    }
}

let playerPosX= 0;
let playerPosY= 0;
const height = prompt ('How tall? ');
const width = prompt('How wide? ');
const holePercent = prompt('What percent of holes (as a decimal)? ');
const newGame = new Field(Field.generateField(height, width, holePercent));
newGame.print();
while (gameEnd===false){
//Ask for direction
let dir = prompt('Enter a direction: ');
//Change direction to uppercase (to standardize)
dir = dir.toUpperCase();
//Change current position to previous path character

newGame.fieldArray[playerPosY][playerPosX] = pathCharacter;
//Determine where player is moving to

if (dir === 'U'){
    playerPosY -= 1;
} else if (dir=== 'D') {
    playerPosY +=1;
} else if (dir === 'L') {
    playerPosX -= 1;
} else if (dir === 'R') {
    playerPosX += 1;
} else if (dir === 'CHEAT'){
    newGame.cheater();
    console.log('Cheatcode enabled, all holes filled!');
} else {
    console.log ('Wrong input, you lose!')
    gameEnd=true;
};

//For Debug 
//console.log('X is ' + playerPosX +' and Y is ' +playerPosY);
//console.log(newGame.fieldArray.length);



//Checks to see if they fell off the map
if (playerPosY < 0 || playerPosY >=newGame.fieldArray.length || playerPosX < 0 || playerPosX >= newGame.fieldArray[0].length){
    console.log('You fell off the map into eternity!');
    gameEnd = true;
};

if (!gameEnd){
if (newGame.fieldArray[playerPosY][playerPosX] === hole){
    console.log('You fell in a hole and died!');
    gameEnd=true;
};



//Check to see if they found the hat

if (newGame.fieldArray[playerPosY][playerPosX] === hat){
    console.log('You found the hat! Winner!');
    gameEnd = true;
};

//Move the player pawn
if (!gameEnd){
    newGame.fieldArray[playerPosY][playerPosX] = playerCharacter; 
}
}
//Print the map for the next iteration
newGame.print();
}