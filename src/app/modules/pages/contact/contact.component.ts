import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  providers: [MessageService],
})
export class ContactComponent {
  form = { name: '', email: '', subject: 'general', message: '' };
  submitted = false;

  subjects = [
    { value: 'general', labelKey: 'CONTACT.SUBJECT_GENERAL' },
    { value: 'order', labelKey: 'CONTACT.SUBJECT_ORDER' },
    { value: 'returns', labelKey: 'CONTACT.SUBJECT_RETURNS' },
    { value: 'fitment', labelKey: 'CONTACT.SUBJECT_FITMENT' },
    { value: 'wholesale', labelKey: 'CONTACT.SUBJECT_WHOLESALE' },
  ];

  constructor(private messageService: MessageService) {}

  submit(): void {
    if (!this.form.name || !this.form.email || !this.form.message) return;
    this.submitted = true;
    this.messageService.add({
      severity: 'success',
      summary: 'OK',
      detail: 'Message sent',
      life: 3000,
    });
    this.form = { name: '', email: '', subject: 'general', message: '' };
  }
}
