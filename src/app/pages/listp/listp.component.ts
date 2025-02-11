import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-listp',
  imports: [NavbarComponent],
  templateUrl: './listp.component.html',
  styleUrl: './listp.component.css',
})
export class ListpComponent implements OnInit {
  participants: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getParticipants('PENDIENTE').subscribe({
      next: (response) => {
        this.participants = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}