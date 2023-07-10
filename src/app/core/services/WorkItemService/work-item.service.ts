import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IGenerateInformation } from '../../models/interfaces/IGenerateInformation.interface';
import { IResponse } from '../../models/interfaces/IResponse.interface';
import { IResponseWorkItem } from '../../models/interfaces/IResponseWorkItem.model';
import { IWorkItem } from '../../models/IWorkItem.model';
import { UserService } from '../UserService/user.service';


@Injectable({
  providedIn: 'root'
})
export class WorkItemService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  public getWorkItemsIds(generateInformation: IGenerateInformation): Observable<IResponseWorkItem> {
    return this.httpClient.post<IResponseWorkItem>(`https://dev.azure.com/${generateInformation.organization?.AccountName}/${generateInformation.project?.id}/_apis/wit/wiql?api-version=6.0`,
      {
        "query":
          `Select [System.Id] From WorkItems Where ([System.WorkItemType] = 'Task' 
          OR [System.WorkItemType] = 'Bug') AND ([System.State] = 'Active' 
          OR (([System.State] = 'Closed' OR [System.State] = 'Resolved') 
          AND ([Microsoft.VSTS.Common.StateChangeDate] > '${generateInformation.dateRange[0].toISOString().split('T')[0]}' 
          AND [Microsoft.VSTS.Common.StateChangeDate] < '${generateInformation.dateRange[1].toISOString().split('T')[0]}'))) 
          AND [System.AssignedTo] = '${this.userService.getConnectedUser().username}'`
      });
  }

  public getWorkItemsForDateRange(ids: string, generateInformation: IGenerateInformation): Observable<IResponse<IWorkItem>> {
    return this.httpClient.get<IResponse<IWorkItem>>(`https://dev.azure.com/${generateInformation.organization?.AccountName}/${generateInformation.project?.id}/_apis/wit/workitems?ids=${ids}&$expand=relations&api-version=6.0`);
  }
}
