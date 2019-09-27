import { Component, OnInit, ElementRef } from '@angular/core';
import { ProdAuctionService } from '../shared/produitServ/prod-auction.service';
import { ProductAuction } from '../shared/Modules/ProductAuction';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-auction',
  templateUrl: './store-auction.component.html',
  styles: []
})
export class StoreAuctionComponent implements OnInit {


  // check if user is logged in
  headerVisitor;
  headerLoggedIn;

  // prod auction[]
  products: ProductAuction[] = [];


  // for time display
  
 


  constructor(private service: ProdAuctionService, private router:Router, private toast: ToastrService) {
  }


  ngOnInit() {

   
    if (localStorage.getItem('token') != null) {
      this.headerLoggedIn = true;
      this.headerVisitor = false;
    }
    else {
      this.headerLoggedIn = false;
      this.headerVisitor = true;
    }

    // initialise products
    this.service.getAuctionProds().subscribe(
      res => {

        this.products = <ProductAuction[]>res;
      },
      err => {
        console.log(err);
      },
    );
    
  }


  ViewAuction(idProd)
  {
    if (localStorage.getItem('token') == null)
      this.toast.warning("Informations", "Please make sure that you are logged in first !!")

      else     {this.service.sourceIdProd(idProd);
        this.router.navigateByUrl('/productAuction')}

  }
  checkTendTime(limiteDate)
  {
    var limiteDate1 = new Date(limiteDate) ;
    var diffTime = limiteDate1.getTime()- new Date().getTime();
    console.log("cond    "+diffTime)
    if(diffTime > 0)
   
    return true
    else  
    return false
 
  }
}
/*
 private message: string;


  private _trialEndsAt: string;
  private _diff: number;
  private _days: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;

  setTime(t)
  {
    console.log(' t val:  '+ t)
    this._trialEndsAt=t
    Observable.interval(1000).map((x) => { 
      this._diff = Date.parse(this._trialEndsAt) - Date.parse(new Date().toString());
    }).subscribe((x) => {
      this._days = this.getDays(this._diff);
      this._hours = this.getHours(this._diff);
      this._minutes = this.getMinutes(this._diff);
      this._seconds = this.getSeconds(this._diff);
      // 
      if (this._days > 0)
        this.message = this._days+" d "+this._hours + " h "
      else if (this._days <= 0 && this._hours > 0)
        this.message = this._hours + " h " + this._minutes + " m "
      else if (this._days <= 0 && this._hours <= 0 && this._minutes > 0)
        this.message = this._minutes + " m " + this._seconds + " s "
      else if(this._days <= 0 && this._hours <= 0 && this._minutes <= 0 && this._seconds > 0)
        this.message = this._seconds + " s "
      else if (this._seconds <= 0)
        this.message = "Expired ...."
    });
    console.log('message : '+this.message)
    return this.message;
  }

  getDays(t) {
    return Math.floor(t / (1000 * 60 * 60 * 24));
  }

  getHours(t) {
    return Math.floor((t / (1000 * 60 * 60)) % 24);
  }

  getMinutes(t) {
    return Math.floor((t / 1000 / 60) % 60);
  }

  getSeconds(t) {
    return Math.floor((t / 1000) % 60);
  }*/