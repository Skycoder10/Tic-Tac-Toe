const element=document.querySelectorAll(".cell")
const O_class="O";
const X_class="X";
const y=document.getElementById('tic');
let currentTurn;
const winning_combination=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
const winningmessege=document.getElementById('showmessege');
const winningmessegelement=document.querySelector('[text-messege]');
const restart=document.getElementById('restartagain');

startthegame();

restart.addEventListener('click',startthegame);

function startthegame()
{
    currentTurn=false;
    element.forEach(x=>{
        x.classList.remove(X_class);
        x.classList.remove(O_class);
        x.removeEventListener('click',iclicked)
        x.addEventListener('click',iclicked,{once:true})
    });
    setnexthoversymbol();
    winningmessege.classList.remove('show')
}
function iclicked(e)
{
    const x=e.target;
    const currentsymbol=currentTurn? O_class : X_class;
    putmark(x,currentsymbol)
    if(iswin(currentsymbol))
    {
        endgame(false);
    }
    else if(isdraw()){
        endgame(true);
    }
    else{
        swapper();
        setnexthoversymbol();
    }
}
function endgame(value)
{
    if(value){
        winningmessegelement.innerText="IT'S A DRAW!";
    }
    else{
        winningmessegelement.innerText=`${currentTurn?" 'O'":"'X'"} PLAYER WINS!`;
    }
    winningmessege.classList.add('show');
}
function isdraw()
{
    var count=0;
    for(let i=0;i<9;i++)
    {
        if(element[i].classList.contains(X_class) || element[i].classList.contains(O_class))
        {
            count++;
        }
    }
    if(count==9)
        return true;
    else
        return false;
}

function putmark(x,currentsymbol)
{
    x.classList.add(currentsymbol);
}
function swapper()
{
    currentTurn=!currentTurn;
}
function setnexthoversymbol()
{
    y.classList.remove(X_class);
    y.classList.remove(O_class);
    if(currentTurn)
    {
        y.classList.add(O_class)
    }
    else{
        y.classList.add(X_class)
    }

}
function iswin(currentsymbol)
{
    for(let i=0;i<8;i++)
    {
        let count=0;
        for(let j=0;j<3;j++)
        {
            if(element[winning_combination[i][j]].classList.contains(currentsymbol))
            {
                count++;
            }
        }
        if(count==3)
            return true;

    }
    return false;
    
}
