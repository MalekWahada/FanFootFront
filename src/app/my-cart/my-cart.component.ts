import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Cart } from '../shared/Modules/Cart';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Order } from '../shared/Modules/Order';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styles: [],
  animations: [trigger('fadeInOut', [
    state('void', style({
      opacity: 0
    })),
    transition('void <=> *', animate(1000)),
  ]),]
})
export class MyCartComponent implements OnInit {

  constructor(private service: UserService) { }

  headerVisitor;
  headerLoggedIn;

  orders : Order[];
  totCart;

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


    ///// get my orders

    this.service.GetMyOrders(this.service.getIdUser()).subscribe(
      res => {

        this.orders = <Order[]>res;
      },
      err => {
        console.log(err);
      },
    );


    ////// get the cart's total
    this.service.GetTotalCart(this.service.getIdUser()).subscribe(
      res => {
        this.totCart = <Cart>res;
      },
      err => {
        console.log(err);
      },
    );
  }

  deleteFieldValue(index,idOrder) {
    
    alert(idOrder)
    this.service.removeOrder(idOrder).subscribe(
      res => {

      },
      err => {
       
      },
    );
    this.orders.splice(index, 1);
}

}
