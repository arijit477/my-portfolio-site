import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThreeBackgroundComponent } from './components/three-background/three-background.component';
import { PortfolioService } from './services/portfolio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, ThreeBackgroundComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  portfolioService = inject(PortfolioService);

  isMobileNavOpen = signal<boolean>(false);

  toggleMobileNav(): void {
    this.isMobileNavOpen.update(v => !v);
  }

  closeMobileNav(): void {
    this.isMobileNavOpen.set(false);
  }

  openCvModal(): void {
    this.portfolioService.openCvModal();
  }

  closeCvModal(): void {
    this.portfolioService.closeCvModal();
  }

  closeProjectModal(): void {
    this.portfolioService.closeProjectModal();
  }

  printCv(): void {
    window.print();
  }
}
