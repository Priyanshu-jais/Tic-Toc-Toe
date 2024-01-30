const boxes=document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn",".active");

let currentPlayer;
let gameGrid;
const winningPosition=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

// lets create a function to initialize the game
function initGame(){
    currentPlayer="x";
    gameGrid=["","","","","","","","",""];
    //UI pr empty bhi krna pdega
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `current Player  -${currentPlayer}`;
    //green color hta do.
   
}

initGame();

function swapTurn(){
    if(currentPlayer === "x"){
        currentPlayer= "0";
         gameInfo.innerText = `current Player -${currentPlayer}`;
    }
    else{
        currentPlayer= "x";
        gameInfo.innerText = `current Player -${currentPlayer}`;
    }
}
function cheakGameOver(){
//    newGameBtn.classList.add("active");
   let answer ="";
   winningPosition.forEach((position) => {
    //all 3 boxes should be non empty and exatly same in value.
     if((gameGrid[position[0]]!== "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !="")
     &&gameGrid[position[0]]===gameGrid[position[1]] && gameGrid[position[1]]===gameGrid[position[2]])
   {
    //cheak if winner is x.
     if(gameGrid[position[0]]==="x")
     answer="x";
    else
    answer="0";
//dissable pointer 
boxes.forEach((box) => {
    box.style.pointerEvents="none";
}) 
//now we know x/0 is a winner.
boxes[position[0]].classList.add("win");
boxes[position[1]].classList.add("win");
boxes[position[2]].classList.add("win");

   }
});
//it means we have a winner.
if(answer !== ""){
    gameInfo.innerText=`Winner Player -${answer}`;
    newGameBtn.classList.add("active");
    return;
}    
//lets cheak there is tied.
  let fillcount =0;
  gameGrid.forEach((box) =>{
    if(box!==""){
     fillcount++;
}
  });
  if(fillcount ===9){
    gameInfo.innerText="Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handleClick(index){
    if(gameGrid[index] === ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index]  = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap turn
        swapTurn();
        //Cheak koi jeet gya
        cheakGameOver();
    }
}
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click",initGame);
