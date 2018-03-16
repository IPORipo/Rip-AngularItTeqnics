import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  // When selector and property has same name,then wehen using property binding
  // wiyh name of directive will be able using only property binding form ([unless])
  selector: '[unless]'
})
// This example is oposite of *ngIf
export class StructuralDirectiveDirective {
  // Runs when settiig value to this property
  @Input() set unless(condition:boolean){
    if(!condition){
      // Create in View Container Template on which this directive will be set on
      this.vcRef.createEmbeddedView(this.templateRef);
    }else{
      //Destroys template
      this.vcRef.clear();
    }
  }

  constructor(private templateRef:TemplateRef<any>,private vcRef:ViewContainerRef){ 
  }

}
