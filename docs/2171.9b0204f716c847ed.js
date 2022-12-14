"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2171],{2171:(M,u,s)=>{s.r(u),s.d(u,{DetailsPageModule:()=>P});var h=s(6895),c=s(433),o=s(5035),d=s(2598),g=s(655),t=s(8256),f=s(4339);function m(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"ion-button",6),t.NdJ("click",function(){t.CHM(n);const l=t.oxw();return t.KtG(l.deleteNote())}),t._UZ(1,"ion-icon",7),t.qZA()}}function p(e,a){if(1&e){const n=t.EpF();t.TgZ(0,"ion-button",8),t.NdJ("click",function(){t.CHM(n);const l=t.oxw();return t.KtG(l.onEdit())}),t._UZ(1,"ion-icon",9),t.qZA()}}const v=[{path:"",component:(()=>{class e{constructor(n,i,l,r,T){this.navController=n,this.route=i,this.notesService=l,this.alertController=r,this.toastController=T,this.id=null,this.newNote=!1,this.title="",this.content="",this.edit=!1}ngOnInit(){if(this.id=this.route.snapshot.paramMap.get("id"),"new"===this.id&&(this.newNote=!0,this.edit=!0),!this.newNote){const n=this.notesService.getNote(Number(this.id));this.title=n.title,this.content=n.content}}showAlert(n,i){return(0,g.mG)(this,void 0,void 0,function*(){yield(yield this.alertController.create({header:n,message:i,buttons:["ok"]})).present()})}showToast(){return(0,g.mG)(this,void 0,void 0,function*(){yield(yield this.toastController.create({message:"Note Saved",duration:1500,position:"bottom"})).present()})}addNote(){this.title.length<1?this.showAlert("Title not Found","Please add a title"):this.content.length<1?this.showAlert("Body not Found","please add something"):(this.newNote?(this.notesService.createNote(this.title,this.content),this.showToast()):(this.notesService.saveNote(Number(this.id),this.title,this.content),this.showToast()),this.navController.navigateBack(""))}onEdit(){this.edit||(this.edit=!0)}deleteNote(){this.notesService.deleteNote(Number(this.id)),this.navController.navigateBack("")}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(o.SH),t.Y36(d.gz),t.Y36(f.U),t.Y36(o.Br),t.Y36(o.yF))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-details"]],decls:16,vars:7,consts:[["slot","start"],["slot","end","color","danger",3,"click",4,"ngIf"],["class","ion-margin","slot","end",3,"click",4,"ngIf"],["placeholder","Enter Title",3,"readonly","ngModel","ngModelChange"],["placeholder","Write something here.","rows","30",3,"readonly","ngModel","autoGrow","ngModelChange"],["expand","full",3,"click"],["slot","end","color","danger",3,"click"],["name","trash-outline"],["slot","end",1,"ion-margin",3,"click"],["name","create-outline"]],template:function(n,i){1&n&&(t.TgZ(0,"ion-header")(1,"ion-toolbar"),t._UZ(2,"ion-back-button",0),t.YNc(3,m,2,0,"ion-button",1),t.YNc(4,p,2,0,"ion-button",2),t.qZA()(),t.TgZ(5,"ion-content")(6,"ion-toolbar")(7,"ion-title"),t._uU(8,"Title "),t.qZA()(),t.TgZ(9,"ion-item")(10,"ion-input",3),t.NdJ("ngModelChange",function(r){return i.title=r}),t.qZA()(),t.TgZ(11,"ion-item")(12,"ion-textarea",4),t.NdJ("ngModelChange",function(r){return i.content=r}),t.qZA()()(),t.TgZ(13,"ion-footer")(14,"ion-button",5),t.NdJ("click",function(){return i.addNote()}),t._uU(15,"Save"),t.qZA()()),2&n&&(t.xp6(3),t.Q6J("ngIf",!i.newNote),t.xp6(1),t.Q6J("ngIf",!i.newNote),t.xp6(6),t.Q6J("readonly",!i.edit)("ngModel",i.title),t.xp6(2),t.Q6J("readonly",!i.edit)("ngModel",i.content)("autoGrow",!0))},dependencies:[h.O5,c.JJ,c.On,o.oU,o.YG,o.W2,o.fr,o.Gu,o.gu,o.pK,o.Ie,o.g2,o.wd,o.sr,o.j9,o.cs]}),e})()}];let N=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[d.Bz.forChild(v),d.Bz]}),e})(),P=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[h.ez,c.u5,o.Pc,N]}),e})()}}]);