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
  public items: Observable<any[]>;
  ngOnInit() {
    this.items = this.db.collection("/items").valueChanges();
  }
}
