import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { INote } from '../interfaces/inote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  dataStorage: Storage | null = null;
  notes: INote[] = [];
  key: string = 'notes';


  constructor(private storage: Storage) { }

  async load() {
    this.dataStorage = await this.storage.create();
  }

  async loadNotes() {
    await this.getKeyValue(this.key) ?.then(
      (notes) => {
        if (notes) {
          this.notes = notes;
        }
      }
    ).catch((err) => console.log(err))
  }

  getKeyValue(key: string) {
    return this.dataStorage?.get(key);
  }

  setKeyValue(key: string, value: any) {
    return this.dataStorage?.set(key, value);
  }

  getNote(id: number) {
    return this.notes[id];
  }

  getNotes() {
    return this.notes;
  }

  createNote(title: string, content: string) {
    const noteTitle = title;
    const noteContent = content;
    const noteId = this.notes.length + 1;
    this.notes.push({
      id: noteId,
      title: noteTitle,
      content: noteContent
    });

    this.setKeyValue(this.key, this.notes)?.then(
      (data) => {
        console.log('data added to storage');
        console.log(data);
      }
    );
  }

  saveNote(id: number, title: string, content: string) {
    const noteTitle = title;
    const noteContent = content;
    const noteId = id;

    this.notes[id] = {
      id: noteId,
      title: noteTitle,
      content: noteContent
    };

    this.setKeyValue(this.key, this.notes);

  }
  
}
