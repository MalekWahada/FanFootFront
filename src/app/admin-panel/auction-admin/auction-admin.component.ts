import { Component, OnInit } from '@angular/core';
import { ProdAuctionService } from 'src/app/shared/produitServ/prod-auction.service';
import { AuctionProdAdmin } from 'src/app/shared/Modules/AuctionProdAdmin';

@Component({
  selector: 'app-auction-admin',
  templateUrl: './auction-admin.component.html',
  styles: []
})
export class AuctionAdminComponent implements OnInit {

  productsAuctions: AuctionProdAdmin[] = [];


  constructor(private service: ProdAuctionService) { }

  ngOnInit() {


    // initialise Auction products
    this.service.getAuctionOffers().subscribe(
      res => {

        this.productsAuctions = <AuctionProdAdmin[]>res;
        this.productsAuctions.forEach(a => console.log(a.name+" "+a.offerDate))
      },
      err => {
        console.log(err);
      },
    );
  }

}
