import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../common/Product';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { ProductService } from 'src/app/services/product.service';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CoreService } from 'src/app/services/core.service';
import { TableColumn } from '../../components/table/TableColumn';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit{

  // displayedColu : TableColumn[] = [
  //   {
  //     name: 'name',
  //     dataKey: 'name'
  //   },
  //   {
  //     name: 'Category',
  //     dataKey: 'category.categoryName'
  //   },
  //   {
  //     name: 'description',
  //     dataKey: 'description'
  //   },
  //   {
  //     name: 'lastUpdate',
  //     dataKey: 'lastUpdate'
  //   },
  // ]
  
  displayedColumns: string[] = ['name' ,'productCategory', 'description', 'lastUpdate','action'];

  

  dataSource!: MatTableDataSource<Product>;
  isValid: Boolean = this.dataSource && this.dataSource.data.length > 0;
  filterValue : String ='';
  products!:Product[];
  test:string="";
  

  constructor(public productService: ProductService, private matDialog: MatDialog,private _liveAnnouncer: LiveAnnouncer,private _coreService: CoreService,) { }

  @ViewChild(MatSort) sort!: MatSort;


   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }




  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
     
  }
  
  ngOnInit() {
    
      this.listProduct();
   
  }
  isTrue(): Boolean{
    return this.dataSource && this.dataSource.data.length>0;
  }

  getimage(){
    this.products.forEach(product =>{
    this.productService.getphoto(product.productId).subscribe(
      (data: ArrayBuffer)=>{
        
          const byteArray = new Uint8Array(data);
          const blob = new Blob([byteArray], { type: 'image/png' }); // Change the MIME type accordingly
          product.imageUrl = URL.createObjectURL(blob);
          console.log("test    " + product.imageUrl)
        
        
      }
    )
  })
  }
   
  listProduct() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        this.getimage()
        console.log(this.products)
        this.dataSource = new MatTableDataSource(this.products);
        
      }
    )
  }

  applyFilter(event: KeyboardEvent) {
    
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
  }

  deleteProduct(id: number){
    this.productService.deleteProductById(id).subscribe(
      data => {
        console.log(data);
        this.listProduct();
        this._coreService.openSnackBar('Product with id : ' + id + ' has deleted')
      }
    )
  }

  updateStudent(id: number){
    this.productService.getProductById(id).subscribe(
        data => {
        }
      )
  }

  openDialogEdit(data:Product): void{

    console.log(data);
    
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "EditProduct",
      title: "Update Product",
      actionButtonText: "Edit",
      product: data
    }
  
    const dialogRef = this.matDialog.open(DialogEditComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {this.listProduct();} )
  }


  openDialogCreate(): void{
    
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "CreateProduct",
      title: "Create Product",
      actionButtonText: "Create",
    }
  
    const dialogRef = this.matDialog.open(DialogEditComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {
      this.listProduct();
    } )
  }



}


