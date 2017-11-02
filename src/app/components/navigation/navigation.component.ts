import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service"
declare var $: any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css'],
  providers: [AuthService]
})
export class NavigationComponent implements OnInit {

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

}
