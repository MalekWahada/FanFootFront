import { Component, OnInit } from '@angular/core';
import { ProduitModule } from 'src/app/shared/Modules/ProductQuantityModule';
import { ProduitService } from 'src/app/shared/produitServ/produit.service';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {

  listProduit:ProduitModule[]=[]
 
  constructor(private service:ProduitService ) {
    //this.listProduit=new ProduitModule();
   }
  ngOnInit() {
 this.service.afficherProduitQ().subscribe(res=>{
 
   this.listProduit=res;
  // console.log(this.k)
 // console.log(this.listProduit)

 
    
   }
  
     );
     
      
  }

hello(){
  console.log(this.listProduit[0]);
  
 
}

}
