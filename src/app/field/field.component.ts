import { Component, OnInit, Input } from '@angular/core';
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

  panelsnum: number = +this.rows * +this.panelinrows;

  board!: Field;
  panel!: Panel;

  constructor() {
    console.log("Number of Panels: " + this.panelsnum);
    console.log ("Number of Mines: " + this.minesnum)
    this.nw();
  }

  nw() {
    this.board = new Field(this.panelsnum, this.minesnum, this.panelinrows);
  }

  clicked(panel: Panel) {
    this.board.click(panel, this.panelinrows, this.panelsnum, this.minesnum);
  }
  flagged(panel: Panel){
    this.board.flag(panel);
    return false;
  }

  ngOnInit(): void {
  }
}
