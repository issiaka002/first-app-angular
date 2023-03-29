import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../model/product';
import { AuthService } from '../services/auth.service';
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

    //..pagination
    currentPage:number=0;
    pageSize:number=5;
    totalPage!:number;

    //..le constructeur sert a injecter les service et autre module supplementaire
    constructor(private productService:ProductServiceService, private fb:FormBuilder, public authService: AuthService, private router:Router ){}

    ngOnInit(): void {
      //..Declaration des differents champs dans le formulaire (data binding)
      this.searchFromGroup = this.fb.group({
        keyword: this.fb.control(null),
      })

     this.getAllProducts();
    }

    //..pagination
    getPageProducts(){
      this.productService.getPageAllProduct(this.currentPage, this.pageSize).subscribe({
        next:(data)=>{
          this.products=data.product;
          this.totalPage=data.totalPages;
        },
        error:(err)=>{
          this.errorMessage=err;
        }
       })
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
      //..on prend la valeur du champ input
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

    handleNewProduct(){
      this.router.navigateByUrl("/admin/new-product")
    }

}
