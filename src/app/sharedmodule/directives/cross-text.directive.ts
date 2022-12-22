import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCrossText]'
})
export class CrossTextDirective {
  @Input('appCrossText') archived?: boolean;

  constructor(private el: ElementRef) {
    
  }

  ngOnInit() {
    if (this.archived) {
      this.el.nativeElement.style.textDecoration = 'line-through';
    }
  }

}
