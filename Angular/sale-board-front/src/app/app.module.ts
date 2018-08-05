import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LeaderboardComponent} from './leaderboard/leaderboard.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserRegisterComponent} from './user-register/user-register.component';
import {AuthServiceService} from './user-register/auth-service.service';
import {ModalModule} from 'ngx-bootstrap';
import {AuthInterceptor} from './auth.interceptor';
import {SidebarService} from './sidebar/sidebar.service';
import {HeaderService} from './header/header.service';
import {ChartsComponent} from './charts/charts.component';
import {ChartsService} from './charts/charts.service';
import { UsersManagementComponent } from './users-management/users-management.component';
import {UsersManagementService} from './users-management/users-management.service';



const appRoutes: Routes = [
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent},
  {path: 'charts', component: ChartsComponent},
  {path: 'leaderboard', component: LeaderboardComponent},
  {path: 'user-register', component: UserRegisterComponent},
  {path: 'users', component: UsersManagementComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    RegisterComponent,
    LeaderboardComponent,
    SidebarComponent,
    UserRegisterComponent,
    ChartsComponent,
    UsersManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthServiceService,
    HeaderComponent, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, SidebarService,
    HeaderService,
    ChartsService,
    UsersManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
