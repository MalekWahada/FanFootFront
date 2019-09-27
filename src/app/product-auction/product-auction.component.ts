import { Component, OnInit } from '@angular/core';
import { ProductAuction } from '../shared/Modules/ProductAuction';
import { ProdAuctionService } from '../shared/produitServ/prod-auction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-auction',
  templateUrl: './product-auction.component.html',
  styles: []
})
export class ProductAuctionComponent implements OnInit {

  constructor(private service: ProdAuctionService, private toastr: ToastrService) { }
  // product details
  productDetails: ProductAuction;

  headerLoggedIn;
  headerVisitor;
  offer: number;
  displayMOffer;
  mm;
  min2DispMaxOff;

  ngOnInit() {
    // set header depending on token 
    if (localStorage.getItem('token') != null) {
      this.headerLoggedIn = true;
      this.headerVisitor = false;
    }
    else {
      this.headerLoggedIn = false;
      this.headerVisitor = true;
    }

    // parameter passed directly from store componenet
    this.service.getProductDetails().subscribe(
      res => {
        this.productDetails = <ProductAuction>res;
        console.log("details  : " + this.productDetails)

        // display max offer or not

        this.service.getMaxOffer().subscribe(
          res => {
            if (res == 0)
              this.displayMOffer = false;
            else {
              this.displayMOffer = true;
              this.mm = res;
            }
          },
          err => {
            console.log(err);
          },
        );
      },
      err => {
        console.log(err);
      },
    );


  }

  // display the left time or expired time 
  checkTendTime() {
    var limiteDate1 = new Date(this.productDetails.limiteDate);
    var diffTime = limiteDate1.getTime() - new Date().getTime();
    console.log("cond    " + diffTime)
    if (diffTime > 0)

      {
        if(diffTime <= 300000)
        this.min2DispMaxOff = true; 
        else this.min2DispMaxOff = false;
        return true}
    else
      {return false}

  }

  // make an auction offer
  propose() {
    if (this.offer == null)
      this.toastr.error("make an offer");
    else {

      this.service.postAuctionOffer(new Date(), this.offer).subscribe(
        res => {
          this.toastr.success("offer made succesfully");
          this.offer = null;

          // repost the max offer
          this.service.getMaxOffer().subscribe(
            res => {
              this.mm = res;
            },
            err => {
              console.log(err);
            },
          );
        },
        err => {
          console.log(err);
        },
      );





    }
  }



}
