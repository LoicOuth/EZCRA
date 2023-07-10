import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { REL, RELATION_TYPE, STATE, WORK_ITEM_TYPE } from 'src/app/core/constants/workitem.constants';
import { IGenerateInformation } from 'src/app/core/models/interfaces/IGenerateInformation.interface';
import { IResponse } from 'src/app/core/models/interfaces/IResponse.interface';
import { IResponseWorkItem } from 'src/app/core/models/interfaces/IResponseWorkItem.model';
import { IWorkItem } from 'src/app/core/models/IWorkItem.model';
import { GenerateInformationService } from 'src/app/core/services/GenerateInformationService/generate-information.service';
import { WorkItemService } from 'src/app/core/services/WorkItemService/work-item.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  public isLoading: boolean = false;

  public generateInformation!: IGenerateInformation;
  private workItems: Array<IWorkItem> = []

  constructor(
    private generateInformationService: GenerateInformationService,
    private workItemService: WorkItemService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.generateInformation = this.generateInformationService.getInformations();

    this.isLoading = true;
    this.workItemService.getWorkItemsIds(this.generateInformation).subscribe(
      (response: IResponseWorkItem) => {
        if (response.workItems.length > 0) {
          this.workItemService.getWorkItemsForDateRange(response.workItems.map((el) => (el.id)).join(), this.generateInformation).subscribe(
            (res: IResponse<IWorkItem>) => {
              this.workItems = res.value;
              this.fillTable();
              this.isLoading = false;
            }
          )
        }
        else {
          this.messageService.add({ severity: 'warn', summary: 'Warning', detail: 'Any work found for this period' });
          this.isLoading = false;
        }

      }
    );
  }

  private fillTable(): void {
    this.workItems.forEach(el => {
      let date: Date = new Date;
      if (el.fields['System.WorkItemType'] == WORK_ITEM_TYPE.TASK) {
        if (el.fields['System.State'] == STATE.CLOSED) {
          date = new Date(el.fields['Microsoft.VSTS.Common.StateChangeDate']);
        }
      }
      else if (el.fields['System.WorkItemType'] == WORK_ITEM_TYPE.BUG) {
        if (el.fields['System.State'] == STATE.RESOLVED) {
          date = new Date(el.fields['Microsoft.VSTS.Common.StateChangeDate']);
        }
      }


      if (date.getDay() != 0 && date.getDay() != 6) {
        let td: HTMLElement | null = null;

        switch (date.getDay()) {
          case 1:
            td = document.getElementById('mon');
            break;
          case 2:
            td = document.getElementById('tue');
            break;
          case 3:
            td = document.getElementById('wen');
            break;
          case 4:
            td = document.getElementById('thu');
            break;
          case 5:
            td = document.getElementById('fri');
            break;
        }

        if (td != null) {
          td.children[1].innerHTML += `<p>${el.fields['System.Title']} </p>`
          td.children[3].innerHTML += `<p>${el.fields['System.State'] == STATE.ACTIVE ? 'En cours' : 'Terminée'} </p>`
          let content = `<p><a href="https://dev.azure.com/${this.generateInformation.organization?.AccountName}/${this.generateInformation.project?.name}/_workitems/edit/${el.id}" target="_blank"> Work item </a>`;
          el.relations.forEach(relation => {
            if (relation.rel == REL.ARTIFACTLINK) {
              if (relation.url.includes(RELATION_TYPE.PULL_REQUEST)) {
                let info = relation.url.split('%2F');
                content += `<a style="margin-left: 15px;" href="https://dev.azure.com/${this.generateInformation.organization?.AccountName}/${this.generateInformation.project?.name}/_git/${info[1]}/pullrequest/${info[2]}" target="_blank">Pull Request </a>`;
              }
              else if (relation.url.includes(RELATION_TYPE.COMMIT)) {
                let info = relation.url.split('%2f');
                content += `<a style="margin-left: 15px;" href="https://dev.azure.com/${this.generateInformation.organization?.AccountName}/${this.generateInformation.project?.name}/_git/${info[1]}/commit/${info[2]}" target="_blank">Commit </a>`;
              }

            }
          })

          td.children[6].innerHTML += content += '</p>';


        }
      }
    })
  }

  public nextPage(): void {
    let div = document.getElementById('previewTable')!.outerHTML;

    this.generateInformationService.setHtmlTable(div);

    this.router.navigate(['steps/generate']);
  }


}
