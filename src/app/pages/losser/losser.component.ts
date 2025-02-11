import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-losser',
  imports: [NavbarComponent],
  templateUrl: './losser.component.html',
  styleUrl: './losser.component.css',
})
export class LosserComponent implements OnInit {
  participants: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getParticipants('RECHAZADO').subscribe({
      next: (response) => {
        this.participants = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}