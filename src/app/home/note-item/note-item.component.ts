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
  @Input() archived: boolean = false;

  constructor(private navController: NavController, private notesSevice: NotesService) { }

  ngOnInit() {
  }

  openNote() {
    if (!this.archived) {
      this.navController.navigateForward('notes/' + this.index);
    } else {
      this.navController.navigateForward('notes/archived/' + this.index);

    }
       
  }

  archiveSlider() {
    if (!this.archived) {
      if (this.index !== undefined) {
        this.notesSevice.archiveNote(this.index);
      }
    }
    else {
      if (this.index !== undefined) {
        this.notesSevice.unarchiveNote(this.index);
      }
    }
    
    
  }

  sliderDragged() {
    if (this.index !== undefined) {
      this.notesSevice.deleteNote(this.index);
    }
  }

}
