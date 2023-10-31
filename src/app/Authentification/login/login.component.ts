import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '../signup/Auth.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthValidatorsService } from '../auth-validators.service';
import { AuthGuard2Service } from '../auth-guard2.service';
import { AuthService } from '../auth.service';
import { CoreService } from 'src/app/services/core.service';
import { StorageService } from '../storage-service.service';

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
              private authGuard:AuthGuard2Service,
              private authService:AuthService,
              private _coreService: CoreService,
              private storageService:StorageService){}
  ngOnInit (){
    this.loginForm= this.fb.group({
        username: new FormControl('',[Validators.required]),
        password: new FormControl('',Validators.required) 
    })
  }
  

  onSubmit1(){

    const formData = new FormData();
    formData.append("username",this.loginForm.value.username)
    formData.append("password",this.loginForm.value.password)
    console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value).subscribe({
      next: (val: any) => {
        this.storageService.saveUser(val);
        this._coreService.openSnackBar('user successfully conected!');
         
      },
      complete: () =>{
        console.log("router")
        this.router.navigate(['/dashboardpage']) 
      },
      error: (err: any) => {
        console.error(err);
      },
    })
  }
  
  onSubmit(){
     
    this.fetchPosts();
  }

  private fetchPosts(){

    if(this.loginForm.invalid){
      this.authValidators.checkValidForm();
      this.isEmpty=true;
    }else {
    this.http.get('http://localhost:8080/user')
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
