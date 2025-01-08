import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdherentDataService } from '../shared/adherent-data.service';

@Component({
  selector: 'app-formulaire-iban',
  templateUrl: './formulaire-iban.component.html',
  styleUrls: ['./formulaire-iban.component.scss']
})
export class FormulaireIbanComponent {
  ibanForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private adherentDataService: AdherentDataService,
    private router: Router
  ) {
    this.ibanForm = this.fb.group({
      iban: [
        this.adherentDataService.getData('iban') || '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/),
          Validators.maxLength(34)
        ]
      ],
      bic: [
        this.adherentDataService.getData('bic') || '',
        [
          Validators.required,
          Validators.pattern(/^[A-Z0-9]{4}[A-Z]{2}[A-Z0-9]{2}([A-Z0-9]{3})?$/),
          Validators.minLength(8),
          Validators.maxLength(11)
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
      // Enregistrer les données dans le service
      this.adherentDataService.setData('iban', this.iban?.value);
      this.adherentDataService.setData('bic', this.bic?.value);

      // Rediriger vers la page de validation
      this.router.navigate(['/formulaire-validation']);
    } else {
      alert('Le formulaire contient des erreurs. Veuillez corriger les champs en rouge.');
    }
  }

  onBack(): void {
    this.router.navigate(['/app-formulaire-mode-paiement']);
  }
}
