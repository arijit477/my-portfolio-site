import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  deployedProjects = signal<Project[]>([]);
  activeCategory = signal<string>('all');

  ngOnInit(): void {
    this.loadProjects('all');
  }

  loadProjects(category: string): void {
    this.activeCategory.set(category);
    this.portfolioService.getDeployedProjects(category).subscribe(data => {
      this.deployedProjects.set(data);
    });
  }

  openProjectModal(project: Project): void {
    this.portfolioService.openProjectModal(project);
  }
}
