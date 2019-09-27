import { Component, OnInit } from '@angular/core';
import { ProduitService } from 'src/app/shared/produitServ/produit.service';
import { NgForm } from '@angular/forms';
import { Categorie, Size } from 'src/app/shared/Modules/ProductQuantityModule';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  fileName :string =null;
  model;
  
    constructor(private service:ProduitService) { }
    HideFormulaire:boolean;
    ngOnInit() {
      this.resteForm();
      this.resteFormQ();
      this.HideFormulaire=false;
    
    }
  
    onSumbit(form:NgForm){
        console.log(form.value)
    }
    
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
  
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
  
    return value;
  }
    hide(){
     this.HideFormulaire=!this.HideFormulaire;
     console.log(Date.now().toString());
    }
    resteForm(form?:NgForm){
      if(form!=null)  
        form.resetForm();
      this.service.formDataEncher={
        idProduit:0,
        name:"",
        addate:"",
        pictures:"",
        categorie:Categorie.Balls,
        description:"",
        isNew:true,
        limiteDate:"",
        startPrice:0,
        soldPrice:0,
        brand:"",
        color:"",
        size:Size.L,
       } 
    }
  
    resteFormQ(form?:NgForm){
      if(form!=null)  
        form.resetForm()
      this.service.formData={
        idProduit:0,
        price:0,
        name:"",
        addate:"",
        pictures:"",
        categorie:Categorie.Balls,
        description:"",
        isNew:true,
        priceAfterDiscount:0,
        quantite:0,
        rating:0,
        brand:"",
        color:"",
        size:Size.L,
      
       } 
    }
    selcted(n){
      console.log(n);
    }
    onSubmit(form:NgForm){
      this.service.ajouterProduitEncher(form.value).subscribe();
  
      }
      onSubmitQ(form:NgForm){
        this.service.ajouterProduit(form.value).subscribe();
    
        }
        fileSelected(event){
          console.log(event)
        }

}
