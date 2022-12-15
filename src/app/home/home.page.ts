import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { INote } from '../interfaces/inote';
import { NotesService } from '../services/notes.service';
import { categories } from '../shared/categories';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: INote[] = [];
  archivedNotes: INote[] = [];
  categories = categories;
  selectValue: string = "All";
  segmentValue: string = "unarchived";
  archived: boolean = false;


  constructor(private notesService: NotesService, private navController: NavController) { }
  
  ngOnInit() {
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
      // this.allNotes = notes;
    });

    this.notesService.getArchivedNotes().subscribe(notes => {
      this.archivedNotes = notes;
      // this.allArchivedNotes = notes;   
    })
  }


  createNote() {
    this.navController.navigateForward('notes/new');
  }

  segmentValueChanged(ev: any) {
    this.segmentValue = ev.detail.value;
    if (ev.detail.value === 'archived') {
      this.archived = true;
    }
    else {
      this.archived = false;
    }
  }

}
