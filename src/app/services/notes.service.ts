import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { INote } from '../interfaces/inote';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  dataStorage: Storage | null = null;
  notes: INote[] = [];
  loaded: boolean = false;
  key: string = 'notes';
  notesListener = new Subject<INote[]>();

  constructor(private storage: Storage, private toastController: ToastController) { 
    this.loadNotes();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
     this.dataStorage = await this.storage.create();
  }


  async loadNotes() {
    if (!this.dataStorage) { 
      await this.init();
    }
    this.notes = await this.dataStorage?.get(this.key);
    this.notesListener.next(this.notes);
  }

  async getKeyValue(key: string) {
    return await this.dataStorage?.get(key);
  }

  async setKeyValue(key: string, value: any) {
    return await this.dataStorage?.set(key, value);
  }

  getNote(index: number) {
    return this.notes[index];
  }

  getNotes() {
    return this.notesListener.asObservable();
  }

  createNote(title: string, content: string) {
    const noteTitle = title;
    const noteContent = content;
    this.notes.push({
      title: noteTitle,
      content: noteContent
    });

    this.setKeyValue(this.key, this.notes);
  }

  saveNote(index: number, title: string, content: string) {
    const noteTitle = title;
    const noteContent = content;

    this.notes[index] = {
      title: noteTitle,
      content: noteContent
    };

    this.setKeyValue(this.key, this.notes);

  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.setKeyValue(this.key, this.notes);
  }
  
}
