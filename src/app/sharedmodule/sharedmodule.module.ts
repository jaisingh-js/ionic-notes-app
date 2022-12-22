import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrossTextDirective } from './directives/cross-text.directive';
import { DaysofdatePipe } from './pipes/daysofdate.pipe';



@NgModule({
  declarations: [
    CrossTextDirective,
    DaysofdatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CrossTextDirective,
    DaysofdatePipe
  ]
})
export class SharedmoduleModule { }
