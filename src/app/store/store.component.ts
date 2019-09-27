import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ProduitModule } from '../shared/Modules/ProductQuantityModule';
import { Options, LabelType } from 'ng5-slider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styles: []
})
export class StoreComponent implements OnInit {

  minval;
  maxval;
  // for price range slider
  minValue: number = 0;
  maxValue: number = 400;
  options: Options = {
    floor: 0,
    ceil: 400,
    translate: (value: number, label: LabelType): string => {
      switch (label) {
        case LabelType.Low:
          this.minval = value;
          return '<b>Min price:</b> $' + value;
        case LabelType.High:
          this.maxval = value;
          return '<b>Max price:</b> $' + value;
        default:
          //this.val =value;
          return '$' + value;
      }
    }
  };

  // enum category
  private Categories = [
    { Id: '1', Name: "Balls", checked: false },
    { Id: '2', Name: "Tshirt", checked: false },
    { Id: '3', Name: "Boots", checked: false }];

  // enum colors
  private Colors = [
    { Id: '0', Name: "blue", style: "checkboxOne", checked: false },
    { Id: '1', Name: "yellow", style: "checkboxTwo", checked: false },
    { Id: '2', Name: "black", style: "checkboxThree", checked: false },
    { Id: '3', Name: "gray", style: "checkboxFour", checked: false },
    { Id: '4', Name: "green", style: "checkboxFive", checked: false },
    { Id: '5', Name: "red", style: "checkboxSix", checked: false },
    { Id: '6', Name: "orange", style: "checkboxSeven", checked: false },];




  constructor(private service: UserService, private router: Router) { }

  // for filter
  products: ProduitModule[] = [];
  colorsChecked = [];
  categoriesChecked = [];

  // check if user is logged in
  headerVisitor;
  headerLoggedIn;

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


    // initialise products
    this.service.getProducts().subscribe(
      res => {

        this.products = <ProduitModule[]>res;
      },
      err => {
        console.log(err);
      },
    );
  }

  // search filters 
  onFilterChange() {

    this.products = [];
    this.colorsChecked = [];
    this.categoriesChecked = [];

    // get selected colors
    
    for (var i = 0; i < this.Colors.length; i++) {
      if (this.Colors[i].checked == true)
        this.colorsChecked.push(this.Colors[i].Name);
    }

    // get selected categories
    
    for (var i = 0; i < this.Categories.length; i++) {
      if (this.Categories[i].checked == true)
        this.categoriesChecked.push(this.Categories[i].Name);
    }
    
    if (this.colorsChecked.length != 0) {
      for (var i = 0; i < this.colorsChecked.length; i++) {
        if (this.categoriesChecked.length != 0)
          for (var i = 0; i < this.categoriesChecked.length; i++) {
            this.callServ(this.colorsChecked[i], this.categoriesChecked[i]);
          }
        else this.callServ(this.colorsChecked[i], 0);
      }
    }
    else {
      if (this.categoriesChecked.length != 0)
        for (var i = 0; i < this.categoriesChecked.length; i++) {
          this.callServ(null, this.categoriesChecked[i]);
        }
      else this.callServ(null, 0);
    }

  }

  callServ(color, category) {
    this.service.filterProducts(this.minval, this.maxval, category, color).subscribe(
      res => {
        this.products.push.apply(this.products,<ProduitModule[]> res);
      },
      err => {
        console.log(err);
      },
    );
  }

  // set prod id so it will be displayed on product page
  goToProd(idProd1) {
    this.service.sourceIdProd(idProd1);
    this.router.navigateByUrl('/product')
  }

}
  // get all products by price
/*this.service.filterProducts(this.minval, this.maxval, 0, null).subscribe(
  res => {
    console.log("resssssssssssssssssssssssssssssss")
    this.products = <ProduitModule[]>res;
  },
  err => {
    console.log(err);
  },
);
console.log("length of products before filtering: " + this.products.length)*/


    // apply filter creteria to all products
    // this.products = [];
    //if(colorsChecked.length != 0 && categoriesChecked.length != 0)
/*this.products = this.products.filter(function (el) {
  return colorsChecked.includes(el.color)
    && categoriesChecked.includes(el.categorie)
});*/

    // make sure there is no duplicated items
    //this.products = Array.from(new Set(this.products));
    //console.log("length of products: " + this.products.length)