import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { setThrowInvalidWriteToSignalError } from '@angular/core/primitives/signals';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ContactsService } from '../../../services/contacts.service';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {
  public contactForm: FormGroup;

  constructor(private contactService: ContactsService){
    this.contactForm=new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'position':new FormControl(null, Validators.required),
      'company':new FormControl(null, Validators.required),
      'phones':new FormArray([
        new FormControl(null, [Validators.required,this.validatePhone] )
      ])
      

    })
  }
  onSubmit(){
    console.log(this.contactForm);
    console.log(this.contactForm.value);
   
    this.contactService.addContact(this.contactForm.value).subscribe(()=>{
       this.contactForm.reset();
    })
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

  public removePhone(){
    (this.contactForm.get('phones') as FormArray).removeAt(-1)
  }

}



