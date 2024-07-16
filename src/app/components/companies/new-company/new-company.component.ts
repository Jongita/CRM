import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormsModule, NgForm, ValidationErrors } from '@angular/forms';
import { PhoneValidatorDirective } from '../../../directives/phone-validator.directive';
import { CompaniesService } from '../../../services/companies.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-new-company',
  standalone: true,
  imports: [FormsModule, CommonModule, PhoneValidatorDirective],
  templateUrl: './new-company.component.html',
  styleUrl: './new-company.component.css',
})
export class NewCompanyComponent {
  

  constructor(private companiesService: CompaniesService){
   
  }

  public newCompanySubmit(f:NgForm) {
    console.log(f.form.value);
    this.companiesService.addCompany(f.form.value).subscribe(()=>{
    f.resetForm();
    })
  }


  

}
