import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.authService.autoLogin();
  }
  // loadedFeature = 'recipe';
  // 用subject取代eventEmmiter
  // onNavigate(feature: string){
  //   this.loadedFeature = feature;
  // }
}
