import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MessageService, TreeNode } from 'primeng/api';
import { ICONS } from 'src/app/core/constants/tree.constants';
import { IResponseOneNote } from 'src/app/core/models/interfaces/IResponseOneNote.interface';
import { INotebook } from 'src/app/core/models/OneNote/INotebook.model';
import { INotebookDetail } from 'src/app/core/models/OneNote/INotebookDetail.model';
import { ISection } from 'src/app/core/models/OneNote/ISection.model';
import { ISectionGroup } from 'src/app/core/models/OneNote/ISectionGroup.model';
import { OneNoteService } from 'src/app/core/services/OneNoteService/one-note.service';

@Component({
  selector: 'app-generate-onenote',
  templateUrl: './generate-onenote.component.html',
})
export class GenerateOnenoteComponent implements OnInit {
  public showModal: boolean = true;
  public isLoading: boolean = false;
  public isLoadingGenerate: boolean = false;
  public selectedBook?: TreeNode;
  public oneNote: Array<TreeNode> = [];

  constructor(private location: Location, private oneNoteService: OneNoteService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.oneNoteService.getRecentNotebooks().subscribe(
      (response: IResponseOneNote<INotebook>) => {
        this.oneNote = response.value.map(el =>
        ({
          label: el.displayName,
          data: JSON.stringify(['notebook', `${el.links.oneNoteWebUrl.href}`]),
          icon: ICONS.NOTEBOOK,
          children: [],
          leaf: false
        }))
        this.isLoading = false;
      }
    )
  }

  public onNodeExpand(event: any): void {
    this.isLoading = true;
    if (event.node) {
      let data = JSON.parse(event.node.data);

      const getSection = (sectionGroupsUrl: string, sectionsUrl: string) => {
        this.oneNoteService.getGeneric<IResponseOneNote<ISectionGroup>>(sectionGroupsUrl).subscribe(
          (response: IResponseOneNote<ISectionGroup>) => {
            event.node.children.push.apply(event.node.children, response.value.map((el: ISectionGroup) => ({
              label: el.displayName,
              data: JSON.stringify(['sectionGroup', `${el.sectionGroupsUrl}`, `${el.sectionsUrl}`]),
              icon: ICONS.SECTION_GROUP,
              children: [],
              leaf: false
            }))
            );
          }
        )

        this.oneNoteService.getGeneric<IResponseOneNote<ISection>>(sectionsUrl).subscribe(
          (response: IResponseOneNote<ISection>) => {
            event.node.children.push.apply(event.node.children, response.value.map((el: ISection) => ({
              label: el.displayName,
              data: JSON.stringify(['section', `${el.pagesUrl}`, `${el.id}`]),
              icon: ICONS.SECTION,
            }))
            );

            this.isLoading = false;
          }
        )
      }

      if (data[0] == 'notebook') {
        this.oneNoteService.getDetailNoteboolFromUrl(data[1]).subscribe(
          (response: INotebookDetail) => {
            getSection(response.sectionGroupsUrl, response.sectionsUrl);
          }
        )
      }
      else if (data[0] == 'sectionGroup') {
        getSection(data[1], data[2]);
      }
    }
  }

  public nodeSelect(event: any): void {
    if (event.node) {
      let data = JSON.parse(event.node.data);

      if (data[0] != 'section') {
        this.selectedBook = undefined;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You need to choose a section !' });

      }
    }
  }

  public back(): void {
    this.location.back();
  }

  public generate(): void {
    this.isLoadingGenerate = true;
    this.oneNoteService.createPage(JSON.parse(this.selectedBook?.data)[1]).subscribe(
      () => {
        this.isLoadingGenerate = false;
        this.back();
      }
    )
  }

}
