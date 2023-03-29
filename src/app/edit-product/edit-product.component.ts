import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { ProductServiceService } from '../services/product-service.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  //..Variable
  productId!:string;
  productFormGroup!: FormGroup;
  productEdit!: Product

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private productService: ProductServiceService){}

  ngOnInit(): void {
    //..Recuperation la l'id du produit contenu dans le lien
    this.productId=this.route.snapshot.params["id"];

    this.productService.getProduct(this.productId).subscribe({
      next: (product)=>{
        this.productEdit=product;
        this.productFormGroup = this.fb.group({
          //..Le champ <name> est obligatoire et ....
          name: this.fb.control(this.productEdit.name, [Validators.required, Validators.minLength(10)]),
          price: this.fb.control(this.productEdit.price, [Validators.required, Validators.min(200)]),
          promotion:this.fb.control(this.productEdit.promotion, [Validators.required]),
        })
      }
    })
  }

  handleUpdateProduct(){
    let prod=this.productFormGroup.value;
    prod.id=this.productEdit.id;
    this.productService.updateProduct(prod).subscribe({
      next: (product)=>{
        alert("Product updated successfully....");
      },
      error: (err)=>{}
    })
  }


  getErrorMessage(field:string, error:any):string{
    //..Pour trouver les attributs => {{productFormGroup.controls["price"].errors | json}}
    if(error['required']){
      return field+" is required";
    }
    else if(error['minlength']){
      return field+" should have at least "+error['minlength']['requiredLength']+" characters";
    }
    else if(error['min']){
      return field+" should have min value "+error['min']['min'];
    }
    else return "";
  }
}
