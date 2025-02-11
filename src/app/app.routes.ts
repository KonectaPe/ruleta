import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { authGuard } from './guards/auth/auth.guard';
import { guestGuard } from './guards/guest/guest.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { ParticipantComponent } from './pages/participant/participant.component';
import { ListpComponent } from './pages/listp/listp.component';
import { LosserComponent } from './pages/losser/losser.component';
import { WinnerComponent } from './pages/winner/winner.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [guestGuard],
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participant-create',
    component: ParticipantComponent,
    canActivate: [authGuard],
  },
  {
    path: 'participant-list',
    component: ListpComponent,
    canActivate: [authGuard],
  },
  {
    path: 'winner',
    component: WinnerComponent,
    canActivate: [authGuard],
  },
  {
    path: 'losser',
    component: LosserComponent,
    canActivate: [authGuard],
  },
];