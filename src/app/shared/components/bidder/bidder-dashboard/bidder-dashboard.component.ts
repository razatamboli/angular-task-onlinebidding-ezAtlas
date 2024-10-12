import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../models/user.interface';

@Component({
  selector: 'app-bidder-dashboard',
  templateUrl: './bidder-dashboard.component.html',
  styleUrls: ['./bidder-dashboard.component.css']
})
export class BidderDashboardComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserValue;
  }
}