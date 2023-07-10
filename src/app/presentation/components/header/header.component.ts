import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { THEME } from 'src/app/core/constants/localstorage.constants';
import { DARK, ID, LIGHT } from 'src/app/core/constants/theme.constants';
import { UserService } from 'src/app/core/services/UserService/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  constructor(public userService: UserService, public msalService: MsalService) {
  }

  ngOnInit(): void {

    let theme = localStorage.getItem(THEME);

    if (!theme) {
      localStorage.setItem(THEME, JSON.stringify(true));
    }
    else {
      this.changeTheme(!JSON.parse(theme));
    }

  }

  public isDarkTheme(): boolean {
    return JSON.parse(localStorage.getItem(THEME)!) as boolean;
  }

  public changeTheme(theme: boolean): void {
    const link = document.getElementById(ID) as HTMLLinkElement;

    link.href = theme ? LIGHT : DARK;
    localStorage.setItem(THEME, JSON.stringify(!theme));
  }

  public logout(): void {
    this.msalService.logoutRedirect().subscribe();
  }

}
