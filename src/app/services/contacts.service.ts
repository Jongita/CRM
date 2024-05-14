import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { 

  }

  public addContact(contact: Contact){
    return this.http.post('https://inventorizacija-ea3a5-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', contact);
  }


}
