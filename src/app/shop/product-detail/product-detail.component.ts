import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from 'src/app/shared/models/products';
import { ShopService } from '../shop.service';
import { BreadcrumbService } from 'xng-breadcrumb';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  product!: Products;

  constructor(private shopService: ShopService, 
              private activateRoute: ActivatedRoute,
              private bcService: BreadcrumbService) {

    this.bcService.set('@productDetail',' ');
  }
  ngOnInit(): void {
    this.loadProduct();
  }

  loadProduct(){
    var id =this.activateRoute.snapshot.params['id'];
    if(id){
      this.shopService.getProductById(id).subscribe({
        next: response => {
          this.product = response.model.data;
          this.bcService.set('@productDetail',this.product.name);
        },
        error: err => console.log(err)
      });
    }
  }
}
