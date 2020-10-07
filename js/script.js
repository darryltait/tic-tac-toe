/*----- constants -----*/
// Model

const COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const LOOKUP = {
  1: "X",
  "-1": "O",
  null: "",
};

/*----- app's state (variables) -----*/
// Model

let turn, winner, gameboard;

/*----- cached element references -----*/

// View (technically)

const $gameboardEl = $("#gameboard");
const $squareEls = $(".square");
const $buttonEl = $("#reset-btn");
const $messageEl = $("#message");

/*----- event listeners -----*/

// Controller

$gameboardEl.on("click", handleMove);
$buttonEl.on("click", handleInit);

/*----- functions -----*/
// Controller

// start the game once the browser loads
handleInit();

function handleInit() {
  // alert("the game was reset");
  // this function will do 2 things
  // 1 start the game
  // a) create an empty gameboard
  //gameboard = new Array(9).fill().map(() => null);
  gameboard = [null, null, null, null, null, null, null, null, null];
  // b) assign the turn - player 1 goes first - X goes
  turn = 1;
  // c) set winner to false
  winner = false;
  // d) visualize the state of the game to the DOM - render()
  render();
  // 2 reset the game
}

function handleMove(evt) {
  //alert("an element inside gameboard was clicked");
  //console.log(evt.target.dataset.index);
  const position = evt.target.dataset.index;
  // check to see if the box has already been chosen
  if (winner || gameboard[position]) {
    // could have said gameboard[position] !== null
    return; // stop running this function
  }

  gameboard[position] = turn;

  // check to see if we have a winner
  winner = checkWinner();
  turn *= -1;
  render();
}

function render() {
  // render is going to look at the gameboard array
  gameboard.forEach(function (value, index) {
    $($squareEls[index]).text(LOOKUP[value]);
  });
  // render will also update our message based on the turn or if we won
  if (!winner) {
    $messageEl.text(`It's Player ${LOOKUP[turn]}'s Turn`);
  } else if (winner === "T") {
    $messageEl.text("Tie Game");
  } else {
    $messageEl.text(`Congratulations ${LOOKUP[winner]} Wins!`);
  }
}

function checkWinner() {
  // compare positions of the players pieces (1 or -1) in the combos array
  for (let i = 0; i < COMBOS.length; i++) {
    if (
      Math.abs(
        gameboard[COMBOS[i][0]] +
          gameboard[COMBOS[i][1]] +
          gameboard[COMBOS[i][2]]
      ) === 3
    ) {
      return gameboard[COMBOS[i][0]];
    }
  }
  if (gameboard.includes(null)) return false;
  return "T";
}
