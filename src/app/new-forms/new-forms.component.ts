import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-new-forms',
  templateUrl: './new-forms.component.html',
  styleUrls: ['./new-forms.component.css']
})
export class NewFormsComponent implements OnInit {

  @ViewChild('f')
  form:NgForm
  defaultName:string="defaultUserName";
  submited:boolean=false;

  userInfo={
    username:'',
    email:'',
    hobby:'',
    favSport:''
  }
  
  setUsername(){

    // In this example we are changing value of username,
    // that is in personalInfo group
    this.form.form.patchValue({
      personalInfo:{
        username : 'newName'
      }
    });
  }

  constructor() { }

  ngOnInit() {
  }

  // example of getting values from Json object of 'ngForm'
  onSubmit(){
    // console.log(this.form);
    this.userInfo.username=this.form.value.personalInfo.username;
    this.userInfo.email=this.form.value.personalInfo.email;
    this.userInfo.hobby=this.form.value.hobby;
    this.userInfo.favSport=this.form.value.favoriteSport; 

    // This function resets a form
    // It means it clears all values and events
    this.form.reset();
    this.submited=true;
  }


}
