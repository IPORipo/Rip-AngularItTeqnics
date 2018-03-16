import { 
  Directive, 
  ElementRef, 
  OnInit, 
  HostBinding, 
  Input, 
  Renderer2, 
  HostListener 
} from '@angular/core';


@Directive({
  selector: '[appDirectiveWithRenderer]'
})
// Priority of using renderer and ElementRef together is that
// We wont face into problems when using Sever side rendering,
//if we will use renderer.Also its more sequre to XSS atacs

// ???When does this information(HostBinding...)will be filed
//  after constructor,ngOnInint or...?
export class DirectiveWithRendererDirective implements OnInit {
  //This is example of binding properties of element this directive is placed on 
  // If we are using HostBinding we dont have to use renderer
  @HostBinding("style.backgroundColor") backgroundColor: String="transparent";
  
  @Input()defaultColor:String;

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  ngOnInit(): void {
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue");
    this.backgroundColor=this.defaultColor;
  }

  //This is example of using event listener Decorators.this method will be listening elemnt
  //this directive is placed on.We can use any event of DOM.Can i us emy own event
  @HostListener("mouseneter")
  mouseover(event: Event) {
    this.backgroundColor="blue";
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "blue");
  }

  @HostListener("mouseleave")
  mouseleave(event: Event) {
    this.backgroundColor="transparent";
    // this.renderer.setStyle(this.elRef.nativeElement, "background-color", "transparent");
  }
}
