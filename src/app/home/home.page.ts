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
    this.notes = this.notesService.notes;
    this.notesService.getNotes().subscribe(notes => this.notes = notes);
  }


  createNote() {
    this.navController.navigateForward('notes/new');
  }

}
