import { Component, Input, OnInit } from '@angular/core';
import { INote } from 'src/app/interfaces/inote';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {

  @Input() note?: INote;

  constructor() { }

  ngOnInit() {
    console.log(this.note);
  }

}
