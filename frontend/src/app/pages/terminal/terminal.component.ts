import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../services/portfolio.service';

@Component({
  selector: 'app-terminal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './terminal.component.html'
})
export class TerminalComponent implements OnInit {
  private portfolioService = inject(PortfolioService);

  terminalQuestions = [
    "Why use RAG instead of only an LLM?",
    "How does chunking affect retrieval quality?",
    "What is the difference between an AI agent and a normal API service?",
    "Why separate agents instead of one large prompt?",
    "How do you evaluate LLM answer quality?",
    "Why use Celery and Redis?",
    "When would you use WebSockets instead of REST?"
  ];
  currentQuestion = signal<string>(this.terminalQuestions[0]);
  currentResponse = signal<string>('');
  terminalPrompt = signal<string>('arijit@ai-core:~$ ./ask_architecture --query "Why use RAG instead of only an LLM?"');

  ngOnInit(): void {
    this.queryTerminal(this.terminalQuestions[0]);
  }

  queryTerminal(question: string): void {
    this.currentQuestion.set(question);
    this.terminalPrompt.set(`arijit@ai-core:~$ ./ask_architecture --query "${question}"`);
    this.currentResponse.set('Synthesizing architectural reasoning...');

    this.portfolioService.askTerminal(question).subscribe(res => {
      this.currentResponse.set(res.answer);
    });
  }

  copyTerminalOutput(): void {
    navigator.clipboard.writeText(this.currentResponse()).then(() => {
      this.portfolioService.showToast('Copied architectural reasoning to clipboard!');
    });
  }
}
