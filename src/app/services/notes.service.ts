import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  dataStorage: Storage | null = null;
  


  constructor(private storage: Storage) { }

  async load() {
    this.dataStorage = await this.storage.create();
  }

  async getKeyValue(key: string) {
    return await this.dataStorage?.get(key);
  }

  async setKeyValue(key: string, value: any) {
    await this.dataStorage?.set(key, value);
  }
}
