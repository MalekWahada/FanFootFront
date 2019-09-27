import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.component.html',
  styles: []
})
export class Home1Component implements OnInit {

  userDetails;

  constructor(private router: Router, private service: UserService) { }

  ngOnInit() {

    let jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    this.service.getUserProfile(JSON.parse(decodedJwtJsonData).UserID).subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );


    var userID = JSON.parse(decodedJwtJsonData).UserID;
    this.service.initialiseCart(userID, 0).subscribe(
      (res: any) => {

      },
      err => {
      }
    );
  }

}
