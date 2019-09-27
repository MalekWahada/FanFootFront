import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  ro;
  userDetails;
  constructor(private service: UserService, private router: Router) { }

  ngOnInit() {
    let jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)

    let isAdmin = decodedJwtData.Admin
    if (JSON.parse(decodedJwtJsonData).role == 'Admin')
      this.ro = true;
    else this.ro = false;

    //user details
    this.service.getUserProfile(JSON.parse(decodedJwtJsonData).UserID).subscribe(
      res => {
        this.userDetails = res;
      },
      err => {
        console.log(err);
      },
    );
  }


  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/home']);
  }


}
