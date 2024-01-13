import { Component,OnInit } from '@angular/core';
import { NotesService } from 'src/app/shared/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // this.notes = this.notesService.getAll();
  message:string='';
  username: string='';
  password: string='';


  constructor(private notesService:NotesService,private router:Router){}

  ngOnInit() {
    // this.notes = this.notesService.getAll();
  }

  onSubmit() {
    // Perform login logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);

    //this.notesService.login(this.username, this.password);

    if (this.username === '' || this.password === '') {
      console.log('username or password missing');
      this.message='username or password missing';
    } else {
      //console.log('Invalid email or password');
    

    this.notesService.login(this.username, this.password).subscribe(
      response => {
        // Handle the login response here
        console.log('Login successful');
        console.log('Login API response:', response);
        console.log('user id:',response.id);
        this.notesService.setUserId(response.id);
        console.log('username:',response.username);
        this.notesService.setUserName(response.username);
        this.message='Login successful';

        //if success go to home:
        this.router.navigate(['/home']);
       //this.router.navigate(['/notes-list']);
      },
      error => {
        // Handle login error here
        if (error.status === 500 && error.error === 'username or password was incorrect') {
          console.log('Invalid username or password');
          this.message='Invalid username or password';
          // Display an error message to the user, e.g., using a toast notification or by setting a variable in the component for displaying an error message in the template
        } else {
          console.error('Login failed:', error);
          // Handle other types of errors, e.g., network error, server error, etc.
        }

        //
        //if fail, again go to login
        this.router.navigate(['/login']);
      }
    );
    }
  }
   
      

}
