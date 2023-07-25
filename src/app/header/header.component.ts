import { style } from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Languages } from './header-dummy-data';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  
  @Input() ScreenWidth!:number;
  @Input() collapsed!:boolean;

  selectedLanguage:any;
  languages=Languages;
  
  hidePlaceholder() {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    searchInput.classList.add('hide-placeholder');
  }

  showPlaceholder() {
    const searchInput = document.querySelector('.search') as HTMLInputElement;
    searchInput.classList.remove('hide-placeholder');
  }

  // clickOnAdmin(){  
  //   const userBtn=document.querySelector('.head-user-avatar-container') as HTMLElement;
  //     userBtn.classList.add('active');
  //   setTimeout(() => {
  //     userBtn.classList.remove('active');
  //   }, 170);
  // }

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
