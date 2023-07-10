import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrganization } from '../../models/IOrganization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private httpClient: HttpClient) { }

  public getOrganizations(): Observable<Array<IOrganization>> {
    return this.httpClient.get<Array<IOrganization>>(`https://app.vssps.visualstudio.com/_apis/accounts`);
  }
}
