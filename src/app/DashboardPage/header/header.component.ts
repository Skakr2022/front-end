
import { Component, HostBinding, HostListener, Input, OnInit } from '@angular/core';
import { Languages, adminElements } from './header-dummy-data';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthGuard2Service } from 'src/app/Authentification/auth-guard2.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  @Input() ScreenWidth!:number;
  @Input() collapsed!:boolean;
  selectedLanguage:any;
  languages = Languages;
  AdminItems=adminElements;


  
  @HostBinding('class') className='';
  darkClassName='theme-dark';
  lightClassName='them-light';
  
  constructor(private authGuard:AuthGuard2Service){}

  ngOnInit(): void {
      this.selectedLanguage=this.languages[0];
  }

  

  onLanguageSelect(lang: any): void {
    this.selectedLanguage = lang;
  }

  HideOverlay() {
    const ngTemplate=document.querySelector('.Hiding') as HTMLElement;
    ngTemplate.classList.add('hide-element');
  }

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

  onLogout(){
    //  this.authGuard.logout();
  }
  
}
