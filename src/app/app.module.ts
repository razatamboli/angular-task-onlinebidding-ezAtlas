import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './shared/components/auth/auth.component';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { RoleSelectionComponent } from './shared/components/auth/role-selection/role-selection.component';
import { SellerComponent } from './shared/components/seller/seller.component';
import { BidderComponent } from './shared/components/bidder/bidder.component';
import { SharedComponent } from './shared/components/shared/shared.component';
import { NotificationsComponent } from './shared/components/notifications/notifications.component';
import { BidderDashboardComponent } from './shared/components/bidder/bidder-dashboard/bidder-dashboard.component';
import { ActiveAuctionsComponent } from './shared/components/bidder/active-auctions/active-auctions.component';
import { BidHistoryComponent } from './shared/components/bidder/bid-history/bid-history.component';
import { SellerDashboardComponent } from './shared/components/seller/seller-dashboard/seller-dashboard.component';
import { CreateAuctionComponent } from './shared/components/seller/create-auction/create-auction.component';
import { ManageAuctionsComponent } from './shared/components/seller/manage-auctions/manage-auctions.component';
import { NavbarComponent } from './shared/components/shared/navbar/navbar.component';
import { ProfileComponent } from './shared/components/shared/profile/profile.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // For notifications
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { PlaceBidDialogComponent } from './shared/components/bidder/place-bid-dialog/place-bid-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoginComponent,
    RoleSelectionComponent,
    SellerComponent,
    BidderComponent,
    SharedComponent,
    NotificationsComponent,
    BidderDashboardComponent,
    ActiveAuctionsComponent,
    BidHistoryComponent,
    SellerDashboardComponent,
    CreateAuctionComponent,
    ManageAuctionsComponent,
    NavbarComponent,
    ProfileComponent,
    PlaceBidDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    

    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
