import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class ProdAuctionService {

  constructor(private http: HttpClient, private servUser:UserService) { }

  readonly BaseURI = 'http://localhost:56058/api';


  getAuctionProds() {
    return this.http.get(this.BaseURI + '/ProduitEnchers');
  }

  // get prod details

  idProd: number;

  sourceIdProd(m) {
    this.idProd = m;
  }
  receiverIdProd() {
    return this.idProd;
  }

  // get product Details
  getProductDetails() {
    return this.http.get(this.BaseURI + '/ProduitEnchers/' + this.idProd);
  }

  // add and update auction offer
  postAuctionOffer(date,price) {
    var body = {
      IdUser: this.servUser.getIdUser(),
      IdProduct: this.idProd,
      ProposeDate: date,
      ProposedPrice: price
    };
    return this.http.post(this.BaseURI + '/ProduitEnchers/AuctionPropose', body);
  }

  // get max price for an auction offer
  getMaxOffer() {
    return this.http.get(this.BaseURI + '/ProduitEnchers/MaxAuction/'+this.idProd );
  } //http://localhost:56058/api/ProduitEnchers/MaxAuction/24


  // get offers for admin panel
  getAuctionOffers() {
    return this.http.get(this.BaseURI + '/ProduitEnchers/AuctionOffers');
  } 

}
