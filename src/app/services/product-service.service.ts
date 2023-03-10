import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private products!:Array<Product>;
  constructor() { 
    this.products=[
      {id:1, name:"computer", price:15245, promotion:true},
      {id:2, name:"tablette", price:1450,promotion:false},
      {id:3, name:"smart phone", price:5000, promotion:true},
      {id:3, name:"chargeur type c", price:1250, promotion:true},
      {id:3, name:"iphone 14 pro max", price:5000,promotion:false}
    ];
  }

  //..methode qui retourne la liste des produits
  public getAllProduct(): Observable<Array<Product>>{
    return of([...this.products]);
  }

  //..supprimer un product
  public deleteProduct(id:number): Observable<boolean>{
    this.products= this.products.filter(p=>p.id != id);
    return of(true);
  }

  public setPromotion(id:number): Observable<boolean>{
    let prod=this.products.find(p=>p.id==id);
    if(prod != undefined){
      prod.promotion = !prod.promotion;
      return of(true);
    }else{
      return throwError(()=> new Error("Product not found"));
    }
  }

  public findProduct(keyword: string) : Observable<Product[]>{
     let product= this.products.filter(p=>p.name.includes(keyword));
     return of(product);
  }



}
