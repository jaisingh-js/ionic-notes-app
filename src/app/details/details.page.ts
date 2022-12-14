import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { INote } from '../interfaces/inote';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string | null = null;
  newNote: boolean = false;
  note: INote = {
    title: '',
    content: ''
  };
  title: string = '';
  content: string = '';

  constructor(private navController: NavController, private route: ActivatedRoute, private notesService: NotesService, private alertController: AlertController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === "new") {
      this.newNote = true;
    }

    if (!this.newNote) {
      console.log("note fetched");
      const note = this.notesService.getNote(Number(this.id));
      this.title = note.title;
      this.content = note.content;
      // console.log(this.note);
    }

    // console.log(this.newNote);
  }

  goToHome() {
    this.navController.navigateBack('');
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['ok']
    });

    await alert.present();
  }


  addNote() {
    if (this.title.length < 1) {
      this.showAlert("Title not Found", "Please add a title");
    } else if (this.content.length < 1) {
      this.showAlert("Body not Found", "please add something");
    }
    else {
      if (this.newNote) {
        this.notesService.createNote(this.title, this.content);
      } else {
        this.notesService.saveNote(Number(this.id), this.title, this.content);
      }

      this.navController.navigateBack('');
    }
  }
  

}
