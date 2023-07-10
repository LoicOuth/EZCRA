import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'step-footer',
  templateUrl: './step-footer.component.html',
})
export class StepFooterComponent {
  @Input('showBack') showBack: boolean = false;
  @Input('nextText') nextText: string = "Next";
  @Input('nextIcon') nextIcon: string = "pi pi-arrow-right";

  @Output('onNextClick') onNextClick = new EventEmitter();

  constructor(private location: Location) {

  }

  public back(): void {
    this.location.back();
  }

}
