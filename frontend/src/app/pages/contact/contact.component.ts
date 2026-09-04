import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  private portfolioService = inject(PortfolioService);

  contactData = {
    name: '',
    email: '',
    message: ''
  };
  isSubmitting = signal<boolean>(false);

  submitContact(): void {
    if (!this.contactData.name || !this.contactData.email || !this.contactData.message) {
      this.portfolioService.showToast('Please fill out all required fields before submitting.');
      return;
    }

    this.isSubmitting.set(true);
    this.portfolioService.sendContact(this.contactData).subscribe({
      next: (res) => {
        this.isSubmitting.set(false);
        this.portfolioService.showToast(res.message);
        this.contactData = { name: '', email: '', message: '' };
      },
      error: () => {
        this.isSubmitting.set(false);
        this.portfolioService.showToast('Failed to send message. Please try again or reach out directly.');
      }
    });
  }
}
