import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from '../models/contact';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private http:HttpClient) { 

  }

  public addContact(contact: Contact){
    return this.http.post('https://inventorizacija-ea3a5-default-rtdb.europe-west1.firebasedatabase.app/contacts.json', contact);
  }


  public loadContacts(){
    return this.http.get<{[key:string]:Contact}>(`https://inventorizacija-ea3a5-default-rtdb.europe-west1.firebasedatabase.app/contacts.json`)
    .pipe(
      map((data):Contact[]=>{
        let conts:Contact[]=[];
        for(let con in data){
          conts.push({...data[con], id:con});
        }
        return conts;
        
      })
     
    )
    
  }


}
