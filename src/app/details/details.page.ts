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
  id: string = '';
  newNote: boolean = false;
  title: string = '';
  content: string = '';
  edit: boolean = false;
  categories = categories;
  selectValue: string = "All";
  archived?: boolean;
  // date: Date = new Date();
  date = new Date(this.getLocalISODate(new Date()).getTime() + 30*24*60*60*1000).toISOString();
  minDate = new Date(Date.now() - new Date().getTimezoneOffset() * 60000 + 24*60*60*1000).toISOString();


  constructor(private navController: NavController, private route: ActivatedRoute, private notesService: NotesService, private alertController: AlertController, private toastController: ToastController) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
    if (this.id === "new") {
      this.newNote = true;
      this.edit = true;
    }

    if (!this.newNote && this.id !== '') {
      
      const note = this.notesService.getNote(this.id);
      if (note) {
        this.title = note.title;
        this.content = note.content;
        this.date = this.getLocalISODate(note.expire).toISOString();
      }
      
    }
  }

  getLocalISODate(date: Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000);
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
        this.notesService.createNote(this.title, this.content, this.selectValue, new Date(this.date));
        this.showToast();
      }
      else if (this.id !== null) {
          this.notesService.saveNote(this.id, this.title, this.content, this.selectValue, new Date(this.date));
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
    this.notesService.deleteNote(this.id);
    this.navController.navigateBack('');
  }

  selectValueChanged(ev: any) {
    this.selectValue = ev.detail.value;
  }

  dateChanged(ev: any) {
    console.log(new Date(this.date));
  }
  

}
