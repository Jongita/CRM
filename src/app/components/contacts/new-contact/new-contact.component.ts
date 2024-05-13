import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {
  public contactForm: FormGroup;

  constructor(){
    this.contactForm=new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'position':new FormControl(null, Validators.required),
      'company':new FormControl(null, Validators.required),
      'phones':new FormArray([])
      // (null, [Validators.required, this.validatePhone]),

    })
  }
  onSubmit(){
    console.log(this.contactForm);
  }

  validatePhone(control: FormControl): ValidationErrors | null {
    const phone: string = control.value;
    const pattern = /^\+[0-9]{11}$/;

    if (pattern.test(phone)){
      return null;
    } else {
      return {error: 'Klaida'};
    }
  }

  get phones() {
    return (this.contactForm.get('phones') as FormArray).controls;
  }

  public addPhone(){
    const number = new FormControl(null, [Validators.required, this.validatePhone]);
    (this.contactForm.get('phones') as FormArray).push(number);
  }

}





//  public id: string|null=null;
//     public name: string|null = null;
//     public surname: string|null = null;
//     public position: string|null = null;
//     public company: string|null = null;
//     public company_name: Company|null = null;
//     public phones: string[] = [];