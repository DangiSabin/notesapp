import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from "src/app/shared/note.model";
import { NotesService } from "src/app/shared/notes.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.css']
})
export class MainLayoutComponent implements OnInit {
  userId:string='';
  //selectedNote: any; 
  favoriteNotes : Note[] = new Array<Note>();
  constructor(private router: Router, private notesService:NotesService){}
  
  ngOnInit(){
    //this.favoriteNotes  = this.notesService.getAll();
    //this.favoriteNotes  = this.notesService.getFavoriteNotes();
    //console.log('notes on main layout: ' +this.favoriteNotes);
    console.log('inside MainLayoutComponent ');
    this.userId=this.notesService.getUserId();
   console.log('user id inside MainLayoutComponent',this.userId);
   this.getFavoriteNotes();
  }

  getFavoriteNotes(): void {
    this.notesService.getNotes().subscribe(
      notes  => {
 
        console.log('API response:', notes);
        this.favoriteNotes = notes.filter(note => note.important);
        console.log('Assigned notes:', this.favoriteNotes);
      },
      error => {
        // Handle the error
        console.error(error);
      }
    );
  }

}
