import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { INote } from 'src/app/interfaces/inote';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.scss'],
})
export class NoteItemComponent implements OnInit {

  @Input() note?: INote;
  @Input() index?: number;

  constructor(private navController: NavController, private notesSevice: NotesService) { }

  ngOnInit() {
    // console.log(this.note);
  }

  openNote() {
    this.navController.navigateForward('notes/' + this.index);
    
  }

  sliderDragged() {
    if (this.index !== undefined) {
      this.notesSevice.deleteNote(this.index);
    }
    
  }

}
