import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QueryFilters } from '../shared/models/query-filters';
import { ApiResponse } from '../shared/models/api-response';
import { Pagination } from '../shared/models/pagination';
import { Products } from '../shared/models/products';
import { environment } from 'src/environments/environment';
import { Guid } from 'guid-typescript';
import { Brand } from '../shared/models/brand';
import { ProductType } from '../shared/models/product-type';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getProductById(id: Guid){
    return this.http.get<ApiResponse<Pagination<Products>>>(
                    this.baseUrl + 'products/' + id); 
  }
    
  getProducts(){
      return this.http.get<ApiResponse<Pagination<Products[]>>>(
                      this.baseUrl + 'products'); 
  }

  getFilteredProducts(query: QueryFilters){
    return this.http.post<ApiResponse<Pagination<Products[]>>>(
                   this.baseUrl + 'products/getFilteredProducts',query
                );
   }

   getbrands(){
    return this.http.get<ApiResponse<Pagination<Brand[]>>>(
                    this.baseUrl + 'productBrand');
   
   }
  
   getProductTypes(){
    return this.http.get<ApiResponse<Pagination<ProductType[]>>>(
                    this.baseUrl + 'productType');
   
   }
}
