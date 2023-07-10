import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IIteration } from '../../models/IIteration.model';
import { IResponse } from '../../models/interfaces/IResponse.interface';
import { IOrganization } from '../../models/IOrganization.model';
import { IProject } from '../../models/IProject.model';

@Injectable({
  providedIn: 'root'
})
export class IterationService {

  constructor(private httpClient: HttpClient) { }

  public getIterations(organization: IOrganization, project: IProject): Observable<IResponse<IIteration>> {
    return this.httpClient.get<IResponse<IIteration>>(`https://dev.azure.com/${organization.AccountName}/${project.id}/_apis/work/teamsettings/iterations`);
  }
}
