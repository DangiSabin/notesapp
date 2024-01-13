import { Component, OnInit,EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { Note } from "src/app/shared/note.model";
import { NotesService } from "src/app/shared/notes.service";
@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  userId:string='';
  //notes: Note[] = new Array<Note>();
  notes: Note[] = [];
  filteredNotes: Note[] = new Array<Note>();
  constructor(private router: Router, private notesService:NotesService) { }
  
  ngOnInit() {
   // this.notes = this.notesService.getAll();
   console.log('inside NotesListComponent ');
   this.userId=this.notesService.getUserId();
   console.log('user id inside NotesListComponent',this.userId);
   this.getNotes();
  }

  getNotes(): void {
    this.notesService.getNotes().subscribe(
      notes  => {
 

        console.log('API response:', notes);
        this.notes = notes;
        console.log('Assigned notes:', this.notes);
      },
      error => {
        // Handle the error
        console.error(error);
      }
    );
  }

  getItems(){
   // console.log(this.notes);
    return this.notes;
  }

  searchNotes(event: Event):any {
    const searchTerm = (event.target as HTMLInputElement).value;
    /*console.log("inside method: searchHandler" +searchTerm);
    if (searchTerm.trim() === '') {
      this.filteredNotes= []; // Set the filtered notes to an empty array
    }
    else{
    this.filteredNotes=this.notesService.search(searchTerm);
    }*/
    console.log('searching for title ='+searchTerm)
    if (searchTerm.trim() === '') {
      this.filteredNotes= []; // Set the filtered notes to an empty array
    }
    else{
      this.filterNotes(searchTerm);
    }
  }

  addNoteHandler(){
    console.log('Button clicked!');
    this.router.navigate(['/new']);
    
  }

  onNoteClick(note: Note) {
    console.log('Note clicked:', note);
   // this.router.navigate(['/selected-note']);
    this.router.navigate(['/selected-note'], 
    { queryParams: { note: JSON.stringify(note) }});
  }

  filterNotes(searchTerm:string): void {
    this.filteredNotes = this.notes.filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }
  
}
