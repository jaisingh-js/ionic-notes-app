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

  getNote(index: number) {
    return this.notes[index];
  }

  getNotes() {
    return this.notesListener.asObservable();
  }

  createNote(title: string, content: string, category: string = 'all') {
    const noteTitle = title;
    const noteContent = content;
    const noteCategory = category;
    this.notes.push({
      title: noteTitle,
      content: noteContent,
      category: noteCategory
    });

    this.setKeyValue(this.key, this.notes);
  }

  saveNote(index: number, title: string, content: string, category: string = 'all') {
    const noteTitle = title;
    const noteContent = content;
    const noteCategory = category;

    this.notes[index] = {
      title: noteTitle,
      content: noteContent,
      category: noteCategory
    };

    this.setKeyValue(this.key, this.notes);

  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.setKeyValue(this.key, this.notes);
  }

  archiveNote(index: number) {
    const note = this.notes.splice(index, 1);
    this.setKeyValue(this.key, this.notes);
    for (let n of note) {
      this.archivedNotes.push(n);
      
    }
    this.setKeyValue(this.archivedKey, this.archivedNotes);
    // console.log(this.archivedNotes);
  }

  unarchiveNote(index: number) {
    const note = this.archivedNotes.splice(index, 1);
    this.setKeyValue(this.archivedKey, this.archivedNotes);
    for (let n of note) {
      this.notes.push(n);     
    }
    this.setKeyValue(this.key, this.notes);
  }

  getArchivedNotes() {
    return this.aNotesListener.asObservable();
  }

  getArchivedNote(index: number) {
    return this.archivedNotes[index];
  }
  
}
