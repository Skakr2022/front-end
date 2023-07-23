import { style } from '@angular/animations';
import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() ScreenWidth!:number;
  @Input() collapsed!:boolean;

  hidePlaceholder() {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    searchInput.classList.add('hide-placeholder');
  }

  showPlaceholder() {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    searchInput.classList.remove('hide-placeholder');
  }

  getHeaderClass():string{
    let styleClass=''
    if(this.collapsed && this.ScreenWidth>=768){
      styleClass='head-trimmed';
    }
    else {
      styleClass='head-md-screen';
    }
   return styleClass;
  }
}
