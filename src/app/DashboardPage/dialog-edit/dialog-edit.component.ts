import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { CoreService } from 'src/app/services/core.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],

})
export class DialogEditComponent implements OnInit{
  empForm!: FormGroup;

  public categories: ProductCategory[] = [];
  userFile: any;
  message: string = "";
  imgURL: any = "";
  imagePath: any;
  
  
  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private productService :ProductService,
        private _fb: FormBuilder,
        private _coreService: CoreService,
        private _dialogRef: MatDialogRef<DialogEditComponent> ) {

            this.empForm = this._fb.group({
              name: ['',Validators.minLength(4)],
              description: ['',Validators.minLength(4)],
              imageUrl: ['',Validators.required],
              category: ['',Validators.required]
            });
  }
  
  ngOnInit(): void {
    this.listProductCategories();
    if(this.data.product){
      this.empForm.setValue({
        name:this.data.product.name,
        imageUrl:this.data.product.imageUrl,
        description:this.data.product.description,
        category:this.data.product.category.categoryName
      })
    }
  }


  listProductCategories(){
    this.productService.getProductCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  onSubmit(){
    if(this.empForm.valid){
      if (this.data.product) {
        console.log(this.empForm.get('category'));
        const formData = new FormData();
        formData.append("description",this.empForm.value.description)
        formData.append("name",this.empForm.value.name)
        formData.append("imageUrl",this.userFile)
        this.productService
          .updateProduct(this.data.product.productId, formData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Product details updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        const formData = new FormData();
        console.log(this.empForm.value)
        formData.append("description",this.empForm.value.description)
        formData.append("name",this.empForm.value.name)
        formData.append("category",this.empForm.value.category)
        formData.append("imageUrl",this.userFile)
        this.productService.createStudent(formData).subscribe(
          {
            next: (val: any) => {
              this._coreService.openSnackBar('Product successfully added!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          }
        );
      }
    }else {
      console.log("no valid data")
    }
}


    onSelectFile(event: Event) {
      console.log("file   ....")
      const e = (event.target as HTMLInputElement);
      if ( e.files!.length > 0 )
      {
        const file = e.files![0];
        this.userFile = file;
       // this.f['profile'].setValue(file);
   
      
   
      var reader = new FileReader();
      
      this.imagePath = file;
      reader.readAsDataURL(file); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
    }
  }
  

  updateProduct(id:number,data:any){
    this.productService.updateProduct(id,data)
  }
  


}
