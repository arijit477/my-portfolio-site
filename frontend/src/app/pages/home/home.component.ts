import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortfolioService, Project } from '../../services/portfolio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  typewriterText = signal<string>('AI / ML Engineer');
  runningProjects = signal<Project[]>([]);

  private roles = [
    "AI / ML Engineer",
    "Full-Stack Developer @ Virtual Employee",
    "Agentic AI & RAG Architect",
    "LangGraph & FastAPI Specialist",
    "Computer Vision & OCR Builder"
  ];
  private roleIdx = 0;
  private charIdx = 0;
  private isDeleting = false;

  ngOnInit(): void {
    this.startTypewriter();
    this.loadRunningProjects();
  }

  loadRunningProjects(): void {
    this.portfolioService.getDeployedProjects().subscribe(projects => {
      this.runningProjects.set(projects);
    });
  }

  openProjectModal(project: Project): void {
    this.portfolioService.openProjectModal(project);
  }

  openCvModal(): void {
    this.portfolioService.openCvModal();
  }

  private startTypewriter(): void {
    const current = this.roles[this.roleIdx];

    if (this.isDeleting) {
      this.typewriterText.set(current.substring(0, this.charIdx - 1));
      this.charIdx--;
    } else {
      this.typewriterText.set(current.substring(0, this.charIdx + 1));
      this.charIdx++;
    }

    let delta = this.isDeleting ? 40 : 90;

    if (!this.isDeleting && this.charIdx === current.length) {
      delta = 2200;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIdx === 0) {
      this.isDeleting = false;
      this.roleIdx = (this.roleIdx + 1) % this.roles.length;
      delta = 450;
    }

    setTimeout(() => this.startTypewriter(), delta);
  }
}
