import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from "src/app/shared/note.model";
import { NotesService } from '../shared/notes.service';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  selectedNote:Note=new Note();
  constructor(private notesService: NotesService,private router:Router,
     private route:ActivatedRoute){}
  ngOnInit(): void {
    console.log("inside ngOnInit of NoteCardComponent");
    this.selectedNote;
    //const noteString = this.route.snapshot.queryParamMap.get('note');

    // Retrieve the note from the query parameters
    const noteString = this.route.snapshot.queryParamMap.get('note');
    console.log(noteString);

    if (noteString) {
      this.selectedNote = JSON.parse(noteString);
    }

    //this.notesService.update(form.value);

  }

  //on click of Edit button
  onUpdateClick(note:Note){
    console.log('edited note:', note);
   // this.notesService.update(note);
   this.selectedNote = { ...note };
    this.notesService.updateNote(this.selectedNote).subscribe(
      (response: Note) => {
        console.log('Note updated:', response);
        // Reset the editedNote object
        this.selectedNote= this.notesService.resetNote();
        // Refresh the notes list
        //this.fetchNotes();
      },
      (error: any) => {
        console.error('An error occurred while updating the note:', error);
      }
    );


    this.router.navigate(['/home/notes-list']);

  }

  //on click of Delete button
  onDeleteClick(note:Note){
    console.log('delete note:', note);
   //this.notesService.delete(note);

   //delete note
   //this.notesService.deleteNote(note);
   this.notesService.deleteNote(this.selectedNote)
      .subscribe(
        () => {
          console.log(' Note deleted successfully');
          // Perform any additional actions if needed
        },
        (error: any) => {
          console.error('An error occurred while deleting the note:', error);
        }
      );
   this.router.navigate(['/home/notes-list']);
  }

  goBack():void{
    this.router.navigate(['/home/notes-list']);
  }


}
