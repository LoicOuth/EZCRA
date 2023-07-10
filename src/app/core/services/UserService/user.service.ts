import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AccountInfo } from '@azure/msal-browser';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private msalService: MsalService) { }

  public getConnectedUser(): AccountInfo {
    return this.msalService.instance.getAllAccounts()[0]!;
  }
}
