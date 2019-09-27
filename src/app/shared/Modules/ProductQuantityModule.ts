export enum Categorie{ TShirt,Boots,Balls}
export enum Size
{
    S,M,L,Xl,XXl
}
export class ProduitModule {
  idProduit:number;
  name:string;
  price:number;
  pictures:string;
  addate:string;
  categorie:Categorie;
  isNew:boolean=true;
  description:string;
  quantite:number;
  priceAfterDiscount:number;
  rating:number;
  color:string;
  size:Size;
  brand:string;
 }