import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css'
})
export class NewContactComponent {
  public contactForm: FormGroup;

  constructor(){
    this.contactForm=new FormGroup({
      'name':new FormControl("555555"),
      'surname':new FormControl(null),
      'position':new FormControl(null),
      'company':new FormControl(null),
      'phones':new FormControl(555555),

    })
  }
}





//  public id: string|null=null;
//     public name: string|null = null;
//     public surname: string|null = null;
//     public position: string|null = null;
//     public company: string|null = null;
//     public company_name: Company|null = null;
//     public phones: string[] = [];