import { 
  Directive, 
  ElementRef, 
  OnInit 
} from '@angular/core';

@Directive({
  selector: '[appDirectiveWithoutRenderer]'
})
export class DirectiveWithoutRendererDirective implements OnInit {
  elementtRef: ElementRef;
  constructor(elementRef: ElementRef) {
    this.elementtRef = elementRef;
  }
  // its better to make all actions in ngOnInit and not in constructor.To make everything clear and in tits place
  ngOnInit(): void {
    this.elementtRef.nativeElement.style.backgroundcolor = "green";
  }
}
