import { Component, OnInit } from '@angular/core';
import { Field } from '../gamelogic';
import { Panel } from '../panel';


@Component({
  selector: 'field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  rows: number = 10;
  panelinrows: number = 10;
  minesnum: number = 15;



  board!: Field;
  panel!: Panel;

  panelsnum: number = +this.rows * +this.panelinrows;

  constructor() {
    this.nw();
  }

  input(rows: string, cols: string, mines: string) {
    let rowsn: number = parseInt(rows);
    let colsn: number = parseInt(cols);
    let minesn: number = parseInt(mines);

    let panelsn: number = +rowsn * +colsn;
    /*
        console.log("rows: " + rowsn);
        console.log("cols: " + colsn);
        console.log("tiles: " + panelsn);
        console.log("mines: " + minesn);
    */
    if (panelsn > 0 && colsn > 0 && rowsn > 0) {
      if (rowsn > 5 || colsn > 5) {
        if (panelsn >= minesn) {
          if (panelsn === minesn) {
            alert("No");
          } else {
            this.panelsnum = panelsn;
            this.panelinrows = colsn;
            this.minesnum = minesn;
            this.nw();
          }
        } else { alert("Oops. You tried to put " + minesn + " mines on a field with just " + panelsn + " tiles"); }
      } else { alert("Your field must at least be 5 by 5 or its not much of a field"); }
    } else { alert("You need rows, colums and mines to create a Minefield"); }

  }

  nw() {
    console.log("Number of Panels: " + this.panelsnum);
    console.log("Number of Mines: " + this.minesnum)
    this.board = new Field(this.panelsnum, this.panelinrows, this.minesnum);
    this.board.afterend = false;
  }

  clicked(panel: Panel) {
    this.board.click(panel, this.panelinrows, this.panelsnum, this.minesnum);
  }
  flagged(panel: Panel) {
    this.board.flag(panel);
    return false;
  }

  onkey(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }
}
