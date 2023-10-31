import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../common/Product';
import { ProductCategory } from 'src/app/common/ProductCategory';
import { ProductService } from 'src/app/services/product.service';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CoreService } from 'src/app/services/core.service';
import { TableColumn } from '../../components/table/TableColumn';
import { CategoryService } from 'src/app/services/Category.service';
import { DialogCategoryComponent } from '../dialog-category/dialog-category.component';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { catchError, map, retry, startWith, switchMap, tap, throwError } from 'rxjs';
import { ThisReceiver } from '@angular/compiler';
import { Category } from 'src/app/common/Category.model';

@Component({
  selector: 'app-products-categories',
  templateUrl: './products-categories.component.html',
  styleUrls: ['./products-categories.component.scss'],
})

export class ProductsCategoriesComponent implements OnInit,AfterViewInit {
  
  displayedColumns: string[] = ['CategoryId' ,'CategoryName','ProductNum','CreationDate', 'action'];
  CategoryProduct:Category[]=[];
  dataSource = new MatTableDataSource<Category>(this.CategoryProduct);

  // isValid: Boolean = this.dataSource && this.dataSource.data.length > 0;
  
  filterValue : string ='';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  productCategory!:Category;
  test:string="";
  @ViewChild(MatSort) sort!: MatSort;
  currentPage = 0;
  pageSize = 5;
  orderPage='asc';
  // length=8;
  categNum=0;
  constructor( private matDialog: MatDialog,
               private _liveAnnouncer: LiveAnnouncer,
               private _coreService: CoreService,
               private categoryService: CategoryService) 
               {}


   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }


  listCategory(){
    this.categoryService
    .getCategories()
    .subscribe((data) => this.categNum=data.length )
  }
 
  loadCategoryPage():void{
    
    this.categoryService
    .findCategory(
      this.paginator?.pageIndex ?? 0,
      this.paginator?.pageSize ?? 5,
      this.sort?.active ?? "CategoryId",
      this.sort?.direction ?? "asc")
      .subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data.content);  
    });
  }

  ngOnInit(){
     this.loadCategoryPage();
     this.listCategory();
    //  console.log(this.categoryService.getCategories().subscribe(data => data)) 
  }

  ngAfterViewInit() {
      this.paginator.page
      .subscribe(()=>{
        this.dataSource = new MatTableDataSource(this.loadCategoryPage() as any) ;
      });
      this.sort.sortChange.pipe(
      ).subscribe(
        ()=>{
        this.dataSource = new MatTableDataSource(this.loadCategoryPage() as any) 
      }
      );
      
  }

  isTrue(): Boolean{
    // console.log(this.dataSource);
    // return this.dataSource && this.dataSource.data.length!=0;
    return true;
  }
  
  
  applyFilter(event: KeyboardEvent) {
    this.filterValue = (event.target as HTMLInputElement).value;
   
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
   
  }

  deleteProduct(id: number){
    this.categoryService.deleteCategoryById(id).subscribe(
      data => {
       
        this.loadCategoryPage();
        this._coreService.openSnackBar('Category with id : ' + id + ' has deleted')
      }
    )
  }

  openDialogEdit(data:ProductCategory):void {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "EditCategory",
      title: "Update Category",
      actionButtonText: "Edit",
      category: data
    }
  
    const dialogRef = this.matDialog.open(DialogCategoryComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {this.loadCategoryPage();} )
  }


  openDialogCreate(): void{
    
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = true;
    dialogConfig.width = "500px";
    dialogConfig.data = {
      name: "CreateCategory",
      title: "Create category",
      actionButtonText: "Create",
    }
  
    const dialogRef = this.matDialog.open(DialogCategoryComponent,dialogConfig);
    dialogRef.afterClosed().subscribe( result => {
      this.loadCategoryPage();
    } )
  }
  
}

