import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ContactsService } from '../../../services/contacts.service';
import { CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-new-contact',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './new-contact.component.html',
  styleUrl: './new-contact.component.css',
  animations: [
    trigger("phoneInput", [
      state("*",style({
        // transform:"translateX(0px) translateY(0px)",
        opacity:1,
        height:'38px'
      })),
      transition("void => *",[
        style({
          height:'0px',
         opacity:0,
          // transform:"translateX(-2000px) translateY(300px)"
        }),
        animate(2000,style({
          height:'38px',
          opacity:1,
          // transform:"translateX(-2000px) translateY(300px)"
        })),
        animate(2000)
      ]),
       transition("* => void",[
        animate(750,style({
          height:'38px',
          transform:"translateX(3000px)"
        })),
        animate(750,style({
          height:'0px',
          transform:"translateX(3000px)"
        }))
      ])
    ]),
    trigger("inputFields",[
      state('normal',style({
        'font-size':'16px',
        'height':'36px'
      })),
      state('focused',style({
        'font-size':'24px',
        'height':'42px'
      })),
      transition('* <=> *',[
        animate(500)
      ])
    ]),
    trigger('caption',[
      state('normal', style({
        'color':'#000000',
        // transform:'translateX(0px)'
      })),
      state('clicked1',style({
        'color':'#00ff00',
        // transform:'translateX(-2000px)'
      })),
      state('clicked2',style({
        'color':'#ff0000',
      })),
      transition('* <=> *',[
        animate(1000)
      ]),
    ])
  ]
})

export class NewContactComponent {
  public contactForm: FormGroup;
  public companies: Company[] = [];

  public captionState='normal';

  public inputState=['normal','normal','normal','normal','normal']

  constructor(private contactService: ContactsService, private companiesService: CompaniesService){
    this.contactForm=new FormGroup({
      'name':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'surname':new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]),
      'position':new FormControl(null, Validators.required),
      'company':new FormControl(null, Validators.required),
      'phones':new FormArray([
        new FormControl(null, [Validators.required,this.validatePhone] )
      ]),
    });

    this.companiesService.loadCompanies().subscribe((data)=>{
      this.companies=data;
      console.log(data);
    })
  }

  public inputFocus(fieldId:number, state:boolean){
    if(state==true){
      this.inputState[fieldId]='focused';
    }else{
      this.inputState[fieldId]='normal'
    }
  }

  onSubmit(){
    console.log(this.contactForm);
    console.log(this.contactForm.value);
   
    this.contactService.addContact(this.contactForm.value).subscribe(()=>{
       this.contactForm.reset();
       (this.contactForm.get('phones') as FormArray).controls = [
      new FormControl(null, Validators.required)
    ]
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

  // uniqueCodeNumber():Promise<ValidationErrors | null> | Observable<ValidationErrors | null>{
  //   const promise=new Promise<ValidationErrors | null>((resolve, reject)=>{
  //     this.companiesService.loadCompanies().subscribe((data)=>{
  //       resolve(null);
  //     })
  //   })
  //   return promise;
  // }
 
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

  public captionClick(){
    switch (this.captionState) {
      case 'normal':
        this.captionState='clicked1';
        break;
      case 'clicked1':
          this.captionState='clicked2';
          break;
      case 'clicked2':
        this.captionState='normal';
        break;  
    }
    
  }

}



