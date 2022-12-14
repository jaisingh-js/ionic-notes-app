import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { INote } from '../interfaces/inote';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  notes: INote[] = [];

  constructor(private notesService: NotesService, private navController: NavController) { }
  
  ngOnInit() {
    this.load();
  }

  async load() {
    await this.notesService.load().then(
      (success) => {
        this.notesService.loadNotes().then(
          (data) => {
            this.notes = this.notesService.getNotes();
          });
      }
    );
    
  }

  createNote() {
    this.navController.navigateForward('notes/new');
  }

  // refreshList() {
  //   this.notes = this.notesService.getNotes();
  //   console.log(this.notes);
  // }

}
