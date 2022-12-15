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
  allNotes: INote[] = [];
  categories = categories;
  selectValue: string = "All";


  constructor(private notesService: NotesService, private navController: NavController) { }
  
  ngOnInit() {
    // this.notes = this.notesService.notes;
    this.notesService.getNotes().subscribe(notes => {
      this.notes = notes;
      this.allNotes = notes;
    });
  }


  createNote() {
    this.navController.navigateForward('notes/new');
  }

  selectValueChanged(ev: any) {
    this.selectValue = ev.detail.value;
    const filteredNotes = this.allNotes.filter((note) => note.category === ev.detail.value);
    this.notes = filteredNotes;
  }

}
