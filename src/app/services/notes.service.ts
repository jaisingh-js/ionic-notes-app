import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Subject } from 'rxjs';
import { INote } from '../interfaces/inote';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  dataStorage: Storage | null = null;
  notes: INote[] = [];
  archivedNotes: INote[] = [];
  loaded: boolean = false;
  key: string = 'notes';
  archivedKey: string = 'archived';
  notesListener = new Subject<INote[]>();
  aNotesListener = new Subject<INote[]>();

  constructor(private storage: Storage, private toastController: ToastController) { 
    this.loadNotes();
    this.loadArchivedNotes();
  }

  async init() {
    this.dataStorage = await this.storage.create();
    await this.dataStorage.defineDriver(CordovaSQLiteDriver);
  }


  async loadNotes() {
    if (!this.dataStorage) { 
      await this.init();
    }
    const notes = await this.dataStorage?.get(this.key);
    if (notes) {
      this.notes = notes;
    }
    this.notesListener.next(this.notes);
  }

  async loadArchivedNotes() {
    if (!this.dataStorage) { 
      await this.init();
    }
    const anotes = await this.dataStorage?.get(this.archivedKey);
    if (anotes) {
      this.archivedNotes = anotes;
    }
    this.aNotesListener.next(this.archivedNotes);
  }

  async getKeyValue(key: string) {
    return await this.dataStorage?.get(key);
  }

  async setKeyValue(key: string, value: any) {
    return await this.dataStorage?.set(key, value);
  }

  //working
  getNote(id: string) {
    for (let note of this.notes) {
      if (note.id === id) {
        return note;
      }
    }
    return;
  }


  //working
  getNotes() {
    return this.notesListener.asObservable();
  }


  //working
  //modified to work with date
  createNote(title: string, content: string, category: string = 'All', date: Date) {
    const noteTitle = title;
    const noteContent = content;
    const noteCategory = category;
    const notExpire = date;
    const noteId = Date.now().toString();
    this.notes.push({
      id: noteId,
      title: noteTitle,
      content: noteContent,
      category: noteCategory,
      expire: notExpire
    });

    this.setKeyValue(this.key, this.notes);
  }


  //working
  //modifed to add date
  saveNote(id: string, title: string, content: string, category: string = 'All', date: Date) {
    const noteTitle = title;
    const noteContent = content;
    const noteCategory = category;
    const notExpire = date;
    let index = 0;

    const newNote: INote = {
      id: id,
      content: noteContent,
      category: noteCategory,
      title: noteTitle,
      expire: notExpire
    }

    for (let note of this.notes) {
      if (note.id === id) {
        index = this.notes.indexOf(note);
      }
    }

    this.notes[index] = newNote;
    this.setKeyValue(this.key, this.notes);

  }


  //working
  deleteNote(id: string) {
    let index = this.getNotesIndex(id);

    if (index !== null) {
      this.notes.splice(index, 1);
    this.setKeyValue(this.key, this.notes);
    }  
  }


  //working
  archiveNote(id: string) {
    console.log('this function called');
    const index = this.getNotesIndex(id);
    if (index !== null) {
      const note = this.notes.splice(index, 1);
      this.setKeyValue(this.key, this.notes);

      for (let n of note) {
        this.archivedNotes.push(n);       
      }

      this.setKeyValue(this.archivedKey, this.archivedNotes);
    }
  }


  //working
  unarchiveNote(id: string) {
    const index = this.getArchivedNotesIndex(id);
    if (index !== null) {
      const note = this.archivedNotes.splice(index, 1);
      this.setKeyValue(this.archivedKey, this.archivedNotes);

      for (let n of note) {
        this.notes.push(n);       
      }

      this.setKeyValue(this.key, this.notes);
    }

  }


  //working
  getArchivedNotes() {
    return this.aNotesListener.asObservable();
  }


  //todo
  getArchivedNote(id: string) {
    const index = this.getArchivedNotesIndex(id);
    if (index !== null) {
      return this.archivedNotes[index];
    }

    return;
  }


  getNotesIndex(id: string) {
    for (let note of this.notes) {
      if (note.id === id) {
        return this.notes.indexOf(note);
      }
    }

    return null;
  }

  getArchivedNotesIndex(id: string) {
    for (let note of this.archivedNotes) {
      if (note.id === id) {
        return this.archivedNotes.indexOf(note);
      }
    }

    return null;
  }
  
}
