import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PathGuardGuard } from './services/path-guard.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddFriendComponent } from './components/add-friend/add-friend.component';
import { ChatComponent } from './components/dashboard/chat/chat.component';
import { DefaultComponent } from './components/dashboard/default/default.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'createAccount', component: CreateAccountComponent},
  { path: ':user_email/dashboard' , component: DashboardComponent, canActivate: [PathGuardGuard], children: [
      { path: 'chat', canActivateChild:[PathGuardGuard],component: ChatComponent},
      { path: 'add_friend', component: AddFriendComponent},
      { path: "default", component: DefaultComponent},
      { path: "profile", component: ProfileComponent},
      { path: "" , redirectTo: "default", pathMatch: "full"},
  ] },
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  

  // last one 
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
