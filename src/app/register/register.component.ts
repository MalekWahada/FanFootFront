import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  private Genders1 = [
    { Id: '0', Name: "Male" },
    { Id: '1', Name: "Female" }];
  
    private FavTeams = [
      { Id: '1', Name: "Real Madrid" },
      { Id: '2', Name: "F.C.Barcelona" },
      { Id: '3', Name: "Juventus" },
      { Id: '4', Name: "A.C.Milan" },
      { Id: '5', Name: "Bayern Munchen" },
      { Id: '6', Name: "Borussia Dortmund" },
      { Id: '7', Name: "Man United" },
      { Id: '8', Name: "Arsenal" },
      { Id: '9', Name: "Chelsea" },
    ];

    public myDatePickerOptions: IMyDpOptions = {
      // other options...
      dateFormat: 'dd.mm.yyyy',
  };
  
  constructor(public service: UserService, private toastr: ToastrService) { }

  ngOnInit() {
  }

// submit event

onSubmit() {
  this.service.register().subscribe(
    (res: any) => {
      if (res.succeeded) {
        this.service.formModel.reset();
        this.toastr.success('New user created!', 'Registration successful.');
      } else {
        res.errors.forEach(element => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Username is already taken','Registration failed.');
              break;

            default:
            this.toastr.error(element.description,'Registration failed.');
              break;
          }
        });
      }
    },
    err => {
      console.log(err);
    }
  );
}
}
