import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IIteration } from 'src/app/core/models/IIteration.model';
import { IGenerateInformation } from 'src/app/core/models/interfaces/IGenerateInformation.interface';
import { IResponse } from 'src/app/core/models/interfaces/IResponse.interface';
import { IOrganization } from 'src/app/core/models/IOrganization.model';
import { IProject } from 'src/app/core/models/IProject.model';
import { GenerateInformationService } from 'src/app/core/services/GenerateInformationService/generate-information.service';
import { IterationService } from 'src/app/core/services/IterationService/iteration.service';
import { OrganizationService } from 'src/app/core/services/OrganizationService/organization.service';
import { ProjectService } from 'src/app/core/services/ProjectService/project.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
})
export class InformationComponent implements OnInit {
  public organizations: Array<IOrganization> = [];
  public projects: Array<IProject> = [];
  public iterations: Array<IIteration> = [];

  public isLoadingProject: boolean = false;
  public isLoadingOrganization: boolean = false;
  public isLoadingIteration: boolean = false;
  public isLoadingGlobal: boolean = false;

  public generateInformation!: IGenerateInformation

  constructor(
    private organizationService: OrganizationService,
    private projectService: ProjectService,
    private iterationService: IterationService,
    private generateInformationService: GenerateInformationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.generateInformation = this.generateInformationService.getInformations();

    if (this.generateInformation.project && this.generateInformation.organization) {
      this.isLoadingGlobal = true;
    }

    this.isLoadingOrganization = true;
    this.organizationService.getOrganizations().subscribe(
      (response: Array<IOrganization>) => {
        this.organizations = response;
        this.isLoadingOrganization = false;
      },

      (error) => {
        console.error(error);
        this.isLoadingOrganization = false;
      }
    )

    if (this.generateInformation.project) {
      this.onOrganizationChange();
      this.onProjectChange();
    }

    if (this.generateInformation.iteration) {
      this.onIterationChange();
    }
  }

  public onOrganizationChange(): void {
    this.isLoadingProject = true;
    //clear
    this.projects = this.iterations = [];
    if (!this.generateInformation.isPersonalizedDate) {
      this.generateInformation.dateRange = [];
    }

    this.projectService.getProjectsFromOrganization(this.generateInformation.organization!).subscribe(
      (response: IResponse<IProject>) => {
        this.projects = response.value;
        this.isLoadingProject = false;
      }
    )
  }

  public onProjectChange(): void {
    this.isLoadingIteration = true;
    //clear
    this.iterations = [];
    if (!this.generateInformation.isPersonalizedDate) {
      this.generateInformation.dateRange = [];
    }

    this.iterationService.getIterations(this.generateInformation.organization!, this.generateInformation.project!).subscribe(
      (response: IResponse<IIteration>) => {
        this.iterations = response.value;
        this.isLoadingIteration = false;
        this.isLoadingGlobal = false;
      }
    )
  }

  public onIterationChange(): void {
    this.generateInformation.dateRange = [
      new Date(this.generateInformation.iteration!.attributes.startDate),
      new Date(this.generateInformation.iteration!.attributes.finishDate)
    ];
  }

  public onPersonalizedDateChange(): void {
    this.generateInformation.dateRange = [];
    this.generateInformation.iteration = null;
  }

  public nextPage(): void {
    if (this.generateInformation.organization && this.generateInformation.project && this.generateInformation.dateRange.length == 2) {
      let difference = this.generateInformation.dateRange[1].getTime() - this.generateInformation.dateRange[0].getTime();
      let day = Math.ceil(difference / (1000 * 3600 * 24));

      if (day <= 5) {
        this.generateInformationService.setInformations(this.generateInformation);
        this.router.navigate(['steps/preview']);
      }
      else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Only one week can be selected' });
      }

    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'One or many field are empty' });
    }


  }

}
