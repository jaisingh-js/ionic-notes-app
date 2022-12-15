import { Component, Input, OnInit } from '@angular/core';
import { INote } from 'src/app/interfaces/inote';
import { NotesService } from 'src/app/services/notes.service';
import { categories } from 'src/app/shared/categories';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  @Input() notes: INote[] = [];
  @Input() allNotes: INote[] = [];
  @Input() archived: boolean = false;
  categories = categories;
  selectValue: string = "All";

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    // if (this.archived) {
    //   this.notesService.getArchivedNotes().subscribe(
    //     (notes) => {
    //       this.notes = notes;
    //       this.allNotes = notes;
    //       console.log('archived notes loaded');
    //       console.log(this.notes);
    //   })
    // }
    // else {
    //   this.notesService.getNotes().subscribe(
    //     (notes) => {
    //       this.notes = notes;
    //       this.allNotes = notes;
    //       console.log('uarchived notes loaded');
    //       console.log(this.notes);
    //   })
    // }

  }


  selectValueChanged(ev: any) {
    this.selectValue = ev.detail.value;
    if (ev.detail.value !== 'All') {
      const filteredNotes = this.allNotes.filter((note) => note.category === ev.detail.value);
      this.notes = filteredNotes;
    }
    else {
      this.notes = this.allNotes;
    }

    
  }

}
