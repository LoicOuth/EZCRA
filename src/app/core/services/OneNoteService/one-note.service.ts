import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IResponseOneNote } from '../../models/interfaces/IResponseOneNote.interface';
import { INotebook } from '../../models/OneNote/INotebook.model';
import { INotebookDetail } from '../../models/OneNote/INotebookDetail.model';
import { GenerateInformationService } from '../GenerateInformationService/generate-information.service';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "text/html" // 👈
  })
};
@Injectable({
  providedIn: 'root'
})
export class OneNoteService {

  constructor(private httpClient: HttpClient, private generateInformationService: GenerateInformationService) { }

  public getRecentNotebooks(): Observable<IResponseOneNote<INotebook>> {
    return this.httpClient.get<IResponseOneNote<INotebook>>('https://graph.microsoft.com/v1.0/me/onenote/notebooks/getRecentNotebooks(includePersonalNotebooks=false)');
  }

  public getDetailNoteboolFromUrl(url: string): Observable<INotebookDetail> {
    return this.httpClient.post<INotebookDetail>('https://graph.microsoft.com/v1.0/me/onenote/notebooks/GetNotebookFromWebUrl', {
      'webUrl': url
    });
  }

  public getGeneric<I>(url: string): Observable<I> {
    return this.httpClient.get<I>(url);
  }

  public createPage(url: string): Observable<Object> {
    return this.httpClient.post(url, this.generateInformationService.getHtmlFormated(), httpOptions);
  }
}
