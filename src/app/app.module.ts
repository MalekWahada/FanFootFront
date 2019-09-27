import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Ng5SliderModule } from 'ng5-slider';
import { MaterialModule } from './material/material.module';
import { MyDatePickerModule } from 'mydatepicker';
import { CountdownModule } from 'ngx-countdown';
import { CountdownTimerModule } from 'ngx-countdown-timer';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderVisitorComponent } from './headerFooter/header-visitor/header-visitor.component';
import { HeaderComponent } from './headerFooter/header/header.component';
import { FooterComponent } from './headerFooter/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NewsComponent } from './news/news.component';
import { StoreComponent } from './store/store.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { SettingsComponent } from './settings/settings.component';
import { UserService } from './shared/user.service';
import { Home1Component } from './home1/home1.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ProductComponent } from './product/product.component';
import { UserProfileComponent } from './admin-panel/user-profile/user-profile.component';
import { TypographyComponent } from './admin-panel/typography/typography.component';
import { ProduitService } from './shared/produitServ/produit.service';
import { StoreAuctionComponent } from './store-auction/store-auction.component';
import { ProdAuctionService } from './shared/produitServ/prod-auction.service';
import { ProductAuctionComponent } from './product-auction/product-auction.component';
import { AuctionAdminComponent } from './admin-panel/auction-admin/auction-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderVisitorComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NewsComponent,
    StoreComponent,
    MyCartComponent,
    SettingsComponent,
    Home1Component,
    AdminPanelComponent,
    ProductComponent,
    UserProfileComponent,
    TypographyComponent,
    StoreAuctionComponent,
    ProductAuctionComponent,
    AuctionAdminComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,
    Ng5SliderModule,
    MaterialModule,
    MyDatePickerModule,
    CountdownModule,
    CountdownTimerModule.forRoot(),
  ],
  providers: [UserService, 
    ProduitService, 
    ProdAuctionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
