import { Component, Input } from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  @Input() height: number = 50;
  @Input() width: number = 50;
  @Input() text: string = 'Loading...';

}
