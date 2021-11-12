import { Component, OnInit } from '@angular/core';
import { Field } from '../gamelogic';
import { Panel } from '../panel';

@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  board!: Field;
  panel!: Panel;


  rows: number = 10;
  panelinrows: number = 10;
  minesnum: number = 15;
  panelsnum: number = this.rows * this.panelinrows;

  inter: any;
  hours: string = "00";
  minutes: string = "00";
  seconds: string = "00";
  hrtest: number = 0;

  mousd: boolean = false;

  difficulty: string = "medium";


  constructor() {
    this.nw();
  }

  input(rows: string, cols: string, mines: string) {                                    //input handler function
    let rowsn: number = parseInt(rows);
    let colsn: number = parseInt(cols);
    let minesn: number = parseInt(mines);

    let panelsn: number = rowsn * colsn;

    if (panelsn > 0 && colsn > 0 && rowsn > 0 && rows !== "" && cols !== "" && mines !== "") {    //input logic that filters inputs that are forbidden. By me. Because I can
      if (rowsn >= 10 && colsn >= 10) {
        if (panelsn >= minesn) {
          if (panelsn === minesn) {
            alert("No");
          } else {
            let lottamines: boolean = true;
            if (panelsn / 2 < minesn) { lottamines = confirm("These are a LOT of mines. Your chance of exploding on the first click is bigger than 50%. Are you sure that you want that?"); }
            if (lottamines === true) {
              this.panelsnum = panelsn;
              this.panelinrows = colsn;
              this.minesnum = minesn;
              this.nw();
            }
          }
        } else { alert("Oops. You tried to put " + minesn + " mines on a field with just " + panelsn + " tiles"); }
      } else { alert("Your field must at least be 10 by 10 or its not much of a field."); }
    } else { alert("You need rows, colums and mines to create a Minefield"); }

  }

  nw() {                                                                                //creates the field as an object
    this.stoptimer();
    this.board = new Field(this.panelsnum, this.panelinrows, this.minesnum);
    this.board.afterend = false;

  }

  clicked(panel: Panel) {                                                               //click handler function
    if (this.board.gameinprogress === false && this.board.afterend === false) {
      this.starttimer();
    }

    this.board.click(panel, this.panelinrows, this.panelsnum, this.minesnum);

    if (this.board.gameinprogress === false && this.board.afterend === true) {
      this.stoptimer();
    }
  }
  flagged(panel: Panel) {                                                               //rightclick handler function
    this.board.flag(panel);
    return false;
  }


  onkey(event: any, rows: string, cols: string, mines: string): boolean {               //function that on key press blocks keys which are not numbers
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode === 13) {
      this.input(rows, cols, mines);
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  starttimer() {                                                                        //function that starts a timer
    let sec = 0;
    let min = 0;
    let hrs = 0;                                                                        
    this.inter = setInterval(() => {
      sec++;
      if (sec === 60) {
        sec = sec - 60;
        min++;
      }
      if (min === 60) {
        min = min - 60;
        hrs++;
      }
      this.seconds = (sec < 10) ? '0' + sec.toString() : sec.toString();
      this.minutes = (min < 10) ? '0' + min.toString() : min.toString();
      this.hours = (hrs < 10) ? '0' + hrs.toString() : hrs.toString();
      this.hrtest = hrs;
    }, 1000);
  }
  stoptimer() {
    clearInterval(this.inter);
  }

  mousedown() {                                                                         //mouse event listeners for smiley control
    this.mousd = true;
  }
  mouseup() {
    this.mousd = false;
  }

  diff(rows: string, cols: string, mines: string) {                                     //function for on key up displaying the difficulty.
    let rowsn: number = parseInt(rows);
    let colsn: number = parseInt(cols);
    let minesn: number = parseInt(mines);

    let panelsn: number = rowsn * colsn;

    if (panelsn < 100) {
      this.difficulty = "field too smol";
    } else {
      if (minesn < panelsn * 0.04) {
        this.difficulty = "too easy";
      } else if (minesn < panelsn * 0.10) {
        this.difficulty = "easy";
      } else if (minesn < panelsn * 0.2) {
        this.difficulty = "medium";
      } else if (minesn < panelsn * 0.3) {
        this.difficulty = "hard";
      } else if (minesn < panelsn * 0.4) {
        this.difficulty = "extreme";
      } else if (minesn < panelsn) {
        this.difficulty = "insanity";
      } else {
        this.difficulty = "unavailable";
      }
    }

  }

  ngOnInit(): void {

  }
}
