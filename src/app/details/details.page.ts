import { Component, OnInit, ɵisDefaultChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { INote } from '../interfaces/inote';
import { NotesService } from '../services/notes.service';
import { categories } from '../shared/categories';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  id: string | null = null;
  newNote: boolean = false;
  title: string = '';
  content: string = '';
  edit: boolean = false;
  categories = categories;
  selectValue: string = "All";


  constructor(private navController: NavController, private route: ActivatedRoute, private notesService: NotesService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === "new") {
      this.newNote = true;
      this.edit = true;
    }

    if (!this.newNote) {
      
      const note = this.notesService.getNote(Number(this.id));
      this.title = note.title;
      this.content = note.content;
      // console.log(this.note);
    }

    // console.log(this.newNote);
  }


  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['ok']
    });

    await alert.present();
  }

  async showToast() {
    const toast = await this.toastController.create({
      message: 'Note Saved',
      duration: 1500,
      position: "bottom"
    });

    await toast.present();
  }


  addNote() {
    if (this.title.length < 1) {
      this.showAlert("Title not Found", "Please add a title");
    } else if (this.content.length < 1) {
      this.showAlert("Body not Found", "please add something");
    }
    else {
      if (this.newNote) {
        this.notesService.createNote(this.title, this.content, this.selectValue);
        this.showToast();
      } else {
        this.notesService.saveNote(Number(this.id), this.title, this.content, this.selectValue);
        this.showToast();
      }

      this.navController.navigateBack('');
    }
  }

  onEdit() {
    if (!this.edit) {
      this.edit = true;
    }
  }

  deleteNote() {
    this.notesService.deleteNote(Number(this.id));
    this.navController.navigateBack('');
  }

  selectValueChanged(ev: any) {
    this.selectValue = ev.detail.value;
  }
  

}
