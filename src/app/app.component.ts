import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //elembts that we are sending to child
  elements=[{type:'ripTyperrrrr',name:'ripNamerrrr'}];
  
  //info we recived or not childs action(data)
  result:String="no result";
  
  //action on childs send data action
  resultRipEvent(){
    this.result="Resulted!!!";
  }
}
