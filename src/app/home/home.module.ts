import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NoteItemComponent } from './note-item/note-item.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { SharedmoduleModule } from '../sharedmodule/sharedmodule.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedmoduleModule
  ],
  declarations: [HomePage, NoteItemComponent, NotesListComponent]
})
export class HomePageModule {}
