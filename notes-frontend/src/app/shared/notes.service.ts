import { Injectable } from "@angular/core";
import { Note } from "./note.model";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class NotesService {
  //test data - array data 
  notes1: Note[] = [

    { id: '1',title: 'Note 1', body: 'This is note 1.', dateCreated: new Date(),  important: true},
    { id: '2',title: 'Note 2', body: 'This is note 2.' , dateCreated: new Date(), important: false},
    { id: '3',title: 'Note 3', body: 'This is note 3.' , dateCreated: new Date(), important: true},
    { id: '4',title: 'Note 4', body: 'This is note 4.' , dateCreated: new Date(), important: false},
    { id: '5',title: 'Note 5', body: 'This is note 5.' , dateCreated: new Date(), important: true},
  ];//new Array<Note>();
  notes: Note[] =new Array<Note>();
  foundNote:Note[]=new Array<Note>();
 // private searchNote: string = '';
 private baseUrl='http://localhost:3000/notes/';
 private userId='';
 private username='';
 private url='';
 //private userId1='db0754cf2281bcdffe4dce1b68c6a215';
 //private url='http://localhost:3000/notes/db0754cf2281bcdffe4dce1b68c6a215';
 //private url1=this.baseUrl+this.userId;

 //default note
 private defaultNote: Note = {
  id: '',
  title: '',
  body: '',
  dateCreated:new Date(),
  important: false
};

  constructor(private http: HttpClient) { }

  getNotes(): Observable<Note[]> {
    this.url=this.baseUrl+this.getUserId();
    //his.url = 'http://localhost:3000/notes/db0754cf2281bcdffe4dce1b68c6a215';
    console.log('url: ',this.url);
    return this.http.get<Note[]>(this.url);
  }
  

  getAll():Observable<Note[]>  {
    //console.log("this notes list: ", this.notes);
    //url = http://localhost:3000/notes/db0754cf2281bcdffe4dce1b68c6a215
    this.url=this.baseUrl+this.getUserId();
    console.log('url: ',this.url);
    return this.http.get<any>(this.url).pipe(map(response => response.data)
    );
   
  }
    

  //return favorite notes
  
  getFavoriteNotes(){
    //this.notes=http.get<Note[]>(this.url);
    return this.notes.filter(note => note.important);
  }

  get(id: number) {
    return this.notes[id];
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  add(note: Note) {
    // add note to Notes array & return id where id = the index in the array
    const newLength = this.notes.push(note);
    const index = newLength - 1;
    console.log(index)
    //return index;
  }

  //add notes
  addNote(note: Note): Observable<Note> {
    console.log("add notes: ", note);
    this.url=this.baseUrl+this.getUserId();
    console.log('url: ',this.url);
    return this.http.post<Note>(this.url, note);
  }

  update(updatedNote: Note){
    //id: number, title: string, body: string) {
    //const note = this.notes[id];
    
   // const index = this.notes.findIndex(note => note.id === updatedNote.id);
   const index = this.notes.findIndex(note => note.title === updatedNote.title);
    if (index !== -1) {
      this.notes[index] = updatedNote;
    }
  }

  //update note url
  updateNote(note: Note): Observable<Note> {
    const url = `http://localhost:3000/notes/note/${note.dateCreated}`;
    //const url = `${this.url}/note/${note.dateCreated}`;
    console.log('insied updateNote method in service, url ='+url);
    //return this.http.put<Note>(url, note);
    return this.http.patch<Note>(url, note);
  }

  delete(deleteNote: Note) {
    //this.notes.splice(id, 1);
    const index = this.notes.findIndex(note => note.title === deleteNote.title);

    if (index !== -1) {
      this.notes.splice(index, 1);
    }
  }

  //delete note
  deleteNote(note: Note): Observable<Note> {
    const url = `http://localhost:3000/notes/note/${note.dateCreated}`;
    //const url = `${this.url}/note/${note.dateCreated}`;
    console.log('inside deleteNote method in service, url ='+url);
    return this.http.delete<Note>(url, note);
  }

  search(searchNote:string) {
    this.foundNote = this.notes.filter(note =>
      note.title.toLowerCase().includes(searchNote.toLowerCase())
    );
   return this.foundNote;
  }

  //searchNote
  searchNotes(query: string): Observable<Note[]> {
    console.log('inside searchNotes method in service, title ='+query);
    const url = `${this.url}?q=${query}`;
    console.log('url ='+url);
    return this.http.get<Note[]>(url);
  }

  //reset note
  resetNote(): Note {
    return { ...this.defaultNote };
  }

  //login method:
  login(username:string, password:string): Observable<any> {
    console.log('inside login method in service',username,password);
    const loginurl='http://localhost:3000/login';
    const body = {
      username: username,
      password: password
    };
    console.log('url = ',loginurl);
    return this.http.post(loginurl, body);
    //this.http.post(`${this.apiUrl}/login`, loginData);
  }

  //register method:
  register(username:string, password:string): Observable<any>{
    console.log('inside register method in service',username,password);
    const registerurl='http://localhost:3000/register';
    const body = {
      username: username,
      password: password
    };
    console.log('url = ',registerurl);
    return this.http.post(registerurl, body);
  }


  //set user id:
  setUserId(userId:string){
    console.log('userId received from login: ',userId)
    this.userId=userId;
  }

  //get user id:
  getUserId(){
    console.log('returning userId : ',this.userId);
    return this.userId;
  }

  //set user name
  setUserName(username:string){
    console.log('userId received from login: ',username);
    this.username=username;
  }

  //get user name
  getUserName(){
    console.log('returning userId : ',this.username);
    return this.username;
  }

}