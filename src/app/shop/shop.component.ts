import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShopService } from './shop.service';
import { QueryFilters } from '../shared/models/query-filters';
import { Products } from '../shared/models/products';
import { ApiResponse } from '../shared/models/api-response';
import { Pagination } from '../shared/models/pagination';
import { Brand } from '../shared/models/brand';
import { Guid } from 'guid-typescript';
import { ProductType } from '../shared/models/product-type';
import { FilterOptions } from '../shared/models/filter-options';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  @ViewChild('searchText') searchTerm?:ElementRef;
  products: Products[] = [];
  brands: Brand[] = [];
  productTypes: ProductType[] = [];
  brandIdSelected: Guid = Guid.createEmpty();
  typeIdSelected: Guid = Guid.createEmpty();
  totalRecords: number = 0;
  query: QueryFilters = {
    pageNumber: 1,
    pageSize: 10,
    searchText: '',
    filterOptions: []
  };


  constructor(private shopService: ShopService){}
  ngOnInit(): void {
    this.getBrands();
    this.getProductTypes();
    this.getFilteredProducts();
  }

  getBrands(){
    this.shopService.getbrands().subscribe({
      next: (response: ApiResponse<Pagination<Brand[]>>) => {  
         this.brands = 
         [{ id: Guid.createEmpty(), name: 'All'}, ...response.model.data]; 
       
        },
      error: error => console.log(error)
    });
  }
  getProductTypes(){
    this.shopService.getProductTypes().subscribe({
      next: (response: ApiResponse<Pagination<ProductType[]>>) => {
         this.productTypes = [{id: Guid.createEmpty(), name: 'All'}, ...response.model.data]
        },
      error: error => console.log(error)
    });
  }
  
    getProducts(){
      this.shopService.getProducts().subscribe({
        next: (response: ApiResponse<Pagination<Products[]>>) => {
           this.products = response.model.data
          },
        error: error => console.log(error)
      });
    }
  
    getFilteredProducts(){
      this.query.filterOptions = this.getProductFilters();
      this.shopService.getFilteredProducts(this.query).subscribe({
        next: (response: ApiResponse<Pagination<Products[]>>) => {
          this.totalRecords = response.model.totalCount;
          this.query.pageNumber = response.model.pageNumber;
          this.query.pageSize = response.model.pageSize;
           this.products = response.model.data
          },
        error: error => console.log(error)
      });
    }
  
    onBrandSelected(brandId:Guid)  {
      this.brandIdSelected = brandId;
      this.query.pageNumber = 1;
      this.getFilteredProducts();
    }
    onTypeSelected(typeId:Guid)  {
      this.typeIdSelected = typeId;
      this.query.pageNumber = 1;
      this.getFilteredProducts();
    }
   onPageChanged(pageNumber:number){
     if(this.query.pageNumber != pageNumber){
         this.query.pageNumber = pageNumber;
         this.getFilteredProducts();
     }
   }
   onSearch(){
    this.query.searchText = this.searchTerm?.nativeElement.value;
    this.query.pageNumber = 1;
    this.getFilteredProducts();
   }
   onReset(){
    if(this.searchTerm) 
      this.searchTerm.nativeElement.value = '';
  
    this.query.searchText = '';
    this.getFilteredProducts();
   }
    getProductFilters(): FilterOptions[] {
      
      var filterOptions= [];
      if(this.query.searchText != ''){
        filterOptions.push(
          {
            optionName: 'Name', 
            optionValue: this.query.searchText.trim(),
            operator:'like'
          });
  
      }
      if(this.brandIdSelected.toString() !== Guid.EMPTY){
        filterOptions.push(
          {
            optionName: 'ProductBrandId', 
            optionValue: this.brandIdSelected.toString(),
            operator:'='
          });
       }
       if(this.typeIdSelected.toString() !== Guid.EMPTY) {
          filterOptions.push(
              {
                optionName: 'ProductTypeId', 
                optionValue: this.typeIdSelected.toString(),
                operator:'='
              });
        }
        return filterOptions;   
    }

}
