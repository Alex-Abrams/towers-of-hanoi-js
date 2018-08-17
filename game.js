// const readline = require("readline");
//
// const reader = readline.createInterface ({
//   input: process.stdin,
//   output: process.stdout
// });



class Game {
  constructor() {
    //towers array prefilled
    this.towers = [[3, 2, 1], [], []];
  }

  run(reader, gamecompletionCallback) {
    // this.print();
    this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
      if (!this.move(startTowerIdx, endTowerIdx)) {
        console.log("Invalid move!");
      }

      if (!this.isWon()) {
        // if isWon is false keep playing
        this.run(reader, gamecompletionCallback);
      } else {
        this.print();
        console.log("You Win!");
        gamecompletionCallback();
    }
  });
  }

  isWon() {
    const winTowers = this.towers.slice(1);
    return winTowers[0].length === 3 || winTowers[1].length === 3;
  }


  isValidMove(startTowerIdx, endTowerIdx) {
    const startTower = this.towers[startTowerIdx];
    const endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      const topStartDisc = startTower[startTower.length - 1];
      const topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  }

  move(startTowerIdx, endTowerIdx) {
    const startTower = this.towers[startTowerIdx];
    const endTower = this.towers[endTowerIdx];

    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      let disc = startTower.pop();
      endTower.push(disc);
      return true;
      // dont think i need the return true but it might be for testing

    } else {
      return false;
    }
  }

  //render the towers
  print() {
    console.log(JSON.stringify(this.towers));
  }

  // Game.prototype.promptMove  ---> when doing class/constructor style
  //you dont need the Game.prototype
  promptMove(reader, callback) {
      this.print();
      reader.question("Enter a starting tower: ", start => {
        const startTowerIdx = parseInt(start);
        reader.question("Enter an ending tower: ", end => {
          const endTowerIdx = parseInt(end);
          callback(startTowerIdx, endTowerIdx);
        });
      });
  }

}
module.exports = Game;

// const gameOne = new Game();
// console.log(gameOne.isValidMove(0, 1));
// console.log((gameOne.move(0, 1)));
// console.log((gameOne.move(0, 1)));
// console.log(gameOne.towers);
// console.log(gameOne.isWon());
// gameOne.run(reader);
