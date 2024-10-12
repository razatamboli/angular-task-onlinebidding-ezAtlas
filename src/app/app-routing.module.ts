import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoginComponent } from './shared/components/auth/login/login.component';
import { RoleSelectionComponent } from './shared/components/auth/role-selection/role-selection.component';
import { SellerDashboardComponent } from './shared/components/seller/seller-dashboard/seller-dashboard.component';
import { BidderDashboardComponent } from './shared/components/bidder/bidder-dashboard/bidder-dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'role-selection', component: RoleSelectionComponent, canActivate: [AuthGuard] },
  {
    path: 'seller',
    component: SellerDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'seller' }
  },
  {
    path: 'bidder',
    component: BidderDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'bidder' }
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
