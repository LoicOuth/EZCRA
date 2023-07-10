import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponse } from '../../models/interfaces/IResponse.interface';
import { IOrganization } from '../../models/IOrganization.model';
import { IProject } from '../../models/IProject.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private httClient: HttpClient) { }

  public getProjectsFromOrganization(organization: IOrganization): Observable<IResponse<IProject>> {
    return this.httClient.get<IResponse<IProject>>(`https://dev.azure.com/${organization.AccountName}/_apis/projects`);
  }
}
