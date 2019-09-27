import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProduitEModule } from '../Modules/produit-e.module';
import { ProduitModule, Categorie } from '../Modules/ProductQuantityModule';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  formData:ProduitModule;
  formDataEncher:ProduitEModule;
  CategorieData:Categorie;
  Produits:ProduitModule[];
    constructor(private http:HttpClient) { }
  
    ajouterProduit(formData:ProduitModule){
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      var yyyy =String( today.getFullYear());
      var t:string;
      t = mm + '-' + dd + '-' + yyyy;
     formData.addate=t;
      formData.name="hamza";
      formData.description="helloooooooo";
    return this.http.post("http://localhost:56058/api/ProduitQuantites",formData);
   
  }
    ajouterProduitEncher(formDataEncher:ProduitEModule){       
      return this.http.post("http://localhost:56058/api/ProduitEnchers",formDataEncher);
    }
  
    afficherProduitQ():Observable<ProduitModule[]>
    {
       return this.http.get<ProduitModule[]>("http://localhost:56058/api/ProduitQuantites");
    }




}
