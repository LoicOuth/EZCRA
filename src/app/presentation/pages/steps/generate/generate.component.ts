import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenerateInformationService } from 'src/app/core/services/GenerateInformationService/generate-information.service';
import { utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss']
})
export class GenerateComponent implements OnInit {

  public selected: string = '';
  private htmlTable: string = '';

  constructor(private generateInformationService: GenerateInformationService, private router: Router, private route: ActivatedRoute) {
    this.htmlTable = this.generateInformationService.getHtmlTable();
  }

  ngOnInit(): void {
    let div = document.getElementById('preview');
    div!.innerHTML = this.htmlTable;
  }

  public nextPage(): void {

    if (this.selected == 'excel') {
      let wb = utils.table_to_book(document.getElementById('previewTable')?.children[0]);

      writeFile(wb, 'export.xlsx');
    }
    else if (this.selected == 'onenote') {
      this.router.navigate(['onenote'], { relativeTo: this.route });
    }
  }

}
