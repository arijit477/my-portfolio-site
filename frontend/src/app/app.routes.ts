import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MoreProjectsComponent } from './pages/more-projects/more-projects.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { ContactComponent } from './pages/contact/contact.component';
import { MonthlyProgressComponent } from './pages/monthly-progress/monthly-progress.component';
import { PocsComponent } from './pages/pocs/pocs.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Arijit Mondal | AI/ML & Full-Stack Engineer' },
  { path: 'projects', component: ProjectsComponent, title: 'Live Projects | Arijit Mondal' },
  { path: 'more-projects', component: MoreProjectsComponent, title: 'More Projects & Repositories | Arijit Mondal' },
  { path: 'skills', component: SkillsComponent, title: 'Skills & Stack | Arijit Mondal' },
  { path: 'experience', component: ExperienceComponent, title: 'Experience & Career | Arijit Mondal' },
  { path: 'monthly-progress', component: MonthlyProgressComponent, title: 'Monthly Progress | Arijit Mondal' },
  { path: 'contact', component: ContactComponent, title: 'Contact & Connect | Arijit Mondal' },
  { path: 'pocs', component: PocsComponent, title: 'Proof of Concepts | Arijit Mondal' },
  { path: '**', redirectTo: 'home' }
];
