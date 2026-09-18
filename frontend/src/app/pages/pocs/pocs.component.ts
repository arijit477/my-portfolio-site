import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LocalPoc {
  title: string;
  description: string;
  document_url?: string;
  date?: Date;
  image_url?: string;
  created_at?: Date;
  demo_url?: string;
  github_url?: string;
}

@Component({
  selector: 'app-pocs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pocs.component.html',
  styleUrls: ['./pocs.component.css']
})
export class PocsComponent implements OnInit {
  pocs: LocalPoc[] = [
    {
      title: 'AI Insurance Portal',
      description: 'Proof of concept document for the AI-powered insurance customer portal, featuring conversational AI and policy management.',
      document_url: '/assets/pocs/AI_Insurance_Portal_POC.docx',
      date: new Date('2024-05-15')
    },
    {
      title: 'AI Yoga Coach',
      description: 'Detailed POC outlining the conversational AI fitness coach, including persona selection and safety guardrails.',
      document_url: '/assets/pocs/AI_Yoga_Coach_POC_v2.docx',
      date: new Date('2024-06-20')
    },
    {
      title: 'HomeworkPlus AI',
      description: 'Comprehensive architecture and proof of concept for the multi-agent AI homework assistance platform.',
      document_url: '/assets/pocs/HomeworkPlus_POC.pdf',
      date: new Date('2024-08-10')
    },
    {
      title: 'RFP Document Intelligence Agent',
      description: 'POC document detailing the autonomous AI agents for RFP analysis and tender documentation processing.',
      document_url: '/assets/pocs/RFP_Document_Intelligence_Agent_PoC.docx',
      date: new Date('2024-07-05')
    }
  ];
  loading = false;

  ngOnInit() {
  }
}
