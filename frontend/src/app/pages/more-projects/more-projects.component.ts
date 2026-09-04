import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-more-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './more-projects.component.html'
})
export class MoreProjectsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  otherProjects = signal<Project[]>([]);
  activeCategory = signal<string>('all');

  ngOnInit(): void {
    this.loadProjects('all');
  }

  loadProjects(category: string): void {
    this.activeCategory.set(category);
    this.portfolioService.getOtherProjects(category).subscribe(data => {
      this.otherProjects.set(data);
    });
  }

  openProjectModal(project: Project): void {
    this.portfolioService.openProjectModal(project);
  }
}
