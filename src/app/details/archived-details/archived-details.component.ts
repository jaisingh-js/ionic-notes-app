import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INote } from 'src/app/interfaces/inote';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-archived-details',
  templateUrl: './archived-details.component.html',
  styleUrls: ['./archived-details.component.scss'],
})
export class ArchivedDetailsComponent implements OnInit {
  private index: string | null = null;
  note?: INote;

  constructor(private route: ActivatedRoute, private notesService: NotesService) { }

  ngOnInit() {
    this.index = this.route.snapshot.paramMap.get('id');
    this.note = this.notesService.getArchivedNote(Number(this.index));
  }

}
