import { Component } from '@angular/core';

interface FaqItem {
  questionKey: string;
  answerKey: string;
  open: boolean;
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
})
export class FaqComponent {
  faqs: FaqItem[] = [
    { questionKey: 'FAQ.Q1', answerKey: 'FAQ.A1', open: true },
    { questionKey: 'FAQ.Q2', answerKey: 'FAQ.A2', open: false },
    { questionKey: 'FAQ.Q3', answerKey: 'FAQ.A3', open: false },
    { questionKey: 'FAQ.Q4', answerKey: 'FAQ.A4', open: false },
    { questionKey: 'FAQ.Q5', answerKey: 'FAQ.A5', open: false },
    { questionKey: 'FAQ.Q6', answerKey: 'FAQ.A6', open: false },
  ];

  toggle(faq: FaqItem): void {
    faq.open = !faq.open;
  }
}
