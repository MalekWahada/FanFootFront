import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { StoreComponent } from '../store/store.component';
import { ProduitModule } from '../shared/Modules/ProductQuantityModule';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: []
})
export class ProductComponent implements OnInit {

  // product details
  productDetails: ProduitModule;

  // check if user is logged in
  headerVisitor;
  headerLoggedIn;

  // quantity
  quant: number;

  constructor(private service: UserService, private toast: ToastrService) {
    /*this.formModel = fb.group({
      quant: [null,Validators.required, Validators.min(1),Validators.max(2000)],
    });*/
  }

  ngOnInit() {

    // set the app header if user is loggded in cause the store and th eproduct are shared between 
    // the logged in and the visitor
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
        this.productDetails = <ProduitModule>res;
        console.log("details  : " + this.productDetails)
      },
      err => {
        console.log(err);
      },
    );

  }

  errorQuantDis : boolean;
  onTypeQuant() {
    console.log( this.quant)
    if (this.quant > 0 && this.quant < this.productDetails.quantite)
      this.errorQuantDis = true;
    else this.errorQuantDis = false;
    console.log(this.errorQuantDis)
  }


  addToCart(idProd) {
    if (localStorage.getItem('token') == null)
      this.toast.warning("instructions", "Please make sure that you are logged in first !!")
    else {

       let jwt = localStorage.getItem('token');
       let jwtData = jwt.split('.')[1]
       let decodedJwtJsonData = window.atob(jwtData)
       var idUser = JSON.parse(decodedJwtJsonData).UserID;
       this.service.passOrder(idUser, idProd, this.quant).subscribe(
         res => {
           this.toast.show("your Order was submitted succesfully"
             , "please check your cart to complete purchase");
         },
         err => {
           console.log(err);
         },
       );
    }
  }

}
