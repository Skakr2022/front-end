import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../signup/Auth.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthValidatorsService } from '../auth-validators.service';
import { AuthGuard2Service } from '../auth-guard2.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../../../assets/css/styles.min.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  loadedPosts:any[]=[];
  isCorrect:boolean=false;
  isEmpty:boolean=false;
  constructor(private fb:FormBuilder,
              private http:HttpClient,
              private router:Router,
              private authValidators:AuthValidatorsService,
              private authGuard:AuthGuard2Service){}
  ngOnInit (){
    this.loginForm= this.fb.group({
        username: new FormControl(null,[Validators.required]),
        password: new FormControl(null,Validators.required) 
    })
  }
  
  onSubmit(loginData: Auth){
     
    this.fetchPosts();
  }

  private fetchPosts(){

    if(this.loginForm.invalid){
      this.authValidators.checkValidForm();
      this.isEmpty=true;
    }else {
    this.http.get('https://ng-backend-6d456-default-rtdb.firebaseio.com/post.json')
    .pipe(map((responseDate)=>{
        // console.log(responseDate)
     const postsArray:any[]=[];
     for(const key in responseDate){
      if(responseDate.hasOwnProperty(key)){
         postsArray.push({ ...responseDate[key as keyof typeof responseDate],id:key});
      }
     }
      return postsArray;
     }) 
    ).subscribe((Posts:any[])=>{
      let isLoginSuccessful:boolean=false;
      const email=document.getElementById('exampleInputEmail1') as HTMLInputElement;
      const password=document.getElementById('exampleInputPassword1') as HTMLInputElement;
      this.loadedPosts=Posts;
      for(let post of this.loadedPosts){
       if(post.email === email.value  && post.password  === password.value ){
           console.log('success login');
           this.authGuard.login();
           this.router.navigate(['/dashboardpage']);
           isLoginSuccessful=true;
           break;
        }
      }
      
      if(!isLoginSuccessful){
        console.log('error');
          this.isCorrect=true;
      }
      // console.log(this.loadedPosts)
    })
   }
  } 
  
}
