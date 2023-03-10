import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from '../model/product';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products !:Array<Product>;
    errorMessage !:string;
    searchFromGroup!: FormGroup;

    constructor(private productService:ProductServiceService, private fb:FormBuilder ){}
    ngOnInit(): void {
      this.searchFromGroup = this.fb.group({
        keyword: this.fb.control(null),
      })

     this.getAllProducts();
    }

    getAllProducts(){
      this.productService.getAllProduct().subscribe({
        next:(data)=>{
          this.products=data;
        },
        error:(err)=>{
          this.errorMessage=err;
        }
       })
    }

    deleteProduct(p:any){
      let mes=confirm("Etes-vous sur de vouloir supprimer ?");
      if(mes==false) return;
      this.productService.deleteProduct(p.id).subscribe({
        next:(data)=>{
          let index=this.products.indexOf(p);
          this.products.splice(index,1);
        },
        error:(err)=>{
          this.errorMessage=err;
        }
      })
    }

    onPromo(p:Product){
      let promo = p.promotion;
      this.productService.setPromotion(p.id).subscribe({
        next:(data)=>{
            p.promotion = !promo;
        },
        error:(err)=>{
            this.errorMessage=err;
        }
      })
      
    }
    
    searchProduct(){
      let keyword = this.searchFromGroup.value.keyword;
      this.productService.findProduct(keyword).subscribe({
        next:(data)=>{
            this.products=data;
        },
        error:err=>{
          this.errorMessage=err;
        }
      })
    }
   
}
