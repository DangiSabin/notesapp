import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotesService } from 'src/app/shared/notes.service';
import { confrimFunction, uniqueFunction } from 'src/app/validators/reactiveValidators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm: FormGroup;
  message:string='';
  errMessages = {
    requiredUsername:'Username is required',
    uniqueUsername:'Username already exists, please enter another',
    requiredPassword:'Password is required',
    passwordPattern: 'Password should be at least 8 charaters long, contains one capital letter and one symbol',
    requiredConfirm: 'Confirm password is required',
    confirmMatch: 'Confirm password and password do not match'
  }
  constructor(private fb: FormBuilder,private notesService:NotesService){
    this.registerForm = new FormGroup({
      username : new FormControl('',[Validators.required]),
      // ten in length, one captiol letter and one symbol
      password: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{10,}).+$")]),
      confirm: new FormControl('', [Validators.required])
    },
    {validators: confrimFunction()})
    
  }
  ngOnInit() {
    // this.notes = this.notesService.getAll();
      
   }

  username: string='';
  confirm: string='';
  password: string='';

  onSubmit() {
    // Perform registration logic here
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Confirm Password:', this.confirm);

    if(this.username === '' || this.password === '' || this.confirm === '') {
      this.message='Please enter all the details';
      console.log('Please enter all the details');
    } else {

    //this.notesService.register(this.username, this.password);
    
    this.notesService.register(this.username, this.password).subscribe(
      response => {
       
        this.message='Register successful';
        console.log('Register successful');
        console.log('Register API response:', response);

        //then reset the form
        this.registerForm.reset();
       
      },
      error => {
       
       
          console.error('Register failed:', error);
          this.message='Register failed';
         
        }
      
    );
  }
  }

}
