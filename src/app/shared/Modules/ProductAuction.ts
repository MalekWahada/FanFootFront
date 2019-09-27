export enum Categorie { TShirt, Boots, Balls }
export enum Size {
    S, M, L, Xl, XXl
}
export class ProductAuction {
    idProduit: number;
    name: string;
    addate: string;
    categorie: Categorie;
    description: string;
    isNews: boolean;
    limiteDate: string;
    picture: string;
    soldPrice: number;
    startPrice: number;
    Color: string;
    brand: string;
    size: Size;
}