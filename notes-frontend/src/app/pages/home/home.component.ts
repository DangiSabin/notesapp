import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId:string='';
  username:string='';
  constructor(private router: Router, private noteService:NotesService){}
  ngOnInit(): void {
  console.log('inside HomeComponent ');
  this.username=this.noteService.getUserName();
  this.userId=this.noteService.getUserId();
  console.log('user id inside home component',this.userId);
  }

}
