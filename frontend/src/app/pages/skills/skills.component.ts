import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService, SkillCategory } from '../../services/portfolio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html'
})
export class SkillsComponent {
  private portfolioService = inject(PortfolioService);
  skillCategories: SkillCategory[] = this.portfolioService.skillCategories;
}
