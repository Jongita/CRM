import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPhoneValidator]',
  providers:[{
     provide: NG_VALIDATORS,
     useClass:PhoneValidatorDirective,
     multi:true
  }],
  standalone: true
})
export class PhoneValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    
    const phone: string = control.value;


    if (!phone.startsWith("+") || phone.length < 10 || phone.length > 12) {
        return { error:"Telefonas turi buti nuo 10 iki 12 skaitmenų ir prasidėti su +"};
    }else{
      return null;
    }
  }

}
