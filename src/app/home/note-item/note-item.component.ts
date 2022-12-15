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
  @Input() archived: boolean = false;

  constructor(private navController: NavController, private notesSevice: NotesService) { }

  ngOnInit() {
  }

  openNote() {
    if (!this.archived) {
      this.navController.navigateForward('notes/' + this.note?.id);
    } else {
      this.navController.navigateForward('notes/archived/' + this.note?.id);

    }
       
  }

  archiveSlider() {
    if (!this.archived && this.note) { 
      this.notesSevice.archiveNote(this.note?.id); 
    }
    else if(this.note) {
        this.notesSevice.unarchiveNote(this.note?.id);
    }
    
    
  }

  sliderDragged() {
    if (this.note) {
      this.notesSevice.deleteNote(this.note?.id);    
    }
  }

}
