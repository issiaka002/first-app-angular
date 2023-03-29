import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {

  productFormGroup!:FormGroup;

  constructor(private fb:FormBuilder){}

  ngOnInit(): void {
    this.productFormGroup = this.fb.group({
      //..Le champ <name> est obligatoire et ....
      name: this.fb.control(null, [Validators.required, Validators.minLength(10)]),
      price: this.fb.control(null, [Validators.required, Validators.min(200)]),
      promotion:this.fb.control(false, [Validators.required]),
    })
  }

  handleAddProduct(){
    // console.log(this.productFormGroup.value);

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
