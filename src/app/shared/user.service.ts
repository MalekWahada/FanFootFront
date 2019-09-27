import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  readonly BaseURI = 'http://localhost:56058/api';

  formModel = this.fb.group({
    UserName: ['', Validators.required],
    Email: ['', Validators.email],
    FullName: [''],
    Gender: [],
    FavoriteTeam: [],
    BirthDate: [],
    Passwords: this.fb.group({
      Password: ['', [Validators.required, Validators.minLength(4)]],
      ConfirmPassword: ['', Validators.required]
    }, { validator: this.comparePasswords })

  });

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('ConfirmPassword');
    //passwordMismatch
    //confirmPswrdCtrl.errors={passwordMismatch:true}
    if (confirmPswrdCtrl.errors == null || 'passwordMismatch' in confirmPswrdCtrl.errors) {
      if (fb.get('Password').value != confirmPswrdCtrl.value)
        confirmPswrdCtrl.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl.setErrors(null);
    }
  }

  register() {
    console.log(this.formModel.value.BirthDate.date)
    let date = this.formModel.value.BirthDate.date.day+"/"+this.formModel.value.BirthDate.date.month+"/"+this.formModel.value.BirthDate.date.year;

    /*let date = new Date();
        this.formModel.patchValue({myDate: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()}
        }});
        console.log("hhhhhh   "+date)*/

    var body = {
      UserName: this.formModel.value.UserName,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Gender: this.formModel.value.Gender,
      Password: this.formModel.value.Passwords.Password,
      FavoriteTeam: this.formModel.value.FavoriteTeam,
      BirthDate: date
    };
    // console.log('gender selected  :  ' + this.formModel.value.Gender + ' username :' + this.formModel.value.UserName);
    return this.http.post(this.BaseURI + '/ApplicationUser/Register', body);
  }

  login(fromData) {
    return this.http.post(this.BaseURI + '/ApplicationUser/Login', fromData);
  }

  getUserProfile(id) {
    return this.http.get(this.BaseURI + '/UserProfile22/' + id);
  }

  // user role login
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
    var userRole = payLoad.role;
    allowedRoles.forEach(element => {
      if (userRole == element) {
        isMatch = true;
        return false;
      }
    });
    return isMatch;
  }
  getProducts() {
    return this.http.get(this.BaseURI + '/ProduitQuantites');
  }
  filterProducts(minV, maxV, cat, col) {
    var body = {
      MinPrice: minV,
      MaxPrice: maxV,
      Categorie: cat,
      Color: col
    };
    return this.http.post(this.BaseURI + '/ProduitQuantites/PriceFilter', body);
  }

  // share data between two compoenents for the product Details
  idProd: number;

  sourceIdProd(m) {
    this.idProd = m;
  }
  receiverIdProd() {
    return this.idProd;
  }

  // get product Details
  getProductDetails() {
    console.log("service idProd : " + this.idProd)
    return this.http.get(this.BaseURI + '/ProduitQuantites/' + this.idProd);
  }




  ///////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////  cart service 

  initialiseCart(userName, totPrice) {
    var body = {
      UserId: userName,
      TotalPrice: totPrice
    };
    return this.http.post(this.BaseURI + '/Cart/InitialiseCart', body);
  }

  passOrder(iduser, idProd, quant) {
    var body = {
      idUser: iduser,
      idProduct: idProd,
      Quantity: quant
    };
    return this.http.post(this.BaseURI + '/Cart/OrderProduct', body);
  }

  GetTotalCart(idUser)
  {
    return this.http.get(this.BaseURI + '/Cart/TotCart/' + idUser);
  }

  GetMyOrders(idUser) {
    return this.http.get(this.BaseURI + '/Cart/MyOrders/' + idUser);
  }

  removeOrder(idOrder)
  {
    return this.http.delete(this.BaseURI + '/Cart/DeleteOrder/' + idOrder);
  }

  getIdUser() {
    if (localStorage.getItem('token') != null) {
      let jwt = localStorage.getItem('token');
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)

      return JSON.parse(decodedJwtJsonData).UserID;
    }
    else return null;
  }

  /////////////////////////  scrapped news 
  getNews()
  {
    return this.http.get(this.BaseURI + '/News');
  }


}
