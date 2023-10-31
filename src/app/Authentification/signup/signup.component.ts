import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, NgModel, Validators } from '@angular/forms';
import { Auth } from './Auth.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthValidatorsService } from '../auth-validators.service';
import { AuthGuard2Service } from '../auth-guard2.service';
import { CoreService } from 'src/app/services/core.service';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss','../../../assets/css/styles.min.css']
})
export class SignupComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
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
              private authValidators:AuthValidatorsService,
              private _coreService:CoreService,
              private authService:AuthService
              ){}
  
  ngOnInit(){
    this.signupForm=this.fb.group({
      fullName:['',[Validators.required,this.authValidators.validateFullName]],
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPassword:['',[Validators.required,this.authValidators.passwordMatchValidator]] 
    })

    
  }

  form: any = {
    username: null,
    email: null,
    password: null
  };
  

  onSubmit(Data: Auth){
    console.log(Data);
    if(this.signupForm.invalid){
          this.authValidators.checkValidForm();
          this.isEmpty=true;
    }
    else{ 

      const formData = new FormData();
      formData.append('fullName',this.signupForm.value.fullName)
      formData.append('email',this.signupForm.value.email)
      formData.append('password',this.signupForm.value.password)
      formData.append('username',this.signupForm.value.username)
      

    this.authService.register(formData).subscribe({
      next: (val: any) => {
        console.log("test")
        this._coreService.openSnackBar('Product successfully added!');
        // this.authGuard.login();
        this.router.navigate(['/dashboardpage'])  
      },
      error: (err: any) => {
        console.error(err);
      },
    })
 
    
   }
  }
}



