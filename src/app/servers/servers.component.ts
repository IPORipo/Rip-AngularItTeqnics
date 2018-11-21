import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild, ElementRef, ContentChild } from '@angular/core';
import { LogService } from '../TestServers/ripserver.server';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
// Its to create Observeables
import 'rxjs/Rx';
import { Observer } from 'rxjs/Observer';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';


@Component({//Typescript dont knows what is component anotation so we have to import it
  //selector: '.app-servers',//to use selector as a class in html <div class="app-servers"></div>
  //selector: '[app-servers]',//to use selector as attribute in html <div app-servers></div>
  selector: 'app-servers',//to use selector as tag lement in html <app-servers></app-servers>

  //---We can write both inline and another style for together but will work only that is defined in last order
  // template:`<h1>inline template</h1>`,//inline template.Make sense we use here `` to write code 
  templateUrl: './servers.component.html',

  // styles: [`.login{background-color:green;}`],//inline styles  
  styleUrls: ['./servers.component.css'],

  //adds atributes to itrs views
  //Emulated is as default(adds atribtes automaticaly so css is used only to this component)
  //None(dont adds attributes to its view elements so css works globaly for all components)
  //Native adds shadow root,works like emulated but only in browsers that support shadow ...(ver gavige kargad)
  encapsulation: ViewEncapsulation.Emulated
})
export class ServersComponent implements OnInit {
  serverId: number = 10;
  serverName: String = "ripServer";
  servers = ["ripServer1", "ripserver2"];//list of server names
  isDisabled: boolean = true;
  serverNameAdded: boolean = false;

  ripCustomObserver: Subscription;

  // annotation is called decorator in angular
  //Referens of html element(like getElementById('ripTestFetch')).element That is part of this component view
  @ViewChild('ripTestFetch') ripElementFetcher: ElementRef;
  //Reference of html element,that is part of content view(that is included through ng-content)
  @ContentChild('ripTestFetch2') ripContentChild: ElementRef;

  //Input parameter (alias) says using which name "element" property  should be bind.As default alisas is propertys real name
  @Input('rElement') element = { type: String, name: String }

  //we can add alias
  @Output() ripEvent = new EventEmitter<{ serverName: String, serverType: String }>();

  //send data to parrent
  onRipEvent() {
    this.ripEvent.emit({
      serverName: "ripEventName",
      serverType: "ripEventType"
    });
  }

  // Function to test Local Reference
  onRipLocalRefClick(rLocalRef: HTMLInputElement) {
    console.log(rLocalRef.value);
    // This is a way to access value from typescripts refference(ViewChild)
    console.log(this.ripElementFetcher.nativeElement.value);
  }

  //defining function
  getServerId() {
    return this.serverId;
  }

  onUpdateServerName(event: Event) {
    this.serverName = (<HTMLInputElement>event.target).value;
  }

  onServerAdd() {
    this.serverNameAdded = true;
  }

  getColor() {
    return "red";
  }

  // Here we are using dependency injection.
  // Angular is injecting LogService service automatically(this is instance
  // that is defined in app module)
  constructor(private logService: LogService, private activatedRoute: ActivatedRoute) {
    this.servers.push("ripServer3");
    setTimeout(() => {
      this.isDisabled = false;
    }, 2000);
  }


  // subscriptions should be done in ngOnInit
  ngOnInit() {
    // Reads params from router
    // But its not best way bcouse if we will change only route parameters and not route,
    // changes wont be done,bcouse new component wont be created to call ngOnInint
    // thats why we have ability to use example shown under this example
    this.serverId = this.activatedRoute.snapshot.params['id'];
    this.serverName = this.activatedRoute.snapshot.params['name'];
    this.serverName = this.activatedRoute.snapshot.fragment;// gets fragment
    this.activatedRoute.snapshot.queryParams;//gets queryParameters

    // in this example we are subscribing params(that is observeabel and observeable objects can be subscrabed)
    // and when route will be changed actions that we are writting here,will be done
    // so this way is more secure and reliable if we are working with data that changes.
    // When we use another component and this component is destroing ,subscription destroys automatically and we 
    //dont have to unsubscribe manualy,it happens automatically
    /*
    to unsubscribe manualy we have to do this steps:

    ripSubscription:Subscription //Subscription should be imported from rxjs/Subscription
    ripSubscription=ripSomething.subscribe((param:Type)=>function...)//we are sawing what we are subscribing
    ripSubscription.unsubscribe();//we doing it in ngOnDestroy() to unsubscribe manualy
    emmit sends as a parameter "params"object so subscribe gets this parameter.
    */

    // We can have service and call get Method of that service in this subscribe method
    // it will let us to get objects dynamically
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.serverId = params['id'];
        this.serverName = params['name'];
      }
    );
    // subscrbe qury parameters that are after question mark
    // when we are emmiting we can push parameter and catch it in subscribe 
    // function.
    this.activatedRoute.queryParams.subscribe();

    // subscribe fragment that is pointer of pages part
    this.activatedRoute.fragment.subscribe();


    // ----------------- Subject -----------------
    // Subject is an observeable and observer togethet
    // Its quite easy to use ,compare to Observeable.create....method that we use after this example
    const ripSubject = new Subject();
    ripSubject.subscribe((data: string) => {
      console.log(data);
    });

    ripSubject.next('5');

    // ----------------- Observeable -----------------
    // Observeables
    // const timer = Observable.interval(1000);
    // timer.subscribe(
    //   // this subscribe  method should get number parameter
    //   (number:number)=>console.log(number)
    // );

    // This is custom created observer(that will notify all subscribers about thrown emmits(next,error,complete))
    const ripCreatedObserveable = Observable.create(
      (observer: Observer<string>) => {
        setTimeout(() => {
          observer.next('first emmit')
        }, 2000);
        setTimeout(() => {
          observer.next('second emmit')
        }, 4000);
        setTimeout(() => {
          // this event will be cached by subscribes error function
          observer.error('error emmit')
        }, 6000);
        setTimeout(() => {
          // this event will be cached by subscribes complete function
          observer.complete();
        }, 8000);
      }
    );

    


    // Custom observers need to be unsubscribed manyally,
    // bcouse if we wont unsubscribe, if component will be deleted
    // observer will continue working,and it will cause memory leak
    this.ripCustomObserver = ripCreatedObserveable.subscribe(
      // catches next emmit
      (message: string) => { console.log(message) },
      // catches error emmit
      (error: string) => { console.log(error) },
      // catches completed emmit
      () => { console.log('completed') },
    );

  }

  ngOnDestroy() {
    // unsubscibe subscription manualy to prevent memory leakt
    this.ripCustomObserver.unsubscribe();
  }
}
