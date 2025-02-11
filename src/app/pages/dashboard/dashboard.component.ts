import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth/auth.service';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

interface Sector {
  color: string;
  text: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, NgClass, FormsModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  public rotation: number = 0;
  public size: number = 0;
  animationDuration: number = 7000;
  isSpinning: boolean = false;
  result: string | null = null;
  @ViewChild('rouletteRef', { static: false }) rouletteRef!: ElementRef;
  public sectors: Sector[] = [];
  protected readonly Math = Math;
  private participants: any[] = [];
  private startTime: number = 0;
  private endRotation: number = 0;
  private colors: { color: string }[] = [
    {
      color: '#EF4444',
    },
    {
      color: '#3B82F6',
    },
    {
      color: '#10B981',
    },
    {
      color: '#F59E0B',
    },
    {
      color: '#8B5CF6',
    },
    {
      color: '#EC4899',
    },
    {
      color: '#F97316',
    },
    {
      color: '#14B8A6',
    },
    {
      color: '#FFC107',
    },
  ];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.userService.getParticipants('PENDIENTE').subscribe({
      next: (response) => {
        this.participants = response;
        this.getSectors(response);
      },
      error: (error) => {
        this.router.navigateByUrl('/', { replaceUrl: true }).then(() => {
          this.authService.removeToken();
          window.location.reload();
        });
      },
    });
    this.updateSize();
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  getParticipants(): string {
    return this.participants
      .map((u, index) => `${index} - ${u.username}`)
      .join('\n');
  }

  getSectors(response: any): void {
    this.sectors = [];
    let assignedColors: string[] = [];
    let availableColors = [...this.colors.map((c) => c.color)];

    response.forEach((participant: any, index: number) => {
      let filteredColors = availableColors.filter(
        (color) => color !== assignedColors[index - 1],
      );

      if (index === response.length - 1 && filteredColors.length > 1) {
        filteredColors = filteredColors.filter(
          (color) => color !== assignedColors[0],
        );
      }

      let randomIndex = Math.floor(Math.random() * filteredColors.length);
      let selectedColor = filteredColors[randomIndex];

      this.sectors.push({
        color: selectedColor,
        text: participant.username,
      });

      assignedColors.push(selectedColor);
    });

    this.updateGradient();
  }

  // getSectors(response: any): void {
  //   this.sectors = response.map((participant: any, index: any) => ({
  //     color: this.colors[index % this.colors.length].color,
  //     text: participant.username,
  //   }));
  //
  //   this.updateGradient();
  // }

  ngAfterViewInit(): void {
    this.updateGradient();
  }

  ngOnDestroy(): void {
    window.addEventListener('resize', this.updateSize.bind(this));
    this.enableScroll();
  }

  spinRoulette(): void {
    if (this.isSpinning) {
      return;
    }
    this.isSpinning = true;
    this.result = null;
    this.startTime = 0;

    this.disableScroll();

    this.endRotation = this.getRandomRotation();

    // const minRotation = this.minRotation * 360;
    // const additionalRotation = Math.random() * 360;
    // this.endRotation = minRotation + additionalRotation;

    requestAnimationFrame(this.animateRoulette.bind(this));
  }

  handleAccept(): void {
    console.log(this.result);
    const userUpdate = {
      username: this.result,
      status: 'ACEPTADO',
    };
    this.updateStatusParticipant(userUpdate);
  }

  handleCancel(): void {
    const userUpdate = {
      username: this.result,
      status: 'RECHAZADO',
    };
    this.updateStatusParticipant(userUpdate);
  }

  private updateStatusParticipant(userUpdate: object): void {
    this.userService.updateStatusParticipant(userUpdate).subscribe({
      next: () => {
        alert('Gracias por participar!!!');
        window.location.reload();
      },
      error: () => {
        alert('Ha ocurrido un error!');
      },
    });
  }

  private updateGradient(): void {
    if (this.rouletteRef) {
      const gradientStops = this.sectors
        .map((sector: any, index: any) => {
          const startAngle = (index / this.sectors.length) * 100;
          const endAngle = ((index + 1) / this.sectors.length) * 100;
          return `${sector.color} ${startAngle}% ${endAngle}%`;
        })
        .join(', ');
      this.rouletteRef.nativeElement.style.background = `conic-gradient(${gradientStops})`;
    }
  }

  private easeOutQuint(t: number): number {
    return 1 - Math.pow(1 - t, 5);
  }

  private getRandomRotation(): number {
    const baseRotations = Math.floor(Math.random() * 4) + 10;
    const randomOffset = Math.random() * 360;
    return baseRotations * 360 + randomOffset;
  }

  private animateRoulette(timeStamp: number): void {
    if (!this.startTime) this.startTime = timeStamp;
    const elapsedTime = timeStamp - this.startTime;
    const progress = Math.min(elapsedTime / this.animationDuration, 1);

    const easedProgress = this.easeOutQuint(progress);

    const bounce = Math.sin(progress * Math.PI * 2) * (1 - easedProgress) * 3;

    this.rotation = easedProgress * this.endRotation + bounce;

    if (progress < 1) {
      requestAnimationFrame(this.animateRoulette.bind(this));
    } else {
      this.isSpinning = false;
      this.enableScroll();
      const finalRotation = this.rotation % 360;
      const sectorIndex = Math.floor(
        (360 - finalRotation) / (360 / this.sectors.length),
      );
      this.result = this.sectors[sectorIndex].text;
    }
  }

  private updateSize(): void {
    const minSize = Math.min(window.innerWidth, window.innerHeight);
    this.size = Math.min(minSize * 0.8, 600);
  }

  private disableScroll(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  private enableScroll(): void {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }
}