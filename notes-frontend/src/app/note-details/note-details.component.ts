import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Note } from "src/app/shared/note.model";
import { NotesService } from "src/app/shared/notes.service";
import { Router, ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.css']
})
export class NoteDetailsComponent implements OnInit {

  //note:Note={ title: '', body: '' };
  newNote: Note = new Note();
   /* id,
    title: '',
    body: '',
    dateCreated:,
    important,
  };*/
  
  currentDate=new Date();
  note: Note=new Note();
  noteId: number=0;
  new: boolean=false;

  constructor(private notesService: NotesService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
   
   // this.note= { title: '', body: '' };
    // new note or editing existing one?
    this.route.params.subscribe((params: Params) => {
     // this.note = new Note();
      if (params['id']) {
        this.note = this.notesService.get(params['id']);
        this.noteId = params['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }

  
  onSubmit(form: NgForm) {

  // clear the input field after adding the item
    console.log(form.value.title);
    console.log(form.value.body);

    //const checkbox = document.getElementById("switch") as HTMLInputElement;
    console.log('check box status:',form.value.important);

    var checkbox = document.getElementById("switch") as HTMLInputElement;

    if (checkbox.checked) {
      this.note.important=true;
      console.log("Checkbox is checked");
    } else {
      this.note.important=false;
      console.log("Checkbox is unchecked");
    }
    //this.notesService.add(form.value);
    

    //this.notesService.addNote(form.value);

    this.notesService.addNote(this.note).subscribe(
      (response: Note) => {
        console.log('New note added:', response);
        // Refresh the notes list
        //this.fetchNotes();
      },
      (error: any) => {
        console.error('An error occurred while adding a note:', error);
      }
    );
  

    
    /*if (this.new) {
      // save note
      this.notesService.add(form.value);
    } else {
      this.notesService.update(this.noteId, form.value.title, form.value.body);
    }
    this.router.navigateByUrl("/");*/

    // clear the form
    form.reset();
    this.router.navigate(['/home/notes-list']);
  }

  goBack():void {
    this.router.navigate(['/home/notes-list']); 
  }
}
