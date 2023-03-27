import { Injectable } from '@angular/core';
import { UUID } from 'angular2-uuid';
import { Observable, of, throwError } from 'rxjs';
import { PageProduct, Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private products!:Array<Product>;
  constructor() {
    this.products=[
      {id:UUID.UUID(), name:"computer", price:15245, promotion:true},
      {id:UUID.UUID(), name:"tablette", price:1450,promotion:false},
      {id:UUID.UUID(), name:"smart phone", price:5000, promotion:false},
      {id:UUID.UUID(), name:"chargeur type c", price:1250, promotion:true},
      {id:UUID.UUID(), name:"sac au dos", price:3500, promotion:false},
      {id:UUID.UUID(), name:"souris sans fil", price:1050, promotion:true},
      {id:UUID.UUID(), name:"protege pc", price:9250, promotion:true},
      {id:UUID.UUID(), name:"iphone 14 pro max", price:5000,promotion:false}
    ];
  //   for (let i = 0; i < 10; i++) {
  //     this.products.push({id:UUID.UUID(), name:"computer", price:15245, promotion:true});
  //     this.products.push({id:UUID.UUID(), name:"computer", price:15245, promotion:true});
  //     this.products.push({id:UUID.UUID(), name:"computer", price:15245, promotion:true});
  //     this.products.push({id:UUID.UUID(), name:"iphone 14 pro max", price:5000,promotion:false});
  // }
  }
  //..methode qui retourne la liste des produits
  public getAllProduct(): Observable<Array<Product>>{
    return of([...this.products]);
  }

  public getPageAllProduct(page:number, size:number): Observable<PageProduct>{
    let index = size*page;
    let totalPage=~~this.products.length/size;
    if(this.products.length % size != 0){
      totalPage++;
    }
    let pageProducts = this.products.splice(index, index+size);
    return of({page: page, size:size, totalPages:totalPage, product:pageProducts});

  }

  //..supprimer un product
  public deleteProduct(id:string): Observable<boolean>{
    this.products= this.products.filter(p=>p.id != id);
    return of(true);
  }

  //.. Mettre un produit en promotion ou non
  public setPromotion(id:string): Observable<boolean>{
    let prod=this.products.find(p=>p.id==id);
    if(prod != undefined){
      prod.promotion = !prod.promotion;
      return of(true);
    }else{
      return throwError(()=> new Error("Product not found"));
    }
  }

  public findProduct(keyword: string) : Observable<Product[]>{
    //..on cherche les produits dont le nom contient <keyword>
     let product= this.products.filter(p=>p.name.includes(keyword));
     return of(product);
  }



}
