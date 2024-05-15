import { Routes } from '@angular/router';
import { NewCompanyComponent } from './components/companies/new-company/new-company.component';
import { NewContactComponent } from './components/contacts/new-contact/new-contact.component';
import { ListContactsComponent } from './components/contacts/list-contacts/list-contacts.component';

export const routes: Routes = [
    {path: "company/add", component: NewCompanyComponent},
    {path: "contact/add", component: NewContactComponent},
    {path: "contact/list", component: ListContactsComponent}
   
];
