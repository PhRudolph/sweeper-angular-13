import { Panel } from "./panel";

export class Field {

  public panels: Panel[] = [];
  afterend: boolean = false;
  gameinprogress: boolean = false;
  winner: boolean = false;
  minesleft: number = 0;

  constructor(tiles: number, inrows: number, mines: number) {

    for (let l = 0; l < tiles; l++) {                                                 //field generation
      this.panels[l] = new Panel(l);                                                            //each tile as object into an array.
    }                                                                                         // ↑ Note: In this code, I kindof used my own naming convention so the Objects are referred to as panels. If its called "tile", that means its just the index number.

    for (let lp = 0; lp < mines; lp++) {                                              //bomb generation
      const id = Math.floor(Math.random() * tiles);                                             //generate random id and put a bomb there
      if(this.panels[id].value === "💣"){
        lp--;
      }
      this.panels[id].value = "💣";
    }
    this.minesleft = mines;

    for (let tilelop = 0; tilelop < tiles; tilelop++) {                               //adjacency generation:
      let adjacenttiles = this.getadjacent(tilelop, inrows, tiles);                             //calling adjacency algorithm

      if (this.panels[tilelop].value !== "💣") {
        for (let loop = 0; loop < adjacenttiles.length; loop++) {
          let curradjtile = adjacenttiles[loop];
          if (this.panels[curradjtile].value === "💣") {
            this.panels[tilelop].adjmines++;
          }
        }
        if (this.panels[tilelop].adjmines === 0) { } else {                                     //do nothing so the default value is not set to 0
          this.panels[tilelop].value = this.panels[tilelop].adjmines.toString();
        }
      }
    }
  }


  getadjacent(tile: number, inrows: number, tiles: number) {                          //function that calculates adjacent tiles

    let top = +tile - +inrows;                                                                  //declaring pseudo adjacent tiles
    let topright = +tile - +inrows + +1;
    let right = +tile + +1;
    let botright = +tile + +inrows + +1;
    let bot = +tile + +inrows;
    let botleft = +tile + +inrows - +1;
    let left = +tile - +1;
    let topleft = +tile - +inrows - +1;
    let adjacents = [top, topright, right, botright, bot, botleft, left, topleft];
    let trueadjacents = [];

    for (let loop = 0; loop < 8; loop++) {
      let curradjtile = adjacents[loop];                                              //The following if statements exclude imaginary tiles meaning adjacent tiles that are out of bound or behind a line break:
      if (curradjtile >= 0 && curradjtile < tiles) {                                            //if the tile is on the board
        if (+tile % +inrows === 0 && +curradjtile % +inrows === +inrows - +1) { } else {        //unless the tile is on the left edge and its adjacent tile on the right edge
          if (+tile % +inrows === +inrows - +1 && +curradjtile % +inrows === 0) { } else {      //vice versa
            trueadjacents.push(curradjtile)                                                     //push it as a true adjacent tile
          }
        }
      }
    }
    return trueadjacents;                                                                       //returns array of adjacent tiles
  }

  click(panel: Panel, inrows: number, tiles: number, mines: number) {                 //onclick function

    if (this.gameinprogress === false && this.afterend === false) {
      this.gameinprogress = true;
      this.winner = false;
    }

    if (panel.value === "💣" && panel.flag === false) {                               //game over
      this.gameover(panel, tiles);
    }

    if (panel.revealed === false && panel.flag === false && panel.value !== "💣") {   //revealing:
      panel.revealed = true;
      if (panel.value === " ") {                                                                //when clicking an empty field
        this.reveal(panel.id, inrows, tiles);
      }
    }
    if (panel.revealed === true && panel.adjmines > 0) {                                        //when clicking a number
      let adjs = this.getadjacent(panel.id, inrows, tiles);
      let flagcounter = 0;
      for (let it = 0; it < adjs.length; it++) {
        if (this.panels[adjs[it]].flag === true) {
          flagcounter++;
        }
      }
      if (this.panels[panel.id].adjmines == flagcounter) {
        if (this.panels[panel.id].flag === false) {
          this.reveal(panel.id, inrows, tiles);
        }
      }
    }

    let count = 0;                                                                    //win game
    for (let all = 0; all < tiles; all++) {                                                     //on every click count through all unrevealed tiles
      if (this.panels[all].revealed === false) {
        count++
      }
    }
    if (count === mines) {                                                                      //execute winscreen when there are as many unrevealed tiles as bombs
      setTimeout(function () { alert("Congratulations. You won"); }, 500);
      this.gameinprogress = false;
      this.afterend = true;
      this.winner = true;
    }
  }


  reveal(tile: number, inrows: number, tiles: number) {                               //reveal function
    let torev = [tile];                                                                         //put first id into array
    do {                                                                                        //iterate through the array until it is empty
      let currtile = torev[0];
      let temparr = this.getadjacent(currtile, inrows, tiles);

      for (let ad = 0; ad < temparr.length; ad++) {
        let currad = temparr[ad];
        if (this.panels[currad].revealed === false && this.panels[currad].flag === false) {
          this.panels[currad].revealed = true;
          if (this.panels[currad].value === " ") {
            torev.push(currad);                                                                 //push certain ids of adjacent tiles to the array
          }
        }
        if (this.panels[currad].value === "💣" && this.panels[currad].flag === false) {
          this.panels[currad].revealed = false;
          this.gameover(this.panels[currad], tiles);
        }
      }
      torev.shift();
    } while (torev.length > 0);
  }

  gameover(panel: Panel, tiles: number) {                                             //Game Over function
    panel.value = "💥";
    if (this.afterend === false) {
      for (let loop = 0; loop < tiles; loop++) {
        this.panels[loop].revealed = true;
      }
      this.gameinprogress = false;
      this.afterend = true;
    }
  }

  flag(panel: Panel) {                                                                //flag function
    if (panel.flag === false && panel.revealed === false) {
      panel.flag = true;
      this.minesleft--;
    } else {
      if (panel.flag == true && panel.revealed === false) {
        panel.flag = false;
        this.minesleft++;
      }
    }
  }
}