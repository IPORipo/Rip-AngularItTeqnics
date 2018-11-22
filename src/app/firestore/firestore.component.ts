import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-firestore",
  templateUrl: "./firestore.component.html",
  styleUrls: ["./firestore.component.css"]
})
export class FirestoreComponent implements OnInit {
  constructor(private db: AngularFirestore) {}
  public items: any;
  ngOnInit() {
    // This example will work in real time.if database is updated we will get updated data
    this.items = this.db.collection("/items");
    ``;
  }
}
