import {
  Component,
  computed,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ProfileDirective } from '../../directives/profile.directive';

@Component({
  selector: 'app-navbar',
  imports: [ProfileDirective],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  hiddenProfileSignal: WritableSignal<boolean> = signal(true);

  isHiddenProfile: Signal<boolean> = computed(() => this.hiddenProfileSignal());

  hiddenParticipantSignal: WritableSignal<boolean> = signal(true);

  isHiddenParticipant: Signal<boolean> = computed(() =>
    this.hiddenParticipantSignal(),
  );

  hiddenWinnerSignal: WritableSignal<boolean> = signal(true);
  isHiddenWinner: Signal<boolean> = computed(() => this.hiddenWinnerSignal());

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  profile(): void {
    this.hiddenProfile();
  }

  participant(): void {
    this.hiddenParticipant();
  }

  winner(): void {
    this.hiddenWinner();
  }

  logout(): void {
    this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
      this.authService.removeToken();
      window.location.reload();
    });
  }

  closeProfile(event: MouseEvent): void {
    this.hiddenProfileSignal.set(true);
  }

  closeParticipant(event: MouseEvent): void {
    this.hiddenParticipantSignal.set(true);
  }

  closeWinner(event: MouseEvent): void {
    this.hiddenWinnerSignal.set(true);
  }

  hiddenWinner(): void {
    this.hiddenWinnerSignal.set(!this.hiddenWinnerSignal());
  }

  hiddenParticipant(): void {
    this.hiddenParticipantSignal.set(!this.hiddenParticipantSignal());
  }

  hiddenProfile(): void {
    this.hiddenProfileSignal.set(!this.hiddenProfileSignal());
  }
}