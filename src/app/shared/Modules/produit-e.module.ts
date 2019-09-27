export enum Categorie{ TShirt,Boots,Balls}
export enum Size
{
    S,M,L,Xl,XXl
}
export class ProduitEModule { 
  idProduit:number;
  name:string;
  pictures:string;
  addate:string="hello";
  categorie:Categorie;
  isNew:boolean=true;
  description:string="jhjjejrq";
  limiteDate:string;
  startPrice:number;
  soldPrice:number;
  color:string;
  size:Size;
  brand:string;
}

