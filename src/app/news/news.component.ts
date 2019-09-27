import { Component, OnInit, ElementRef } from '@angular/core';
import { Subscription, Observable } from 'rxjs/Rx';
import { UserService } from '../shared/user.service';
import { News } from '../shared/Modules/News';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styles: []
})
export class NewsComponent implements OnInit {

  // accessiblity
  headerVisitor;
  headerLoggedIn;

  // news List
  news: News[] = [];

  // filter teams news 
  private FavTeams = [
    { Id: '1', Name: "Real Madrid" ,checked: false},
    { Id: '2', Name: "F.C.Barcelona",checked: false },
    { Id: '3', Name: "Juventus",checked: false },
    { Id: '4', Name: "A.C.Milan",checked: false },
    { Id: '5', Name: "Bayern Munchen",checked: false },
    { Id: '6', Name: "Borussia Dortmund",checked: false },
    { Id: '7', Name: "Man United",checked: false },
    { Id: '8', Name: "Arsenal",checked: false },
    { Id: '9', Name: "Chelsea",checked: false },
  ];



  // for time display
  private future: Date;
  private futureString: string;
  private counter$: Observable<number>;
  private subscription: Subscription;
  private message: string;

  constructor(private service:UserService, elm: ElementRef) {
    this.futureString = "August 27, 2019 12:00:00";

  }

  dhms(t) {
    var days, hours, minutes, seconds;
    days = Math.floor(t / 86400);
    t -= days * 86400;
    hours = Math.floor(t / 3600) % 24;
    t -= hours * 3600;
    minutes = Math.floor(t / 60) % 60;
    t -= minutes * 60;
    seconds = t % 60;

    return [
      days + 'd',
      hours + 'h',
      minutes + 'm',
      seconds + 's'
    ].join(' ');
  }

  ngOnInit() {
    this.future = new Date(this.futureString);
    this.counter$ = Observable.interval(1000).map((x) => {
      return Math.floor((this.future.getTime() - new Date().getTime()) / 1000);
    });

    this.subscription = this.counter$.subscribe((x) => this.message = this.dhms(x));

    // accesibility when logged in or not
    if (localStorage.getItem('token') != null) {
      this.headerLoggedIn = true;
      this.headerVisitor = false;
    }
    else {
      this.headerLoggedIn = false;
      this.headerVisitor = true;
    }


    ////////   news service
    this.service.getNews().subscribe(
      res => {
        this.news = <News[]>res;
      },
      err => {
        console.log(err);
      },
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
