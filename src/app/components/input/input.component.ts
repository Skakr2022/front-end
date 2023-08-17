import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() heights!: string;
  @Input() label? : string;

  @Input()
  placeHolder: string = 'Search here..';
  @Input()
  icon : string ='search';
  @Output() keyUpEvent = new EventEmitter<KeyboardEvent>();

  onKeyUp(event: KeyboardEvent) {
    this.keyUpEvent.emit(event);
  }


  myElement = document.getElementById("");



}
