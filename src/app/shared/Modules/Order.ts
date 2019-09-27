import { ProduitModule } from './ProductQuantityModule';

export class Order{
    idOrder: number;
    OrederDate : string; 
    quantity : number;
    idProduct : number;
    idCart :number;
    product : ProduitModule;
}