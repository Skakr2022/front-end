import { Component,Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { CategoryService } from 'src/app/services/Category.service';
import { CoreService } from 'src/app/services/core.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-dialog-category',
  templateUrl: './dialog-category.component.html',
  styleUrls: ['./dialog-category.component.scss']
})
export class DialogCategoryComponent implements OnInit {

  empForm!: FormGroup;
  public categories: ProductCategory[] = [];
  message: string = "";
  
  
  
  constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private categoryService:CategoryService,
       
        private _fb: FormBuilder,
        private _coreService: CoreService,
        private _dialogRef: MatDialogRef<DialogCategoryComponent> ) {

            this.empForm = this._fb.group({
              categoryName: ['',[Validators.required,Validators.minLength(4)]],
              
            });
  }
  
  ngOnInit(): void {
    console.log(this.data);
    this.listProductCategories();
    if(this.data.category){
      this.empForm.setValue({
        categoryName:this.data.category.categoryName
      })
    }
  }

  listProductCategories(){
    this.categoryService.getCategories().subscribe(
      data => {
        this.categories = data;
      }
    )
  }

  onSubmit(){
    if(this.empForm.valid){
      if (this.data.category) {
         console.log(this.data.category)
        // console.log(this.empForm.get('category'));
        const formData = new FormData();
        console.log(formData);
        formData.append("categoryName",this.empForm.value.categoryName)
        this.categoryService
          .updateCategory(this.data.category.categoryId, formData)
          .subscribe({
            next: (val: any) => {
              this._coreService.openSnackBar('Category updated!');
              this._dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        const formData = new FormData();
        console.log(formData)
        formData.append("categoryName",this.empForm.value.categoryName)
        this.categoryService.postCategories(formData).subscribe(
          {
            next: (val: any) => {
              this._coreService.openSnackBar('The category is successfully added!');
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
}
