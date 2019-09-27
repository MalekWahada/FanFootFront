import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { StoreComponent } from './store/store.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { Home1Component } from './home1/home1.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductComponent } from './product/product.component';
import { UserProfileComponent } from './admin-panel/user-profile/user-profile.component';
import { TypographyComponent } from './admin-panel/typography/typography.component';
import { StoreAuctionComponent } from './store-auction/store-auction.component';
import { ProductAuctionComponent } from './product-auction/product-auction.component';
import { AuctionAdminComponent } from './admin-panel/auction-admin/auction-admin.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'news', component: NewsComponent },
  { path: 'product', component: ProductComponent },
  { path: 'store', component: StoreComponent },
  { path: 'myCart', component: MyCartComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'home1', component: Home1Component },
  { path: 'auction', component: StoreAuctionComponent },
  { path: 'productAuction', component: ProductAuctionComponent },

  // sign up and sign in 
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'adminpanel', component: AdminPanelComponent, canActivate: [AuthGuard], data: {
      permittedRoles: ['Admin']
    } , children : [
      {path: 'userProfile', component: UserProfileComponent},
      {path: 'typography', component: TypographyComponent},
      {path: 'auctionAdmin', component: AuctionAdminComponent}
    ]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
