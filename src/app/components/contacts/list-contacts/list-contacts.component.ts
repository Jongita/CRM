import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ContactsService } from '../../../services/contacts.service';
import { Contact } from '../../../models/contact';
import { CompaniesService } from '../../../services/companies.service';
import { Company } from '../../../models/company';
import { map } from 'rxjs';


@Component({
  selector: 'app-list-contacts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-contacts.component.html',
  styleUrl: './list-contacts.component.css'
})
export class ListContactsComponent {
    public contacts:Contact[]=[];
    public companies: Company[]=[];

    constructor(private contactService: ContactsService, private companiesService: CompaniesService) {
      this.contactService.loadContacts().subscribe((data)=>{
        this.contacts=data;
        
      });

      this.companiesService
      .loadCompanies()
      .subscribe((data)=>{
        this.companies=data;
         this.contactService
         .loadContacts()
         .pipe(
              map((data)=>{
              data.forEach((contact, i)=>{
                this.companies.forEach((company, y)=>{
                  if (contact.company == company.id){
                    data[i].company_company = company;
                  }
                })
              });
              return data;
            }
          ))

         .subscribe((data)=>{
        this.contacts=data;
          });
      })
    }
}
