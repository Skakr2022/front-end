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
import { MatPaginator } from '@angular/material/paginator';
import { catchError, tap, throwError } from 'rxjs';
import { _isNumberValue } from '@angular/cdk/coercion';
import { SortingDataAccessorService } from 'src/app/services/sorting-data-accessor.service';
import { Category } from 'src/app/common/Category.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})


export class ProductsComponent implements OnInit{
  
  displayedColumns: string[] = ['name' ,'category.categoryName', 'description', 'lastUpdate','action'];

  products:Product[]=[];
  dataSource=new MatTableDataSource<Product>(this.products);
  // dataSource!:MatTableDataSource<Product>;
  filterValue : string ='';
  
  // isValid: Boolean = this.dataSource && this.dataSource.data.length > 0;

  test:string="";
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  productNum=0;

  
  constructor(public productService: ProductService,
              private matDialog: MatDialog,
              private _liveAnnouncer: LiveAnnouncer,
              private _coreService: CoreService,
              private sortingService: SortingDataAccessorService) { 
                this.dataSource.filterPredicate = (data: any, filter:string) => { 
                  console.log('hello');
                  const datastr =JSON.stringify(data.category.categoryName).toLowerCase();
                  return datastr.indexOf(filter) != -1;
                } 
  }

   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  loadProductPage(){
    this.productService
    .findProduct(
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 3,
      this.sort?.active ?? 'name',
      this.sort?.direction ?? "asc")
  
    .subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data.content);
    })
  }
  
  ngOnInit() {
      this.listProduct();
      this.loadProductPage();
      this.dataSource.sortingDataAccessor=this.sortingService.sortingDataAccessor;
      
  }

  ngAfterViewInit() {
     this.paginator.page
     .pipe(
      tap(()=> this.loadProductPage())
     )
     .subscribe()
     
     this.sort.sortChange
     .pipe(
      tap(()=> this.loadProductPage())
     )
     .subscribe()
  }

  isTrue(): Boolean{
    // return this.dataSource && this.dataSource.data.length>0;
    return true;
  }

  getimage(){
    this.products.forEach(product =>{
    this.productService.getphoto(product.productId).subscribe(
      (data: ArrayBuffer)=>{
          const byteArray = new Uint8Array(data);
          const blob = new Blob([byteArray], { type: 'image/png' }); // Change the MIME type accordingly
          product.imageUrl = URL.createObjectURL(blob);
          console.log("test" + product.imageUrl)
        
      }
    )
  })
  }
   
  listProduct() {
    this.productService.getProducts()
      .subscribe( data => this.productNum= data.content.length )
  }

  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: any, filter: string) => {
       const category = JSON.stringify(data.category.categoryName).toLowerCase();
       const name = JSON.stringify(data.name).toLowerCase();
       const description = JSON.stringify(data.description).toLowerCase();
       const lastUpdate = JSON.stringify(data.lastUpdate).toLowerCase();
       filter = filter.toLowerCase(); 
      return   category.includes(filter) 
            || name.includes(filter) 
            || description.includes(filter)
            || lastUpdate.includes(filter);
    };
  
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


