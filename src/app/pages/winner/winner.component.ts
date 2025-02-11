import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-winner',
  imports: [NavbarComponent],
  templateUrl: './winner.component.html',
  styleUrl: './winner.component.css',
})
export class WinnerComponent implements OnInit {
  participants: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getParticipants('ACEPTADO').subscribe({
      next: (response) => {
        this.participants = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}