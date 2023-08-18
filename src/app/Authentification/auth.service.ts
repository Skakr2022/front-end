import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private AUTH_API = 'http://localhost:8080/user/signup';
  private AUTH_API1 = 'http://localhost:8080/user/login';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }


  register(formData:FormData): Observable<object> {  
    return this.http.post(this.AUTH_API, 
    
      formData
    ,
    {responseType:'arraybuffer'}
    );  
  }  

  login(formData:FormData): Observable<object> {  
    return this.http.post(this.AUTH_API1, 
    
      formData,
      {responseType:'arraybuffer'}
    
     );  
  } 


}
