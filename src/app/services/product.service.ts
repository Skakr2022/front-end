import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from 'src/app/common/Product';
import { ProductCategory } from '../common/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/product';
  private apiServerUrl = 'http://localhost:8080/product_category';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<any> {
    return this.http.get<Product[]>(this.productUrl).pipe();
  }

  createStudent(formData:FormData): Observable<object> {  
    return this.http.post(`${this.productUrl}`+'/new', formData,{
      responseType:'arraybuffer'
    } );  
  }  

  public getProductById(id: number): Observable<any> {
    return this.http.get<Product>(`${this.productUrl}/${id}`)
  }

  public deleteProductById(id: number): Observable<any>{
    return this.http.delete(`${this.productUrl}/${id}`);
  }

  public updateProduct(id:number,formData:FormData): Observable<any>{
    return this.http.put(`${this.productUrl}/${id}`,formData);
  }

  public getProductCategories(): Observable<any>{
    return this.http.get(this.apiServerUrl).pipe();
  }

  public getphoto(id:number): Observable<ArrayBuffer>{
    return this.http.get(`${this.productUrl}`+'/img/'+`${id}`,{responseType:'arraybuffer'})
  }



}
