import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulaire-iban',
  templateUrl: './formulaire-iban.component.html',
  styleUrls: ['./formulaire-iban.component.scss']
})
export class FormulaireIbanComponent {
  ibanForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.ibanForm = this.fb.group({
      iban: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/), // IBAN format (34 caractères max)
          Validators.maxLength(34) // Assure que l'IBAN ne dépasse pas 34 caractères
        ]
      ],
      bic: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/), // BIC format (8 ou 11 caractères)
          Validators.minLength(8), // Minimum : 8 caractères
          Validators.maxLength(11) // Maximum : 11 caractères
        ]
      ]
    });
  }

  get iban() {
    return this.ibanForm.get('iban');
  }

  get bic() {
    return this.ibanForm.get('bic');
  }

  onInputUppercase(field: string): void {
    const control = this.ibanForm.get(field);
    if (control) {
      control.setValue(control.value.toUpperCase(), { emitEvent: false });
    }
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.ibanForm.valid) {
      console.log('Formulaire soumis avec succès :', this.ibanForm.value);
    } else {
      console.error('Le formulaire contient des erreurs.');
    }
  }
}
