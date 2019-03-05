import { Component } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'affable';
  route: string
  constructor(private router: Router){}
  changeRoute(routeUrl){
    this.route = routeUrl
    this.router.navigate([routeUrl  ])
  }
  ngOnInit(){
    this.route = `/${location.href.split('/')[3]}`
  }
}
