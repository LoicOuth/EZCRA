import { Injectable } from '@angular/core';
import { IGenerateInformation } from '../../models/interfaces/IGenerateInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class GenerateInformationService {

  private informations: IGenerateInformation = {
    organization: null,
    project: null,
    iteration: null,
    isPersonalizedDate: false,
    dateRange: []
  }

  private htmlTable: string = '';

  public getInformations(): IGenerateInformation {
    return this.informations;
  }

  public setInformations(informations: IGenerateInformation): void {
    this.informations = informations;
  }

  public getHtmlTable(): string {
    return this.htmlTable;
  }

  public getHtmlFormated(): string {
    let parent = `<!DOCTYPE html> <html> <head> <title>${this.informations.dateRange[0].toLocaleDateString('UTC')} to ${this.informations.dateRange[1].toLocaleDateString('UTC')}</title>  </head>
    <body>`;

    parent += this.getHtmlTable();
    parent += '</body> </html>';

    return parent;
  }

  public setHtmlTable(htmlTable: string): void {
    this.htmlTable = htmlTable;
  }
}
