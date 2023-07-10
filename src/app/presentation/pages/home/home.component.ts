import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  public items: Array<MenuItem> = [];

  ngOnInit(): void {

    this.items = [{
      label: 'Informations',
      routerLink: 'steps/information'
    },
    {
      label: 'Preview',
      routerLink: 'steps/preview'
    },
    {
      label: 'Generate',
      routerLink: 'steps/generate'
    }

    ];
  }
}
