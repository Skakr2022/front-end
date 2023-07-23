import { Component ,Input} from '@angular/core';
  
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
  
export class BodyComponent {
  
  @Input()  collapsed!: boolean;
  @Input() ScreenWidth!:number;
  
  getBodyClass():string{
    let styleClass='';
    console.log('getBodyClass()'+this.collapsed);
    if(this.collapsed && this.ScreenWidth>=768){
      console.log('if getBodyClass()'+this.ScreenWidth);
      styleClass='body-trimmed';
    }
    else if(this.collapsed && this.ScreenWidth<=768 && this.ScreenWidth >0){
      console.log('else if getBodyClass()'+this.ScreenWidth);
      styleClass='body-md-screen';
    }
    return styleClass;
  }
} 
  