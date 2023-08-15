import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Auth } from './Auth.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthValidatorsService } from '../auth-validators.service';
import { AuthGuard2Service } from '../auth-guard2.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss','../../../assets/css/styles.min.css']
})
export class SignupComponent implements OnInit {
  // @ViewChild('f') signupForm! :NgForm;
  @ViewChild('Email') seeNgModel!:NgModel;
  emailFieldBlurred=true;
  signupForm!:FormGroup;
  passwordsMismatch:boolean=false;
  isEmpty:boolean=false;
  constructor(private Http:HttpClient,
              private fb:FormBuilder,
              private router:Router,
              private authGuard:AuthGuard2Service,
              private authValidators:AuthValidatorsService){}
  
  ngOnInit(){
    this.signupForm=this.fb.group({
      fullName:['',[Validators.required,this.authValidators.validateFullName]],
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6),this.authValidators.passwordValidator]],
      confirmPassword:['',[Validators.required,this.authValidators.passwordMatchValidator,this.authValidators.passwordValidator]] 
    })

    
  }

  onSubmit(Data: Auth){
    if(this.signupForm.invalid){
          this.authValidators.checkValidForm();
          this.isEmpty=true;
    }
    else{ 
    this.Http.post('https://ng-backend-6d456-default-rtdb.firebaseio.com/post.json',Data)
    .subscribe(responseDate=>{ 
          console.log(responseDate);
          this.authGuard.login();
          this.router.navigate(['/dashboardpage'])  
    })
   }
  }
}


